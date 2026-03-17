"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  // const { theme, toggleTheme, language, toggleLanguage } = useAppContext();
  const t = useTranslations("Menu");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-linear-to-b from-black/50 via-black/10 to-black/0 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className={"py-8 px-8 flex justify-between items-start"}>
        <h1 className={"uppercase flex flex-col *:leading-none"}>
          <span className={"text-xl font-thin"}>William</span>
          <span className={"text-3xl font-extrabold"}>Nakata</span>
        </h1>

        <nav>
          <ul
            className={
              "flex flex-col justify-center items-end gap-2 text-sm uppercase"
            }
          >
            <li>{t("Home")}</li>
            <li>{t("About")}</li>
            <li>{t("Experience")}</li>
            <li>{t("Projects")}</li>
            <li>{t("Contact")}</li>
            <li>{t("Blog")}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
