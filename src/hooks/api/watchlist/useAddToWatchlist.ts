import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { watchlistKeys } from "@/lib/queryKeys";
import type { TMDBMovie } from "@/types/tmdb";
import { WatchlistEntryWithMovie } from "@/types/watchlist";

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie: TMDBMovie) => {
      const { data } = await axios.post("/api/watchlist", { tmdbId: movie.id });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        watchlistKeys.lists(),
        (old: WatchlistEntryWithMovie[] = []) => [...old, data],
      );
      toast.success(`Added to your list`, {
        action: {
          label: "View list",
          onClick: () => (window.location.href = "/watchlist"),
        },
      });
    },
    onError: () => {
      toast.error("Failed to add");
    },
  });
}
