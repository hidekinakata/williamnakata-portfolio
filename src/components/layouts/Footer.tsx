import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, Heart, Plus } from "lucide-react";

const Footer = () => (
  <footer className="w-full relative z-10 py-8 px-4 sm:px-8 lg:px-16 border-t border-border-subtle">
    <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-text-muted font-mono">
        2026 William Nakata. All rights reserved.
      </p>
      <p className="text-xs font-mono text-text-muted">
        v2.0.0 // Built with precision
      </p>
    </div>
  </footer>
);

export default Footer;
