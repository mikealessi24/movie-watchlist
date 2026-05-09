"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Search({ onSearch, searchQuery = "" }: SearchProps) {
  const [value, setValue] = useState(searchQuery);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="absolute bottom-20 left-0 right-0 px-8 pointer-events-none hidden sm:block">
      <div className="max-w-md md:max-w-md lg:max-w-lg xl:max-w-4xl mx-auto flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 h-10 md:h-12 lg:h-14 pointer-events-auto focus-within:ring-2 focus-within:ring-accent">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search movies..."
          className="flex-1 bg-transparent border-none shadow-none text-white placeholder:text-white/50 focus-visible:ring-0 h-full px-3 lg:px-4 text-sm lg:text-base"
        />
        <Button className="rounded-full bg-primary text-accent hover:bg-primary/90 shrink-0 h-4/5 aspect-square p-0 cursor-pointer">
          <SearchIcon size={16} />
        </Button>
      </div>
    </div>
  );
}
