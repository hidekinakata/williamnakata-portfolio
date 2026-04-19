"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import GradualBlur from "@/components/effects/GradualBlur";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";

const Navbar = () => {
  const t = useTranslations("Menu");
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

  const navItems = [t("About"), t("Experience"), t("Projects")];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
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

      {/* Nav desktop/tablet */}
      <nav className="hidden lg:block ">
        <ul className="flex justify-start items-center gap-5 text-xs uppercase">
          {navItems.map((item, index) => (
            <li
              key={item}
              className="relative cursor-pointer text-neutral-400 hover:text-white transition-colors tracking-wider"
            >
              {item}
              <span
                className={
                  "absolute top-1 right-0 -translate-y-full translate-x-full text-3xs text-violet-500"
                }
              >
                0{index}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <h1 className="uppercase flex flex-col items-center *:leading-none col-start-2">
        <span className="text-xs lg:text-sm font-thin tracking-[0.08em] text-white/60 mr-1.5 lg:mr-2">
          William
        </span>
        <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-white">
          Nakata
        </span>
      </h1>

      <div className="lg:hidden flex justify-end items-center">
        {/*buger menu*/}
        <button
          className={
            "flex flex-col itens-center justify-center gap-1 p-2 aspect-square cursor-pointer"
          }
        >
          <span
            className={"block h-0.5 w-3.5 bg-white rounded place-self-end"}
          />
          <span className={"block h-0.5 w-6 bg-white rounded"} />
          <span className={"block h-0.5 w-3.5 bg-white rounded"} />
        </button>
      </div>

      <div className="hidden lg:block">
        <div className={"flex justify-end items-center gap-2"}>
          <div className="flex items-center border border-white/20 bg-royal-500/8 p-0.5">
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
                      : "text-white/55 hover:text-white/85",
                  )}
                >
                  {option}
                </Link>
              );
            })}
          </div>

          <div className="w-fit flex items-center py-2 px-4 gap-2 bg-lime-400/8 border border-solid border-lime-500/50 antialiased text-xs/4">
            <div className="tracking-[0.2em] uppercase inline-block text-lime-400 font-mono font-medium shrink-0 text-2xs/3">
              {t("Blog")}
            </div>
          </div>

          <div className="w-fit flex items-center py-2 px-4 gap-2 bg-violet-400/10 border border-solid border-violet-500/50 antialiased text-xs/4">
            <div className="tracking-[0.2em] uppercase inline-block text-violet-400 font-mono font-medium shrink-0 text-2xs/3">
              Download CV
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
