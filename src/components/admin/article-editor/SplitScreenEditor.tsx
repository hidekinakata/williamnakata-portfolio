"use client";

import { useState, useLayoutEffect, useRef, useCallback, useEffect } from "react";
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

export default function SplitScreenEditor({
  value,
  onChange,
  title,
  intro,
}: SplitScreenEditorProps) {
  const [mode, setMode] = useState<"markdown" | "blocks">("blocks");
  const [sections, setSections] = useState<AdminSection[]>(value);
  const [markdown, setMarkdown] = useState<string>(sectionsToMarkdown(value));

  const syncedRef = useRef<AdminSection[] | null>(null);
  const isSyncingRef = useRef(false);

  useLayoutEffect(() => {
    if (syncedRef.current === value) {
      isSyncingRef.current = false;
      return;
    }
    if (isSyncingRef.current) return;
    queueMicrotask(() => {
      setSections(value);
      setMarkdown(sectionsToMarkdown(value));
      syncedRef.current = value;
    });
  }, [value]);

  const notifyParent = useCallback(
    (newSections: AdminSection[]) => {
      const renumbered = renumberSections(newSections);
      const md = sectionsToMarkdown(renumbered);
      isSyncingRef.current = true;
      setSections(renumbered);
      setMarkdown(md);
      syncedRef.current = renumbered;
      onChange(renumbered);
    },
    [onChange],
  );

  const handleMarkdownChange = useCallback(
    (text: string) => {
      setMarkdown(text);
      const parsed = markdownToSections(text) as AdminSection[];
      const renumbered = renumberSections(parsed);
      isSyncingRef.current = true;
      setSections(renumbered);
      syncedRef.current = renumbered;
      onChange(renumbered);
    },
    [onChange],
  );

  const handleBlocksChange = useCallback(
    (newSections: AdminSection[]) => {
      notifyParent(newSections);
    },
    [notifyParent],
  );

  const handleAddSection = useCallback(() => {
    handleBlocksChange([...sections, createEmptySection()]);
  }, [sections, handleBlocksChange]);

  const handleRemoveSection = useCallback(
    (index: number) => {
      handleBlocksChange(sections.filter((_, i) => i !== index));
    },
    [sections, handleBlocksChange],
  );

  const handleMoveSectionUp = useCallback(
    (index: number) => {
      if (index === 0) return;
      const next = [...sections];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      handleBlocksChange(next);
    },
    [sections, handleBlocksChange],
  );

  const handleMoveSectionDown = useCallback(
    (index: number) => {
      if (index >= sections.length - 1) return;
      const next = [...sections];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      handleBlocksChange(next);
    },
    [sections, handleBlocksChange],
  );

  const handleSectionChange = useCallback(
    (index: number, section: AdminSection) => {
      const next = [...sections];
      next[index] = section;
      handleBlocksChange(next);
    },
    [sections, handleBlocksChange],
  );

  return (
    <div className="flex flex-col gap-4">
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
              {sections.map((section, idx) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  index={idx}
                  total={sections.length}
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
              sections={sections}
              title={title}
              intro={intro}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
