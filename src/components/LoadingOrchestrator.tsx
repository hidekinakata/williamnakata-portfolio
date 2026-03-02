// src/components/LoadingOrchestrator.tsx
"use client"

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLoading } from "@/context/LoadingContext";

interface Props {
  children: ReactNode;
}

export const LoadingOrchestrator = ({ children }: Props) => {
  const { isLoading } = useLoading();

  return (
    <>
      {/* Loading screen com animação de saída */}
      <LoadingScreen />

      {/* Conteúdo principal — só anima quando loading acabar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={
          isLoading
            ? { opacity: 0, y: 12 }
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          // Pequeno delay para a transição fluir naturalmente
          delay: isLoading ? 0 : 0.1,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};