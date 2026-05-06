"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Plus,
} from "lucide-react";
import BlockEditor from "./BlockEditor";
import type { AdminSection } from "./types";
import { createEmptyBlock, createEmptySubSection, slugify, genId } from "./utils";

interface SectionEditorProps {
  section: AdminSection;
  index: number;
  total: number;
  onChange: (section: AdminSection) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isSubSection?: boolean;
}

export default function SectionEditor({
  section,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isSubSection = false,
}: SectionEditorProps) {
  const [expanded, setExpanded] = useState(true);
  const [titleInput, setTitleInput] = useState(section.title);
  const [idInput, setIdInput] = useState(section.id);

  useEffect(() => {
    setTitleInput(section.title);
    setIdInput(section.id);
  }, [section.title, section.id]);

  const handleAddSubSection = () => {
    onChange({
      ...section,
      subsections: [...(section.subsections || []), createEmptySubSection()],
    });
  };

  const handleRemoveSubSection = (subIdx: number) => {
    const subs = (section.subsections || []).filter((_, i) => i !== subIdx);
    onChange({ ...section, subsections: subs.length ? subs : undefined });
  };

  const handleChangeSubSection = (subIdx: number, sub: AdminSection) => {
    const subs = [...(section.subsections || [])];
    subs[subIdx] = sub;
    onChange({ ...section, subsections: subs });
  };

  return (
    <Card>
      <CardHeader className="cursor-pointer py-3" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="text-muted-foreground h-4 w-4" />
            <span className="text-sm font-medium">
              {isSubSection ? "Subseção" : "Seção"} {section.number}
            </span>
            {section.title && (
              <span className="text-muted-foreground truncate text-sm">
                — {section.title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!isSubSection && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp();
                  }}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={index === total - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown();
                  }}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-1">
            <Label className="text-xs">Título da {isSubSection ? "Subseção" : "Seção"}</Label>
            <Input
              value={titleInput}
              onChange={(e) => {
                e.stopPropagation();
                setTitleInput(e.target.value);
              }}
              onBlur={() => {
                const title = titleInput;
                onChange({
                  ...section,
                  title,
                  id: title ? slugify(title) : genId(),
                });
              }}
              placeholder={isSubSection ? "Título da subseção" : "Título da seção"}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">ID</Label>
            <Input
              value={idInput}
              onChange={(e) => {
                e.stopPropagation();
                setIdInput(e.target.value);
              }}
              onBlur={() => {
                onChange({ ...section, id: idInput });
              }}
              placeholder="identificador"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Blocos de Conteúdo</Label>
            </div>
            {section.blocks.map((block, blockIdx) => (
              <BlockEditor
                key={block.id}
                block={block}
                onChange={(b) => {
                  const blocks = [...section.blocks];
                  blocks[blockIdx] = b;
                  onChange({ ...section, blocks });
                }}
                onRemove={() => {
                  const blocks = section.blocks.filter(
                    (_, i) => i !== blockIdx,
                  );
                  onChange({
                    ...section,
                    blocks: blocks.length ? blocks : [createEmptyBlock("paragraph")],
                  });
                }}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange({
                  ...section,
                  blocks: [...section.blocks, createEmptyBlock("paragraph")],
                })
              }
            >
              <Plus className="mr-1 h-3 w-3" />
              Adicionar Bloco
            </Button>
          </div>

          {!isSubSection && (
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Subseções</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSubSection}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Subseção
                </Button>
              </div>
              <div className="space-y-3 pl-4">
                {(section.subsections || []).map((sub, subIdx) => (
                  <SectionEditor
                    key={sub.id}
                    section={sub}
                    index={subIdx}
                    total={(section.subsections || []).length}
                    onChange={(s) => handleChangeSubSection(subIdx, s)}
                    onRemove={() => handleRemoveSubSection(subIdx)}
                    onMoveUp={() => {}}
                    onMoveDown={() => {}}
                    isSubSection
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
