"use client";

import React from "react";
import { useTrending } from "@/hooks/api/movies/useTrending";
import Search from "./Search";
import HeroCarousel from "./HeroCarousel";

interface HeroProps {
  onChange?: (query: string) => void;
  value?: string;
  searchRef?: (node: HTMLDivElement | null) => void;
  bottomRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Hero({ onChange, value, searchRef, bottomRef }: HeroProps) {
  const { data: movies, isLoading } = useTrending();

  if (isLoading) {
    return <div className="w-full h-[65vh] animate-pulse bg-muted" />;
  }

  if (!movies?.length) return null;

  return (
    <div className="w-full relative">
      <HeroCarousel movies={movies} />
      <Search onChange={onChange} value={value} />
      <div
        ref={searchRef}
        className="absolute bottom-36 left-0 right-0 h-px pointer-events-none"
      />
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
      />
    </div>
  );
}
