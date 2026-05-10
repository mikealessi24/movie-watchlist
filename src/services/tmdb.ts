import type {
  TMDBSearchResponse,
  TMDBDiscoverResponse,
  TMDBPopularResponse,
  TMDBTrendingResponse,
  TMDBUpcomingResponse,
  TMDBMovieDetail,
  TMDBGenreListResponse,
  TMDBDiscoverParams,
} from "@/types/tmdb";

const BASE_URL = process.env.TMDB_BASE_URL;
const TOKEN = process.env.TMDB_TOKEN;

// TODO: apply these where they belong (discover)
// Also need an order like desc in date
const DEFAULT_PARAMS = {
  include_adult: false,
  certification_country: "US",
  "certification.lte": "R",
  with_original_language: "en",
  "vote_count.gte": 100,
};

// --- Core fetcher ---

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  revalidate = 3600,
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries({ ...DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(
      `TMDB error: ${res.status} ${res.statusText} — ${endpoint}`,
    );
  }

  return res.json();
}

// --- Image helpers ---

export function getPosterUrl(path: string | null, size = "w500"): string {
  if (!path) return "/placeholder-poster.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size = "original"): string {
  if (!path) return "/placeholder-backdrop.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getProfileUrl(path: string | null, size = "w185"): string {
  if (!path) return "/placeholder-profile.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

// --- Endpoints ---

export async function searchMovies(
  query: string,
  page = 1,
): Promise<TMDBSearchResponse> {
  return tmdbFetch<TMDBSearchResponse>(
    "/search/movie",
    { query, page },
    60, // shorter cache for search
  );
}

export async function getPopular(page = 1): Promise<TMDBPopularResponse> {
  return tmdbFetch<TMDBPopularResponse>("/discover/movie", { page });
}

export async function getTrending(
  window: "day" | "week" = "week",
  page = 1,
): Promise<TMDBTrendingResponse> {
  return tmdbFetch<TMDBTrendingResponse>(`/trending/movie/${window}`, { page });
}

export async function getUpcoming(page = 1): Promise<TMDBUpcomingResponse> {
  return tmdbFetch<TMDBUpcomingResponse>("/movie/upcoming", { page });
}

export async function discoverMovies(
  params: TMDBDiscoverParams = {},
): Promise<TMDBDiscoverResponse> {
  return tmdbFetch<TMDBDiscoverResponse>(
    "/discover/movie",
    params as Record<string, string | number | boolean>,
  );
}

export async function getMovie(id: number): Promise<TMDBMovieDetail> {
  return tmdbFetch<TMDBMovieDetail>(
    `/movie/${id}`,
    { append_to_response: "videos,credits" },
    3600,
  );
}

export async function getGenres(): Promise<TMDBGenreListResponse> {
  return tmdbFetch<TMDBGenreListResponse>(
    "/genre/movie/list",
    {},
    86400, // genres barely change, cache for 24 hours
  );
}

// --- Helpers ---

export function getTrailer(movie: TMDBMovieDetail): string | null {
  const trailer = movie.videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube" && v.official,
  );
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
}

export function getDirector(movie: TMDBMovieDetail): string | null {
  const director = movie.credits.crew.find((c) => c.job === "Director");
  return director ? director.name : null;
}

export function getTopCast(movie: TMDBMovieDetail, limit = 10) {
  return movie.credits.cast.sort((a, b) => a.order - b.order).slice(0, limit);
}
