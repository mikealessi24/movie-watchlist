"use client";

import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <IconSun size={18} className="block dark:hidden" />
      <IconMoon size={18} className="hidden dark:block" />
    </Button>
  );
}
