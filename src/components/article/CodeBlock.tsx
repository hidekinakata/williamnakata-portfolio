interface CodeBlockProps {
  filename: string;
  language: string;
  code: string;
}

export default function CodeBlock({ filename, language, code }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-none border border-royal-500/[0.13]">
      <div className="flex items-center justify-between border-b border-royal-500/[0.13] bg-[#12121A] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-royal-500/60" />
          <span className="font-mono text-2xs text-neutral-300">{filename}</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.1em] text-royal-500 uppercase">
          {language}
        </span>
      </div>
      <div className="overflow-x-auto bg-[#0C0C14] px-4 py-4">
        <pre className="font-mono text-[11px] leading-[1.7] text-[#AAAAAA] whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
