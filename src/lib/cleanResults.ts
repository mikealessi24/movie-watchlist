import { BLOCKED_IDS } from "./blocklist";

interface Filterable {
  id: number;
  original_language?: string;
  vote_count?: number;
  adult?: boolean;
}

export function cleanResults<T extends Filterable>(results: T[]): T[] {
  return results.filter((item) => {
    // blocklist
    if (BLOCKED_IDS.includes(item.id)) return false;

    // adult flag
    if (item.adult === true) return false;

    // english only
    if (item.original_language && item.original_language !== "en") return false;

    // minimum vote count
    if (item.vote_count !== undefined && item.vote_count < 25) return false;

    return true;
  });
}
