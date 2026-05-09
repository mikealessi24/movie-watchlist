"use client";

import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/Navbar";

import MovieGrid from "@/components/movies/MovieGrid";
import HeroCarousel from "@/components/HeroCarousel";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { ref: heroSearchRef, inView: heroSearchInView } = useInView({
    threshold: 0,
  });

  return (
    <>
      <Navbar onSearch={setSearchQuery} showSearch={!heroSearchInView} />

      {/* Hero */}
      <HeroCarousel />

      {/* Hero search ref — invisible element that tracks visibility */}
      <div ref={heroSearchRef} className="-mt-1 h-1" />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <MovieGrid query={searchQuery} />
      </div>
    </>
  );
}
