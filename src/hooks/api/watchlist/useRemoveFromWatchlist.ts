import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { watchlistKeys } from "@/lib/queryKeys";
import { WatchlistEntryWithMovie } from "@/types/watchlist";

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entryId: string) => {
      const { data } = await axios.delete(`/api/watchlist/${entryId}`);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        watchlistKeys.lists(),
        (old: WatchlistEntryWithMovie[] = []) =>
          old.filter((entry) => entry.id !== data.id),
      );
      toast.success(`Removed ${data.movie.title} from your list`);
    },
    onError: () => {
      toast.error("Failed to remove");
    },
  });
}
