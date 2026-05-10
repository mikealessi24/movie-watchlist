import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { watchlistKeys } from "@/lib/queryKeys";
import type { TMDBMovie } from "@/types/tmdb";

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie: TMDBMovie) => {
      const { data } = await axios.post("/api/watchlist", { movie });
      return data;
    },
    onSuccess: (_data, movie) => {
      queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
      toast.success(`Added ${movie.title} to your list`);
    },
    onError: () => {
      toast.error("Failed to add");
    },
  });
}
