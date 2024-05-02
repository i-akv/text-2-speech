"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ThemeToggleBtn = () => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };
  return (
    <Button className="rounded-full p-2" onClick={toggleTheme}>
      {theme==="dark"&&<Sun/>}
      {theme==="light"&&<Moon/>}
    </Button>
  );
};

export default ThemeToggleBtn;
