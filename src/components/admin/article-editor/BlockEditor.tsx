"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, X, Plus } from "lucide-react";
import type { AdminContentBlock } from "./types";
import { BLOCK_TYPES, createEmptyBlock } from "./utils";

interface BlockEditorProps {
  block: AdminContentBlock;
  onChange: (block: AdminContentBlock) => void;
  onRemove: () => void;
}

export default function BlockEditor({ block, onChange, onRemove }: BlockEditorProps) {
  return (
    <div className="border-input rounded-md border p-3">
      <div className="mb-2 flex items-center justify-between">
        <Select
          value={block.type}
          onValueChange={(v) => {
            onChange(createEmptyBlock(v as AdminContentBlock["type"]));
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BLOCK_TYPES.map((bt) => (
              <SelectItem key={bt.value} value={bt.value}>
                {bt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {block.type === "paragraph" && (
        <Textarea
          rows={3}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          placeholder="Texto do parágrafo..."
        />
      )}

      {block.type === "code" && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Arquivo</Label>
              <Input
                value={block.filename}
                onChange={(e) => onChange({ ...block, filename: e.target.value })}
                placeholder="ex: index.tsx"
              />
            </div>
            <div>
              <Label className="text-xs">Linguagem</Label>
              <Input
                value={block.language}
                onChange={(e) => onChange({ ...block, language: e.target.value })}
                placeholder="ex: typescript"
              />
            </div>
          </div>
          <Textarea
            rows={6}
            value={block.code}
            onChange={(e) => onChange({ ...block, code: e.target.value })}
            placeholder="Código..."
            className="font-mono text-sm"
          />
        </div>
      )}

      {block.type === "quote" && (
        <div className="space-y-2">
          <Textarea
            rows={2}
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Texto da citação..."
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Autor</Label>
              <Input
                value={block.author}
                onChange={(e) => onChange({ ...block, author: e.target.value })}
                placeholder="Nome do autor"
              />
            </div>
            <div>
              <Label className="text-xs">Ano</Label>
              <Input
                value={block.year}
                onChange={(e) => onChange({ ...block, year: e.target.value })}
                placeholder="ex: 2024"
              />
            </div>
          </div>
        </div>
      )}

      {block.type === "numberedList" && (
        <div className="space-y-2">
          {block.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Input
                className="w-16 shrink-0"
                value={item.number}
                onChange={(e) => {
                  const items = [...block.items];
                  items[idx] = { ...items[idx], number: e.target.value };
                  onChange({ ...block, items });
                }}
                placeholder="01"
              />
              <Textarea
                rows={2}
                className="flex-1"
                value={item.text}
                onChange={(e) => {
                  const items = [...block.items];
                  items[idx] = { ...items[idx], text: e.target.value };
                  onChange({ ...block, items });
                }}
                placeholder="Texto do item..."
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-1 h-8 w-8 shrink-0"
                onClick={() => {
                  const items = block.items.filter((_, i) => i !== idx);
                  onChange({
                    ...block,
                    items: items.length ? items : [{ number: "1", text: "" }],
                  });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...block,
                items: [
                  ...block.items,
                  { number: String(block.items.length + 1), text: "" },
                ],
              })
            }
          >
            <Plus className="mr-1 h-3 w-3" />
            Item
          </Button>
        </div>
      )}
    </div>
  );
}
