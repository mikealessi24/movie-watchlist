import type { Movie, WatchlistEntry } from "@prisma/client";

export enum WatchlistStatus {
  WANT_TO_WATCH = "Want to Watch",
  WATCHING = "Watching",
  WATCHED = "Watched",
}

export type WatchlistEntryWithMovie = WatchlistEntry & {
  movie: Movie;
};

export interface DeleteWatchlistResponse {
  success: boolean;
  movie: Movie;
}
