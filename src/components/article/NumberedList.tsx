interface NumberedListProps {
  items: { number: string; text: string }[];
}

export default function NumberedList({ items }: NumberedListProps) {
  return (
    <div className="border-l-2 border-royal-500 bg-royal-500/[0.04] p-5">
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.number} className="flex gap-3">
            <span className="font-mono text-sm font-semibold text-royal-500">
              {item.number}
            </span>
            <span className="font-sans text-[13px] leading-[1.7] text-[#BBBBBB]">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
