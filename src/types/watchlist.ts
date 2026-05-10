import type { Movie, WatchlistEntry } from "@prisma/client";

export type WatchlistEntryWithMovie = WatchlistEntry & {
  movie: Movie;
};

export interface DeleteWatchlistResponse {
  success: boolean;
  movie: Movie;
}
