"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, LayoutTemplate } from "lucide-react";
import SectionEditor from "./SectionEditor";
import ArticlePreview from "./ArticlePreview";
import type { AdminSection } from "./types";
import { createEmptySection, renumberSections } from "./utils";
import { sectionsToMarkdown, markdownToSections } from "@/lib/markdown-blocks";

interface SplitScreenEditorProps {
  value: AdminSection[];
  onChange: (sections: AdminSection[]) => void;
  title?: string;
  intro?: string;
}

type Patch = {
  valueRef: AdminSection[];
  markdown: string | undefined;
  sections: AdminSection[] | undefined;
  lastEditedBy: "markdown" | "blocks" | null;
};

export default function SplitScreenEditor({
  value,
  onChange,
  title,
  intro,
}: SplitScreenEditorProps) {
  const [mode, setMode] = useState<"markdown" | "blocks">("blocks");
  const [patch, setPatch] = useState<Patch>({
    valueRef: value,
    markdown: undefined,
    sections: undefined,
    lastEditedBy: null,
  });

  if (patch.valueRef !== value) {
    const currentMarkdown =
      patch.markdown ?? sectionsToMarkdown(patch.sections ?? patch.valueRef);
    const newMarkdown = sectionsToMarkdown(value);
    if (currentMarkdown !== newMarkdown) {
      setPatch({
        valueRef: value,
        markdown: undefined,
        sections: undefined,
        lastEditedBy: null,
      });
    } else {
      setPatch({ ...patch, valueRef: value });
    }
  }

  const blockSections = patch.sections ?? value;
  const markdown = patch.markdown ?? sectionsToMarkdown(value);
  const lastEditedBy = patch.lastEditedBy;

  const handleMarkdownChange = (text: string) => {
    const parsed = markdownToSections(text) as AdminSection[];
    setPatch({
      valueRef: value,
      markdown: text,
      sections: parsed,
      lastEditedBy: "markdown",
    });
    onChange(parsed);
  };

  const handleBlocksChange = (sections: AdminSection[]) => {
    const renumbered = renumberSections(sections);
    setPatch({
      valueRef: value,
      markdown: sectionsToMarkdown(renumbered),
      sections: renumbered,
      lastEditedBy: "blocks",
    });
    onChange(renumbered);
  };

  const handleAddSection = () => {
    handleBlocksChange([...blockSections, createEmptySection()]);
  };

  const handleRemoveSection = (index: number) => {
    handleBlocksChange(blockSections.filter((_, i) => i !== index));
  };

  const handleMoveSectionUp = (index: number) => {
    if (index === 0) return;
    const sections = [...blockSections];
    [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]];
    handleBlocksChange(sections);
  };

  const handleMoveSectionDown = (index: number) => {
    if (index >= blockSections.length - 1) return;
    const sections = [...blockSections];
    [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    handleBlocksChange(sections);
  };

  const handleSectionChange = (index: number, section: AdminSection) => {
    const sections = [...blockSections];
    sections[index] = section;
    handleBlocksChange(sections);
  };

  return (
    <div className="flex flex-col gap-4" data-last-edited={lastEditedBy ?? ""}>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={mode === "markdown" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("markdown")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Markdown
        </Button>
        <Button
          type="button"
          variant={mode === "blocks" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("blocks")}
        >
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Blocos
        </Button>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          {mode === "markdown" ? (
            <Textarea
              className="min-h-[600px] font-mono text-sm"
              value={markdown}
              onChange={(e) => handleMarkdownChange(e.target.value)}
            />
          ) : (
            <div className="space-y-4">
              {blockSections.map((section, idx) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  index={idx}
                  total={blockSections.length}
                  onChange={(s) => handleSectionChange(idx, s)}
                  onRemove={() => handleRemoveSection(idx)}
                  onMoveUp={() => handleMoveSectionUp(idx)}
                  onMoveDown={() => handleMoveSectionDown(idx)}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddSection}
              >
                <LayoutTemplate className="mr-2 h-4 w-4" />
                Adicionar Seção
              </Button>
            </div>
          )}
        </div>

        <div className="sticky top-20 w-[480px] shrink-0 self-start">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <ArticlePreview
              sections={blockSections}
              title={title}
              intro={intro}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
