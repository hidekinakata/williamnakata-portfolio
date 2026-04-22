export type AdminContentBlock =
  | { id: string; type: "paragraph"; text: string }
  | {
      id: string;
      type: "code";
      filename: string;
      language: string;
      code: string;
    }
  | { id: string; type: "quote"; text: string; author: string; year: string }
  | { id: string; type: "numberedList"; items: { number: string; text: string }[] };

export type AdminSection = {
  id: string;
  number: string;
  title: string;
  blocks: AdminContentBlock[];
  subsections?: AdminSection[];
};
