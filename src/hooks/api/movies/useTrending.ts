import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { movieKeys } from "@/lib/queryKeys";
import type { TMDBMovie } from "@/types/tmdb";

async function getTrending(): Promise<TMDBMovie[]> {
  const { data } = await axios.get("/api/movies/trending");
  return data.results;
}

export function useTrending() {
  return useQuery({
    queryKey: movieKeys.list("trending"),
    queryFn: getTrending,
  });
}
