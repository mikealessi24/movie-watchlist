// --- Shared / Base ---

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// --- Movie list item (search, popular, trending, upcoming, discover) ---

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
}

// --- Movie detail (single movie by id) ---

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string; // "YouTube", "Vimeo"
  type: string; // "Trailer", "Teaser", "Clip", "Featurette"
  official: boolean;
  published_at: string;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number; // billing order, lower = more prominent
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string; // "Director", "Producer", etc.
  department: string;
  profile_path: string | null;
}

export interface TMDBMovieDetail extends TMDBMovie {
  runtime: number | null;
  tagline: string | null;
  status: string; // "Released", "In Production", etc.
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  genres: TMDBGenre[];
  production_companies: TMDBProductionCompany[];
  videos: {
    results: TMDBVideo[];
  };
  credits: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
}

// --- Genre list ---

export interface TMDBGenreListResponse {
  genres: TMDBGenre[];
}

// --- Discover params ---

export type TMDBSortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "release_date.desc"
  | "release_date.asc"
  | "revenue.desc"
  | "revenue.asc";

export interface TMDBDiscoverParams {
  page?: number;
  sort_by?: TMDBSortOption;
  with_genres?: string; // comma separated genre ids e.g. "28,12"
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "primary_release_date.gte"?: string; // "YYYY-MM-DD"
  "primary_release_date.lte"?: string;
  with_original_language?: string; // "en", "fr", etc.
}

// --- Convenience type aliases ---

export type TMDBSearchResponse = TMDBPaginatedResponse<TMDBMovie>;
export type TMDBDiscoverResponse = TMDBPaginatedResponse<TMDBMovie>;
export type TMDBPopularResponse = TMDBPaginatedResponse<TMDBMovie>;
export type TMDBTrendingResponse = TMDBPaginatedResponse<TMDBMovie>;
export type TMDBUpcomingResponse = TMDBPaginatedResponse<TMDBMovie>;
