"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onChange?: (query: string) => void;
  value?: string;
  inNavbar?: boolean;
}

export default function Search({
  onChange,
  value = "",
  inNavbar,
}: SearchProps) {
  const SearchBar = (
    <div
      className={cn(
        "flex items-center rounded-full px-2 border focus-within:ring-2 focus-within:ring-accent",
        inNavbar
          ? "h-9 w-full bg-muted/70 border-border"
          : "h-10 md:h-12 lg:h-14 max-w-md md:max-w-md lg:max-w-lg xl:max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20 pointer-events-auto",
      )}
    >
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search movies..."
        className={cn(
          "flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 h-full px-3",
          inNavbar
            ? "text-foreground placeholder:text-muted-foreground text-sm"
            : "text-white placeholder:text-white/50 lg:px-4 lg:text-base",
        )}
      />
      <Button className="rounded-full bg-primary text-accent hover:bg-primary/90 shrink-0 h-4/5 aspect-square p-0 cursor-pointer">
        <SearchIcon size={16} />
      </Button>
    </div>
  );

  if (inNavbar) return SearchBar;

  return (
    <div className="absolute bottom-20 left-0 right-0 px-8 pointer-events-none hidden sm:block">
      {SearchBar}
    </div>
  );
}
