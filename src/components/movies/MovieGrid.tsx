"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import MovieCard from "./MovieCard";
import { usePopular } from "@/hooks/api/movies/usePopular";
import { useSearch } from "@/hooks/api/movies/useSearch";

interface MovieGridProps {
  query?: string;
}

export default function MovieGrid({ query = "" }: MovieGridProps) {
  const isSearching = query.trim() !== "";

  const popular = usePopular();
  const search = useSearch(query);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = isSearching ? search : popular;

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const movies =
    data?.pages
      .flatMap((page) => page.results)
      .filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id),
      ) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="aspect-2/3 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

  if (isSearching && movies.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">{`No results found for ${query}`}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isSearching && (
        <p className="mb-4 text-sm text-muted-foreground">
          {`Results found for ${query}`}
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={ref} className="py-8 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
          </div>
        )}
      </div>
    </div>
  );
}
