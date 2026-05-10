"use client";

import { useSession } from "next-auth/react";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useWatchlist } from "@/hooks/api/watchlist/useWatchlist";
import { useAddToWatchlist } from "@/hooks/api/watchlist/useAddToWatchlist";
import { useRemoveFromWatchlist } from "@/hooks/api/watchlist/useRemoveFromWatchlist";
import type { TMDBMovie } from "@/types/tmdb";
import { WatchlistEntryWithMovie } from "@/types/watchlist";

interface WatchlistButtonProps {
  movie: TMDBMovie;
  size?: number;
}

export default function WatchlistButton({
  movie,
  size = 16,
}: WatchlistButtonProps) {
  const { data: session } = useSession();
  const { data: watchlist } = useWatchlist();
  const add = useAddToWatchlist();
  const remove = useRemoveFromWatchlist();

  if (!session) return null;

  const entry = watchlist?.find(
    (e: WatchlistEntryWithMovie) => e.movie.tmdbId === movie.id,
  );
  const isInWatchlist = !!entry;
  const isPending = add.isPending || remove.isPending;

  function handleClick() {
    if (isInWatchlist) {
      remove.mutate(entry.id);
    } else {
      add.mutate(movie);
    }
  }

  return (
    // TODO: update style and use shadcn ui
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-full bg-background/70 p-3 text-foreground backdrop-blur-sm disabled:opacity-50 transition cursor-pointer"
    >
      {isInWatchlist ? (
        <IconBookmarkFilled size={size} className="text-primary" />
      ) : (
        <IconBookmark size={size} />
      )}
    </button>
  );
}
