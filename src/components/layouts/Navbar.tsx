"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import GradualBlur from "@/components/effects/GradualBlur";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import StaggeredMenu from "./StaggeredMenu";

const Navbar = () => {
  const t = useTranslations("Menu");
  const tHero = useTranslations("Hero");
  const locale = useLocale();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const localeOptions = ["pt", "en"] as const;

  const socialItems = [
    { label: "LinkedIn", link: "https://linkedin.com/in/whnakata" },
    { label: "GitHub", link: "https://github.com/hidekinakata" },
    { label: "Instagram", link: "https://instagram.com/hidekinakata_" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;
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
  }, [lastScrollY, isMenuOpen]);

  const navItems = [
    { label: t("Home"), link: "/" },
    { label: t("About"), link: "/#about" },
    { label: t("Experience"), link: "/#experience" },
    { label: t("Projects"), link: "/#projects" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-screen max-w-[100vw]",
        "transition-transform duration-300",
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

      {/* Desktop Navbar */}
      <div className="3xl:h-32 3xl:px-20 4xl:px-32 hidden h-20 grid-cols-[1fr_auto_1fr] items-center bg-linear-to-b from-black/50 via-black/10 to-black/0 px-6 lg:grid lg:px-12">
        <nav className="hidden lg:block">
          <ul className="flex items-center justify-start gap-6">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <a
                  href={item.link}
                  className="text-2xs relative cursor-pointer font-mono tracking-[0.16em] text-neutral-400 uppercase transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="text-royal-500/60 absolute -top-2 -right-3 font-mono text-[0.45rem] leading-none tracking-[0.1em]">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo */}
        <Link
          href="/"
          className="col-start-2 flex flex-col items-center uppercase *:leading-none"
        >
          <span className="mr-1.5 text-xs font-thin tracking-[0.08em] text-white/50 lg:mr-2 lg:text-sm">
            William
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white lg:text-2xl">
            Nakata
          </span>
        </Link>

        {/* Right actions */}
        <div className="hidden items-center justify-end gap-2 lg:flex">
          {/* Locale switcher */}
          <div className="bg-royal-500/8 flex items-center border border-white/18 p-0.5">
            {localeOptions.map((option) => {
              const isActive = locale === option;
              return (
                <Link
                  key={option}
                  href={pathname}
                  locale={option}
                  className={cn(
                    "text-3xs flex h-6 w-8 items-center justify-center font-mono font-semibold tracking-[0.14em] uppercase transition-colors",
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
          <Link
            href="/articles"
            className="flex items-center gap-2 border border-lime-500/40 bg-lime-400/8 px-4 py-2 transition-colors hover:border-lime-500/65 hover:bg-lime-400/12"
          >
            <span className="text-2xs/3 font-mono font-medium tracking-[0.2em] text-lime-400 uppercase">
              {t("Blog")}
            </span>
          </Link>

          {/* Download CV */}
          <a
            href="#"
            className="flex items-center gap-2 border border-violet-500/45 bg-violet-400/10 px-4 py-2 transition-colors hover:border-violet-500/70 hover:bg-violet-400/15"
          >
            <span className="text-2xs/3 font-mono font-medium tracking-[0.2em] text-violet-400 uppercase">
              {tHero("downloadCV")}
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="h-20 bg-linear-to-b from-black/50 via-black/10 to-black/0 lg:hidden">
        <StaggeredMenu
          isFixed={true}
          items={[...navItems, { label: t("Blog"), link: "/articles" }]}
          socialItems={socialItems}
          colors={[
            "var(--color-berwickberry-800)",
            "var(--color-royal-900)",
            "var(--color-royal-700)",
          ]}
          accentColor="var(--color-plantation-400)"
          openLabel={t("open")}
          closeLabel={t("close")}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
          footer={
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-3xs font-mono font-medium tracking-[0.2em] text-neutral-500 uppercase">
                  Language
                </span>
                <div className="bg-royal-500/8 flex w-fit items-center border border-white/10 p-0.5">
                  {localeOptions.map((option) => {
                    const isActive = locale === option;
                    return (
                      <Link
                        key={option}
                        href={pathname}
                        locale={option}
                        className={cn(
                          "text-3xs flex h-8 w-12 items-center justify-center font-mono font-semibold tracking-[0.14em] uppercase transition-colors",
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
              </div>
              <a
                href="#"
                className="flex w-full items-center justify-center gap-2 border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10"
              >
                <span className="text-2xs font-mono font-medium tracking-[0.2em] text-white uppercase">
                  {tHero("downloadCV")}
                </span>
              </a>
            </div>
          }
        />
      </div>
    </header>
  );
};

export default Navbar;
