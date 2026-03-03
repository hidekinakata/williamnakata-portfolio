"use client";

import {
  animate,
  AnimatePresence,
  motion,
  stagger,
  Transition,
  Variants,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

// Variants do container principal
const containerVariants: Variants = {
  hidden: { scale: 1.05, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      // Garante que o container anima ANTES dos filhos
      when: "beforeChildren",
      // Delay entre cada filho direto
      delayChildren: stagger(0.1),
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Variant para o SVG (entra de baixo com fade)
const svgVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

// Variant para o título
const titleVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const PATH_1 =
  "M134.498 36.8675V216.767H230.08V36.8675H134.498ZM217.791 132.791L217.791 204.478H188.434V132.791H217.791ZM176.145 204.478H146.787V132.791H176.145L176.145 204.478ZM146.787 120.502H176.145V49.1566H146.787L146.787 120.502ZM217.791 120.502H188.434V49.1566H217.791V120.502Z";
const PATH_2 =
  "M55.6426 4.86443e-06V12.2892L12.2892 12.2892L12.2892 242.711H67.9317L67.9317 161.124H26.2851L26.2851 66.9076L67.9317 66.9076L67.9317 5.93878e-06L255 1.45752e-06L255 255H92.51V242.711H242.711L242.711 12.2892L80.2209 12.2892L80.2209 66.9076L120.502 66.9076L120.502 161.124H80.2209V255H0L1.45751e-06 0L55.6426 4.86443e-06ZM108.213 148.835V79.1968L80.2209 79.1968L80.2209 148.835H108.213ZM67.9317 148.835L67.9317 79.1968H38.5743L38.5743 148.835H67.9317Z";

// Ponto de luz: dash curto + gap enorme
const PATH_LENGTH = 1800;
const DOT_SIZE = 420;
const GAP = PATH_LENGTH - DOT_SIZE;

const trailTransition: Transition = {
  strokeDashoffset: {
    duration: 1.0,
    ease: "linear",
    repeat: Infinity,
  },
  opacity: {
    duration: 0.8,
    ease: "easeInOut",
  },
};

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { onLoadingComplete } = useLoading();

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.5,
      delay: 0.2,
      ease: [0, 1, 0.7, 0.7],
      onUpdate: (latest) => setProgress(latest),
      onComplete: () => {
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      },
    });

    return () => controls.stop();
  }, []);

  const handleSvgComplete = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <AnimatePresence mode="wait" onExitComplete={onLoadingComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 w-dvw h-dvh z-50 flex flex-col items-center justify-center bg-neutral-950 p-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className={"relative flex-1 w-full bg-neutral-950/50 rounded-xl"}
          >
            <motion.span className="absolute top-0 left-0 w-6 h-6 border-l border-t border-white/25" />
            <motion.span className="absolute top-0 right-0 w-6 h-6 border-r border-t border-white/25" />
            <motion.span className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-white/25" />
            <motion.span className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-white/25" />

            <span
              className={
                "absolute top-3 right-6 font-mono text-xs text text-neutral-400"
              }
            >
              EST. 2026
            </span>

            <div
              className={
                "absolute w-full top-3/7 left-1/2 -translate-1/2 flex flex-col items-center justify-center "
              }
            >
              <motion.svg
                width="255"
                height="255"
                viewBox="0 0 255 255"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-28 sm:w-30 md:w-36 lg:w-40 h-auto "
                variants={svgVariants}
              >
                <defs>
                  {/* Gradiente que cria a "cauda" do ponto de luz */}
                  <linearGradient
                    id="light-trail-1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="60%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="white" stopOpacity="1" />
                  </linearGradient>

                  <linearGradient
                    id="light-trail-2"
                    x1="100%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="60%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="white" stopOpacity="1" />
                  </linearGradient>

                  {/* Glow suave para o ponto */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ═══ PATH 1 ═══ */}

                {/* Base: contorno fantasma */}
                <path
                  d={PATH_1}
                  stroke="white"
                  strokeOpacity="0.1"
                  strokeWidth={1}
                  fill="none"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />

                {/* Ponto de luz viajante */}
                <motion.path
                  d={PATH_1}
                  stroke="url(#light-trail-1)"
                  strokeWidth={2}
                  fill="none"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeDasharray={`${DOT_SIZE} ${GAP}`}
                  filter="url(#glow)"
                  initial={{ strokeDashoffset: PATH_LENGTH, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 1 }}
                  transition={trailTransition}
                />

                {/* ═══ PATH 2 ═══ */}

                {/* Base: contorno fantasma */}
                <path
                  d={PATH_2}
                  stroke="white"
                  strokeOpacity="0.1"
                  strokeWidth={1}
                  fill="none"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />

                {/* Ponto de luz viajante */}
                <motion.path
                  d={PATH_2}
                  stroke="url(#light-trail-2)"
                  strokeWidth={2}
                  fill="none"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeDasharray={`${DOT_SIZE} ${GAP}`}
                  filter="url(#glow)"
                  initial={{ strokeDashoffset: -PATH_LENGTH, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 1 }}
                  transition={trailTransition}
                  onAnimationComplete={handleSvgComplete}
                />
              </motion.svg>
              <motion.h1
                className={
                  "text-xl lg:text-3xl text-center font-sans-decorated mt-8"
                }
                variants={titleVariants}
              >
                William Nakata
              </motion.h1>
            </div>

            <motion.div
              className={
                "absolute bottom-16 left-1/2 -translate-x-1/2 h-fit font-mono font-thin text-neutral-400 w-full md:w-1/3 lg:w-72 "
              }
            >
              <div className={"w-full flex justify-between items-center"}>
                <span className="text-sm  lg:text-base">Loading...</span>
                <span className={"text-berwickberry-500"}>
                  {progress.toFixed(2)} %
                </span>
              </div>
              <div className={"block relative w-full h-2"}>
                <span
                  className={
                    "absolute top-0 left-0 block mt-2 h-px w-full bg-white/20"
                  }
                ></span>
                <motion.span
                  className={
                    "absolute top-0 left-0 block mt-2 h-px w-full bg-white/60"
                  }
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100, transformOrigin: "left" }}
                  transition={{ ease: "linear" }}
                ></motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
