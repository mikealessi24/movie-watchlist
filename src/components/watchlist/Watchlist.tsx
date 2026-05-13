"use client";

import { useWatchlist } from "@/hooks/api/watchlist/useWatchlist";
import type { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WatchlistMovieCard from "./WatchlistMovieCard";
import type { WatchlistEntryWithMovie } from "@/types/watchlist";

type Session = typeof auth.$Infer.Session;
interface WatchlistProps {
  session: Session;
}

export default function Watchlist({ session }: WatchlistProps) {
  const { data: watchlist, isLoading } = useWatchlist();

  const saved =
    watchlist?.filter(
      (e: WatchlistEntryWithMovie) => e.status === "WANT_TO_WATCH",
    ) ?? [];

  const watched =
    watchlist?.filter((e: WatchlistEntryWithMovie) => e.status === "WATCHED") ??
    [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session.user?.image ?? ""} />
          <AvatarFallback className="text-2xl">
            {session.user?.email?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          {session.user?.name && (
            <h1 className="text-2xl font-bold">{session.user.name}</h1>
          )}
          <p className="text-muted-foreground">{session.user?.email}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
            <span>
              <span className="text-foreground font-medium">
                {saved.length}
              </span>{" "}
              saved
            </span>
            <span>•</span>
            <span>
              <span className="text-foreground font-medium">
                {watched.length}
              </span>{" "}
              watched
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : watchlist?.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center">
          <p className="text-muted-foreground">No movies saved yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
          {watchlist?.map((entry: WatchlistEntryWithMovie) => (
            <WatchlistMovieCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
