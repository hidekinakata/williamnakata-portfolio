"use client";

import { useState } from "react";
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
import { createEmptyBlock, slugify, genId } from "./utils";

interface SectionEditorProps {
  section: AdminSection;
  index: number;
  total: number;
  onChange: (section: AdminSection) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function SectionEditor({
  section,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: SectionEditorProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card>
      <CardHeader className="cursor-pointer py-3" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="text-muted-foreground h-4 w-4" />
            <span className="text-sm font-medium">
              Seção {section.number}
            </span>
            {section.title && (
              <span className="text-muted-foreground truncate text-sm">
                — {section.title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
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
            <Label className="text-xs">Título da Seção</Label>
            <Input
              value={section.title}
              onChange={(e) => {
                const title = e.target.value;
                onChange({
                  ...section,
                  title,
                  id: title ? slugify(title) : genId(),
                });
              }}
              placeholder="Título da seção"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">ID</Label>
            <Input
              value={section.id}
              onChange={(e) => onChange({ ...section, id: e.target.value })}
              placeholder="identificador-da-secao"
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
        </CardContent>
      )}
    </Card>
  );
}
