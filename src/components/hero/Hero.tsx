"use client";

import { useTrending } from "@/hooks/api/movies/useTrending";
import Search from "./Search";
import HeroCarousel from "./HeroCarousel";

interface HeroProps {
  onChange?: (query: string) => void;
  value?: string;
  searchRef?: (node: HTMLDivElement | null) => void;
}

export default function Hero({ onChange, value, searchRef }: HeroProps) {
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
    </div>
  );
}
