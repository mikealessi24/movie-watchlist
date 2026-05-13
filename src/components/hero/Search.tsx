"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchProps {
  onChange?: (query: string) => void;
  value?: string;
  inNavbar?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function Search({
  onChange,
  value = "",
  inNavbar,
  inputRef,
}: SearchProps) {
  const SearchBar = (
    <div
      className={cn(
        "flex items-center gap-2",
        !inNavbar &&
          "max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto pointer-events-auto",
      )}
    >
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search movies..."
        className={cn(
          "flex-1",
          inNavbar
            ? "h-9 text-sm"
            : "h-11 md:h-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus-visible:ring-primary/80",
        )}
      />
    </div>
  );

  if (inNavbar) return SearchBar;

  return (
    <div className="absolute bottom-20 left-0 right-0 px-8 pointer-events-none hidden sm:block">
      {SearchBar}
    </div>
  );
}
