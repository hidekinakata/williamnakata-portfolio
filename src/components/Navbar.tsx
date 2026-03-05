"use client";

import React from "react";
import { Menu, Moon, Sun, ExternalLink, Monitor } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useAppContext();

  return <></>;
};

export default Navbar;
