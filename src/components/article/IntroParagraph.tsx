interface IntroParagraphProps {
  intro: string;
}

export default function IntroParagraph({ intro }: IntroParagraphProps) {
  return (
    <div className="border-t border-white/[0.07] pt-8">
      <p className="font-serif text-lg italic leading-[1.8] text-neutral-300">
        {intro}
      </p>
    </div>
  );
}
