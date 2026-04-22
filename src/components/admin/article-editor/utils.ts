import type { AdminContentBlock, AdminSection } from "./types";

export function genId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function renumberSections(sections: AdminSection[]): AdminSection[] {
  return sections.map((s, i) => ({
    ...s,
    number: String(i + 1).padStart(2, "0"),
    subsections: s.subsections
      ? renumberSubsections(String(i + 1).padStart(2, "0"), s.subsections)
      : undefined,
  }));
}

function renumberSubsections(
  parentNumber: string,
  subsections: AdminSection[],
): AdminSection[] {
  return subsections.map((s, i) => ({
    ...s,
    number: `${parentNumber}.${String(i + 1).padStart(2, "0")}`,
  }));
}

export const BLOCK_TYPES = [
  { value: "paragraph", label: "Parágrafo" },
  { value: "code", label: "Código" },
  { value: "quote", label: "Citação" },
  { value: "numberedList", label: "Lista Numerada" },
] as const;

export function createEmptyBlock(type: AdminContentBlock["type"] = "paragraph"): AdminContentBlock {
  const id = genId();
  switch (type) {
    case "paragraph":
      return { id, type: "paragraph", text: "" };
    case "code":
      return { id, type: "code", filename: "", language: "", code: "" };
    case "quote":
      return { id, type: "quote", text: "", author: "", year: "" };
    case "numberedList":
      return { id, type: "numberedList", items: [{ number: "1", text: "" }] };
  }
}

export function createEmptySection(): AdminSection {
  return {
    id: genId(),
    number: "",
    title: "",
    blocks: [createEmptyBlock("paragraph")],
    subsections: [],
  };
}

export function createEmptySubSection(): AdminSection {
  return {
    id: genId(),
    number: "",
    title: "",
    blocks: [createEmptyBlock("paragraph")],
  };
}
