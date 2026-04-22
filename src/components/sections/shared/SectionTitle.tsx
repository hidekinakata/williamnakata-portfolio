"use client";

import { useEffect, useRef, useState } from "react";
import { HTMLMotionProps, motion, MotionProps, Variants } from "framer-motion";
import SectionLabel from "./SectionLabel";
import DecorativeLine from "./DecorativeLine";

export default function SectionTitle({
  label,
  title1,
  title2,
  subtitle,
  variants,
}: {
  label: string;
  title1: string;
  title2: string;
  subtitle: string;
  variants: Variants;
}) {
  const textRef1 = useRef<SVGTextElement>(null);
  const [viewBox1, setViewBox1] = useState("0 0 1000 120");

  const textRef2 = useRef<SVGTextElement>(null);
  const [viewBox2, setViewBox2] = useState("0 0 1000 120");

  useEffect(() => {
    if (textRef1.current) {
      const bbox = textRef1.current.getBBox();
      const style = window.getComputedStyle(textRef1.current);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = ctx.measureText(title1);
      const ascent = metrics.actualBoundingBoxAscent;
      const descent = metrics.actualBoundingBoxDescent;
      const actualHeight = ascent + descent;
      setViewBox1(`${bbox.x} ${-ascent} ${bbox.width} ${actualHeight}`);
    }
  }, [title1]);

  useEffect(() => {
    if (textRef2.current) {
      const bbox = textRef2.current.getBBox();
      const style = window.getComputedStyle(textRef2.current);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = ctx.measureText(title2);
      const ascent = metrics.actualBoundingBoxAscent;
      const descent = metrics.actualBoundingBoxDescent;
      const actualHeight = ascent + descent;
      setViewBox2(`${bbox.x} ${-ascent} ${bbox.width} ${actualHeight}`);
    }
  }, [title2]);

  return (
    <>
      <motion.div custom={0} variants={variants}>
        <SectionLabel>{label}</SectionLabel>
      </motion.div>
      <motion.h1
        custom={1}
        className="flex flex-col leading-none"
        variants={variants}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox1}
          preserveAspectRatio="xMinYMid meet"
          width="100%"
          className="mb-4 w-[70%] text-white/92"
        >
          <text
            ref={textRef1}
            dominantBaseline="auto"
            fill="currentColor"
            fontWeight="900"
          >
            {title1}
          </text>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox2}
          preserveAspectRatio="xMinYMid meet"
          width="100%"
          className="text-royal-500"
        >
          <text
            ref={textRef2}
            dominantBaseline="auto"
            fill="currentColor"
            fontWeight="900"
          >
            {title2}
          </text>
        </svg>
      </motion.h1>
      <motion.div custom={2} variants={variants}>
        <DecorativeLine width="max-w-26 lg:max-w-80" />
      </motion.div>

      <motion.p
        custom={3}
        variants={variants}
        className="3xl:max-w-xl 3xl:text-lg max-w-md font-serif text-sm leading-relaxed text-neutral-400 italic sm:text-base xl:max-w-lg"
      >
        {subtitle}
      </motion.p>
    </>
  );
}
