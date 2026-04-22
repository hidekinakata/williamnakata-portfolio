import type { ArticleSection, ContentBlock } from "./articles";

function genId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function renumberSections(sections: ArticleSection[]): ArticleSection[] {
  return sections.map((s, i) => ({
    ...s,
    number: String(i + 1).padStart(2, "0"),
  }));
}

export function sectionsToMarkdown(sections: ArticleSection[]): string {
  return sections.map((s) => sectionToMarkdown(s)).join("\n\n");
}

function sectionToMarkdown(section: ArticleSection): string {
  const header = section.title ? `# ${section.title}` : "#";
  const body = section.blocks.map((b) => blockToMarkdown(b)).join("\n\n");
  return `${header}\n\n${body}`;
}

function blockToMarkdown(block: ContentBlock): string {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "code": {
      const meta = block.filename ? ` (${block.filename})` : "";
      return `\`\`\`${block.language}${meta}\n${block.code}\n\`\`\``;
    }
    case "quote": {
      const year = block.year ? `, ${block.year}` : "";
      return `> "${block.text}" — ${block.author}${year}`;
    }
    case "numberedList":
      return block.items.map((item) => `${item.number}. ${item.text}`).join("\n");
    default:
      return "";
  }
}

export function markdownToSections(markdown: string): ArticleSection[] {
  const lines = markdown.split("\n");
  const sections: ArticleSection[] = [];

  let currentBlocks: ContentBlock[] = [];

  let sectionId = "";
  let sectionNumber = "";
  let sectionTitle = "";
  let hasActiveSection = false;

  let paraBuffer: string[] = [];
  let codeBuffer: string[] = [];
  let codeLang = "";
  let codeFilename = "";
  let inCode = false;
  let listBuffer: { number: string; text: string }[] = [];

  function flushPara() {
    if (paraBuffer.length > 0) {
      const text = paraBuffer.join("\n").trim();
      if (text) {
        currentBlocks.push({
          id: genId(),
          type: "paragraph",
          text,
        });
      }
      paraBuffer = [];
    }
  }

  function flushList() {
    if (listBuffer.length > 0) {
      currentBlocks.push({
        id: genId(),
        type: "numberedList",
        items: [...listBuffer],
      });
      listBuffer = [];
    }
  }

  function flushCode() {
    currentBlocks.push({
      id: genId(),
      type: "code",
      language: codeLang,
      filename: codeFilename,
      code: codeBuffer.join("\n"),
    });
    codeBuffer = [];
    codeLang = "";
    codeFilename = "";
    inCode = false;
  }

  function pushSection(title: string) {
    if (hasActiveSection) {
      flushPara();
      flushList();
      sections.push({
        id: sectionId,
        number: sectionNumber,
        title: sectionTitle,
        blocks: currentBlocks,
      });
    }
    hasActiveSection = true;
    sectionId = title ? slugify(title) : genId();
    sectionNumber = String(sections.length + 1).padStart(2, "0");
    sectionTitle = title;
    currentBlocks = [];
    paraBuffer = [];
    listBuffer = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (!inCode) {
        flushPara();
        flushList();
        const meta = line.slice(3).trim();
        const match = meta.match(/^(\w+)(?:\s*\(([^)]+)\))?$/);
        codeLang = match ? match[1] : meta;
        codeFilename = match && match[2] ? match[2] : "";
        inCode = true;
      } else {
        flushCode();
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    if (line.startsWith("# ")) {
      pushSection(line.slice(2).trim());
      continue;
    }

    const quoteMatch = line.match(/^>\s*"([^"]+)"\s*—\s*(.+)$/);
    if (quoteMatch) {
      flushPara();
      flushList();
      const [, text, rest] = quoteMatch;
      const yearMatch = rest.match(/^(.+?),\s*(\d{4})$/);
      const author = yearMatch ? yearMatch[1].trim() : rest.trim();
      const year = yearMatch ? yearMatch[2] : "";
      currentBlocks.push({
        id: genId(),
        type: "quote",
        text,
        author,
        year,
      });
      continue;
    }

    const listMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (listMatch) {
      flushPara();
      const [, number, text] = listMatch;
      listBuffer.push({ number, text });
      continue;
    } else if (listBuffer.length > 0) {
      flushList();
    }

    if (line.trim() === "") {
      flushPara();
      continue;
    }

    paraBuffer.push(line);
  }

  if (inCode) {
    flushCode();
  } else {
    flushPara();
  }
  flushList();

  if (hasActiveSection) {
    sections.push({
      id: sectionId,
      number: sectionNumber,
      title: sectionTitle,
      blocks: currentBlocks,
    });
  } else if (currentBlocks.length > 0) {
    sections.push({
      id: genId(),
      number: "01",
      title: "",
      blocks: currentBlocks,
    });
  }

  return renumberSections(sections);
}