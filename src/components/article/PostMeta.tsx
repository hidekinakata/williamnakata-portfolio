interface PostMetaProps {
  date: string;
  readTime: string;
  tags: string[];
}

export default function PostMeta({ date, readTime, tags }: PostMetaProps) {

  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-2xs tracking-[0.1em]">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-royal-500" />
        <span className="text-royal-500">{date}</span>
      </div>

      <div className="h-3 w-px bg-white/10" />

      <span className="text-neutral-400">{readTime}</span>

      <div className="h-3 w-px bg-white/10" />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border border-royal-500/[0.27] px-2 py-1 text-[9px] tracking-[0.1em] text-royal-500 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
