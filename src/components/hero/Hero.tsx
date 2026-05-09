"use client";

import { useTrending } from "@/hooks/api/movies/useTrending";
import Search from "./Search";
import HeroCarousel from "./HeroCarousel";

interface HeroProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Hero({ onSearch, searchQuery }: HeroProps) {
  const { data: movies, isLoading } = useTrending();

  if (isLoading) {
    return <div className="w-full h-[65vh] animate-pulse bg-muted" />;
  }

  if (!movies?.length) return null;

  return (
    <div className="w-full relative">
      <HeroCarousel movies={movies} />
      <Search onSearch={onSearch} searchQuery={searchQuery} />
    </div>
  );
}
