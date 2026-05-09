import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { movieKeys } from "@/lib/queryKeys";
import type { TMDBSearchResponse } from "@/types/tmdb";

async function search(
  query: string,
  page: number,
): Promise<TMDBSearchResponse> {
  const { data } = await axios.get("/api/movies/search", {
    params: { query, page },
  });
  return data;
}

export function useSearch(query: string) {
  return useInfiniteQuery({
    queryKey: movieKeys.search(query),
    queryFn: ({ pageParam }) => search(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.trim() !== "",
  });
}
