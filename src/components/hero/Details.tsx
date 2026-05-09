import { TMDBMovie } from "@/types/tmdb";
import { IconStarFilled } from "@tabler/icons-react";

interface DetailProps {
  movie: TMDBMovie;
}

export default function Detail({ movie }: DetailProps) {
  return (
    <div className="absolute bottom-20 md:bottom-48 left-0 right-0 px-8 pt-8">
      <div className="flex flex-col items-start gap-2 max-w-lg">
        <div className="flex items-center gap-2">
          <IconStarFilled
            stroke={1.5}
            className="text-xl md:text-2xl text-yellow-300"
          />
          <span className="text-white text-lg md:text-xl font-semibold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg leading-tight wrap-break-word">
          {movie.title}
        </h2>
        <p className="text-white/50 text-xs sm:text-sm tracking-widest uppercase">
          {movie.release_date?.slice(0, 4)}
        </p>
        {movie.overview && (
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-3 mt-1 max-w-sm">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
}
