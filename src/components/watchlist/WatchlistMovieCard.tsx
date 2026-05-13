import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/services/tmdb";
import { IconStarFilled } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import WatchlistButton from "./WatchlistButton";
import { prismaMovieToTMDB } from "@/lib/mappers";
import { WatchlistStatus } from "@/types/watchlist";
import type { WatchlistEntryWithMovie } from "@/types/watchlist";

interface WatchlistMovieCardProps {
  entry: WatchlistEntryWithMovie;
}

export default function WatchlistMovieCard({ entry }: WatchlistMovieCardProps) {
  const { movie, status } = entry;
  const tmdbMovie = prismaMovieToTMDB(movie);

  return (
    <Link href={`/movies/${movie.tmdbId}`} className="group relative block">
      <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-muted">
        <Image
          src={getPosterUrl(movie.posterPath)}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg" />

        {/* Watchlist button */}
        <div className="absolute bottom-2 right-2 z-10">
          <WatchlistButton movie={tmdbMovie} />
        </div>

        {/* Rating badge */}
        {movie.voteAverage && (
          <Badge variant="rating" className="absolute top-2 left-2 z-10">
            <IconStarFilled className="text-primary" data-icon="inline-start" />
            {movie.voteAverage.toFixed(1)}
          </Badge>
        )}
      </div>

      {/* Info below poster */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <div className="flex items-center justify-between gap-1">
          <p className="truncate text-sm font-medium leading-tight">
            {movie.title}
          </p>
          <Badge variant="outline" className="shrink-0 text-xs">
            {WatchlistStatus[status as keyof typeof WatchlistStatus]}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {movie.releaseDate?.slice(0, 4)}
        </p>
      </div>
    </Link>
  );
}
