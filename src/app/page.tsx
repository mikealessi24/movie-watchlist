"use client";

import { useState, useRef, useEffect } from "react";
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
  const heroBottomRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const didAutoScroll = useRef(false);

  useEffect(() => {
    if (debouncedQuery && !didAutoScroll.current) {
      didAutoScroll.current = true;
      const el = heroBottomRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > 0) {
        window.scrollTo({
          top: window.scrollY + rect.top - 48,
          behavior: "smooth",
        });
        setTimeout(() => searchBarRef.current?.focus(), 400);
      }
    }
    if (!debouncedQuery) {
      didAutoScroll.current = false;
    }
  }, [debouncedQuery]);

  return (
    <>
      <Navbar
        showSearch={!heroSearchInView}
        value={searchValue}
        onChange={setSearchValue}
        searchBarRef={searchBarRef}
      />
      <Hero
        onChange={setSearchValue}
        value={searchValue}
        searchRef={heroSearchRef}
        bottomRef={heroBottomRef}
      />
      <div className="px-8 py-8 w-full mx-auto max-w-7xl">
        <MovieGrid query={debouncedQuery} />
      </div>
    </>
  );
}
