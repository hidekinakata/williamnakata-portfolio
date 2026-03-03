"use client";

import React, {createContext, ReactNode, useEffect, useState} from "react";
import {CookiesProvider, useCookies} from "react-cookie";

type Theme = "light" | "dark" | "system";
type Language = "en" | "pt-BR";

const ThemeArray = [
  "light",
  "dark",
  "system",
] as const satisfies readonly Theme[];

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;

  language: Language;
  toggleLanguage: () => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProviderBase = ({children}: { children: ReactNode }) => {
  const [cookies, setCookie] = useCookies(["theme", "language"]);

  const [theme, setTheme] = useState<Theme>(cookies.theme || "system");
  const [language, setLanguage] = useState<Language>(cookies.language || "en");

  useEffect(() => {
    const applyTheme = (currentTheme: Theme, systemPrefersDark: boolean) => {
      const root = document.documentElement;
      const isDark =
        currentTheme === "dark" ||
        (currentTheme === "system" && systemPrefersDark);

      if (root.classList.contains("dark") !== isDark) {
        root.classList.toggle("dark", isDark);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme(theme, e.matches);
      }
    };

    applyTheme(theme, mediaQuery.matches);

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const currentTheme = ThemeArray.indexOf(theme);
    const nextTheme = (currentTheme + 1) % ThemeArray.length;

    setCookie("theme", ThemeArray[nextTheme], {path: "/"});
    setTheme(ThemeArray[nextTheme]);
  };

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "pt-BR" : "en";
    setCookie("language", nextLanguage, {path: "/"});
    setLanguage(nextLanguage);
  };

  const value = {
    theme,
    toggleTheme,
    language,
    toggleLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const AppProvider = ({children}: { children: ReactNode }) => {
  return (
    <CookiesProvider>
      <AppProviderBase>{children}</AppProviderBase>
    </CookiesProvider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
