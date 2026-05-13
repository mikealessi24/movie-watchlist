import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { watchlistKeys } from "@/lib/queryKeys";

export function useWatchlist() {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: watchlistKeys.lists(),
    queryFn: async () => {
      const { data } = await axios.get("/api/watchlist");
      return data;
    },
    enabled: Boolean(session),
  });
}
