import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/services/tmdb";
import type { TMDBMovie } from "@/types/tmdb";
import { IconStarFilled, IconBookmark } from "@tabler/icons-react";
import WatchlistButton from "../watchlist/WatchlistButton";

interface MovieCardProps {
  movie: TMDBMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`} className="group relative block">
      <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-muted">
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg" />

        {/* Watchlist button */}
        <div className="absolute top-2 right-2 z-10">
          <WatchlistButton movie={movie} />
        </div>

        {/* Rating badge */}
        <div className="flex items-center gap-0.5 absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          <IconStarFilled height={14} width={14} className=" text-yellow-300" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Info below poster */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="truncate text-sm font-medium leading-tight">
          {movie.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </Link>
  );
}
