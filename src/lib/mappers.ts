import type { Movie } from "@prisma/client";
import type { TMDBMovie } from "@/types/tmdb";

export function prismaMovieToTMDB(movie: Movie): TMDBMovie {
  return {
    id: movie.tmdbId,
    title: movie.title,
    overview: movie.overview ?? "",
    poster_path: movie.posterPath ?? null,
    backdrop_path: null,
    release_date: movie.releaseDate ?? "",
    vote_average: movie.voteAverage ?? 0,
    vote_count: 0,
    popularity: 0,
    genre_ids: movie.genreIds ?? [],
    adult: false,
    original_language: "en",
    original_title: movie.title,
  };
}
