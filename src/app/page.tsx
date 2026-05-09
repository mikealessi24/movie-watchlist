"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/Navbar";
import MovieGrid from "@/components/movies/MovieGrid";
import Hero from "@/components/hero/Hero";
import { useDebounce } from "@/hooks/useDebounce";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedQuery = useDebounce(searchValue, 300);
  const { ref: heroSearchRef, inView: heroSearchInView } = useInView({
    threshold: 0,
  });

  return (
    <>
      <Navbar
        showSearch={!heroSearchInView}
        value={searchValue}
        onChange={setSearchValue}
      />
      <Hero
        onChange={setSearchValue}
        value={searchValue}
        searchRef={heroSearchRef}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 w-full">
        <MovieGrid query={debouncedQuery} />
      </div>
    </>
  );
}
