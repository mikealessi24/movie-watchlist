import { TMDBMovie } from "@/types/tmdb";
import { IconBookmark } from "@tabler/icons-react";

interface WatchlistProps {
  movie: TMDBMovie;
  size?: number;
}

export default function WatchlistButton({ movie, size = 16 }: WatchlistProps) {
  return (
    // TODO: update style and use shadcn ui
    <button className="rounded-full bg-background/70 p-3 text-foreground backdrop-blur-sm">
      <IconBookmark size={size} />
    </button>
  );
}
