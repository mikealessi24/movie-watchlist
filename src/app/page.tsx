"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/Navbar";

import MovieGrid from "@/components/movies/MovieGrid";
import Hero from "@/components/hero/Hero";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { ref: heroSearchRef, inView: heroSearchInView } = useInView({
    threshold: 0,
  });

  return (
    <>
      <Navbar />
      <Hero onSearch={setSearchQuery} searchQuery={searchQuery} />
      <div ref={heroSearchRef} className="-mt-1 h-1" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <MovieGrid query={searchQuery} />
      </div>
    </>
  );
}
