import { BLOCKED_IDS } from "./blocklist";

export function cleanResults<T extends { id: number }>(results: T[]): T[] {
  const seen: number[] = [];
  return results.filter((item) => {
    if (BLOCKED_IDS.includes(item.id)) {
      return false;
    }
    if (seen.includes(item.id)) {
      return false;
    }
    seen.push(item.id);
    return true;
  });
}
