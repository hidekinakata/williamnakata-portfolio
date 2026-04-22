"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import GradualBlur from "@/components/effects/GradualBlur";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";

const Navbar = () => {
  const t = useTranslations("Menu");
  const tHero = useTranslations("Hero");
  const locale = useLocale();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const localeOptions = ["pt", "en"] as const;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: t("About"), href: "#about" },
    { label: t("Experience"), href: "#experience" },
    { label: t("Projects"), href: "#projects" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-screen max-w-[100vw] overflow-hidden",
        "grid grid-cols-[1fr_auto_1fr] items-center",
        "h-20 lg:h-28 3xl:h-32 px-6 lg:px-12 3xl:px-20 4xl:px-32",
        "transition-transform duration-300",
        "bg-linear-to-b from-black/50 via-black/10 to-black/0",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <GradualBlur
        target="parent"
        position="top"
        height="100%"
        strength={0.5}
        divCount={7}
        curve="bezier"
        exponential
        opacity={1}
        className={"-z-1!"}
      />

      {/* Nav desktop */}
      <nav className="hidden lg:block">
        <ul className="flex justify-start items-center gap-6">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative font-mono text-2xs tracking-[0.16em] uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
                <span className="absolute -top-2 -right-3 font-mono text-[0.45rem] leading-none tracking-[0.1em] text-royal-500/60">
                  0{index + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logo */}
      <h1 className="uppercase flex flex-col items-center *:leading-none col-start-2">
        <span className="text-xs lg:text-sm font-thin tracking-[0.08em] text-white/50 mr-1.5 lg:mr-2">
          William
        </span>
        <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-white">
          Nakata
        </span>
      </h1>

      {/* Mobile burger */}
      <div className="lg:hidden flex justify-end items-center">
        <button className="flex flex-col items-center justify-center gap-1 p-2 aspect-square cursor-pointer">
          <span className="block h-0.5 w-3.5 bg-white rounded place-self-end" />
          <span className="block h-0.5 w-6 bg-white rounded" />
          <span className="block h-0.5 w-3.5 bg-white rounded" />
        </button>
      </div>

      {/* Right actions */}
      <div className="hidden lg:flex justify-end items-center gap-2">
        {/* Locale switcher */}
        <div className="flex items-center border border-white/18 bg-royal-500/8 p-0.5">
          {localeOptions.map((option) => {
            const isActive = locale === option;
            return (
              <Link
                key={option}
                href={pathname}
                locale={option}
                className={cn(
                  "flex h-6 w-8 items-center justify-center font-mono text-3xs font-semibold tracking-[0.14em] uppercase transition-colors",
                  isActive
                    ? "bg-royal-500 text-white"
                    : "text-white/45 hover:text-white/80",
                )}
              >
                {option}
              </Link>
            );
          })}
        </div>

        {/* Blog */}
        <a
          href="#"
          className="flex items-center py-2 px-4 gap-2 bg-lime-400/8 border border-lime-500/40 hover:border-lime-500/65 hover:bg-lime-400/12 transition-colors"
        >
          <span className="tracking-[0.2em] uppercase text-lime-400 font-mono font-medium text-2xs/3">
            {t("Blog")}
          </span>
        </a>

        {/* Download CV */}
        <a
          href="#"
          className="flex items-center py-2 px-4 gap-2 bg-violet-400/10 border border-violet-500/45 hover:border-violet-500/70 hover:bg-violet-400/15 transition-colors"
        >
          <span className="tracking-[0.2em] uppercase text-violet-400 font-mono font-medium text-2xs/3">
            {tHero("downloadCV")}
          </span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
