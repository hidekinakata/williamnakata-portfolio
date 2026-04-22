interface PullQuoteProps {
  text: string;
  author: string;
  year: string;
}

export default function PullQuote({ text, author, year }: PullQuoteProps) {
  return (
    <div className="relative border-y border-royal-500/[0.27] py-6">
      <div className="absolute left-0 top-0 h-full w-[3px] bg-royal-500" />
      <blockquote className="pl-6">
        <p className="font-serif text-xl font-bold italic leading-[1.6] text-white/[0.92]">
          {text}
        </p>
        <div className="mt-4 flex items-center gap-2 font-mono text-2xs text-royal-500">
          <span>{author}</span>
          <span className="text-royal-500/50">·</span>
          <span>{year}</span>
        </div>
      </blockquote>
    </div>
  );
}
