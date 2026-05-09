import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { movieKeys } from "@/lib/queryKeys";
import type { TMDBPopularResponse } from "@/types/tmdb";

async function getPopular(page: number): Promise<TMDBPopularResponse> {
  const { data } = await axios.get("/api/movies/popular", {
    params: { page },
  });
  return data;
}

export function usePopular() {
  return useInfiniteQuery({
    queryKey: movieKeys.list("popular"),
    queryFn: ({ pageParam }) => getPopular(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}
