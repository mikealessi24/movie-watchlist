"use client";

import { useSession } from "next-auth/react";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useWatchlist } from "@/hooks/api/watchlist/useWatchlist";
import { useAddToWatchlist } from "@/hooks/api/watchlist/useAddToWatchlist";
import { useRemoveFromWatchlist } from "@/hooks/api/watchlist/useRemoveFromWatchlist";
import type { TMDBMovie } from "@/types/tmdb";
import { WatchlistEntryWithMovie } from "@/types/watchlist";
import React from "react";
import { Button } from "@/components/ui/button";

interface WatchlistButtonProps {
  movie: TMDBMovie;
  size?: number;
}

export default function WatchlistButton({
  movie,
  size = 16,
}: WatchlistButtonProps) {
  const { data: session } = useSession();
  const { data: watchlist, isLoading } = useWatchlist();
  const add = useAddToWatchlist();
  const remove = useRemoveFromWatchlist();

  if (!session) return null;
  if (isLoading) return null;

  const entry = watchlist?.find(
    (e: WatchlistEntryWithMovie) => e.movie.tmdbId === movie.id,
  );
  const isInWatchlist = Boolean(entry);

  function getOptimisticState() {
    if (add.isPending) return true;
    if (remove.isPending) return false;
    return isInWatchlist;
  }

  const optimisticInWatchlist = getOptimisticState();

  function handleClick() {
    if (isInWatchlist) {
      remove.mutate(entry.id);
    } else {
      add.mutate(movie);
    }
  }

  return (
    <Button
      size="icon-lg"
      variant="watchlist"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      className="cursor-pointer"
    >
      {optimisticInWatchlist ? (
        <IconBookmarkFilled size={size} className="text-primary" />
      ) : (
        <IconBookmark size={size} />
      )}
    </Button>
  );
}
