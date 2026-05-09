export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (type: "popular" | "trending" | "upcoming") =>
    [...movieKeys.lists(), type] as const,
  search: (query: string) => [...movieKeys.lists(), "search", query] as const,
  discover: (params: Record<string, unknown>) =>
    [...movieKeys.lists(), "discover", params] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
};

export const watchlistKeys = {
  all: ["watchlist"] as const,
  lists: () => [...watchlistKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...watchlistKeys.lists(), { filters }] as const,
  detail: (id: string) => [...watchlistKeys.all, "detail", id] as const,
};
