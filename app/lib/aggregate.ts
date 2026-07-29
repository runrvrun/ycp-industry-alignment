import { REVIEW_ITEM_IDS, VerdictKey } from "@/app/lib/taxonomy-data";

export interface ItemTally {
  itemId: string;
  agree: number;
  change: number;
  object: number;
  noVerdict: number;
  total: number;
}

interface ResponseLike {
  itemId: string;
  verdict: string | null;
}

export function tallyByItem(allResponses: ResponseLike[]): Record<string, ItemTally> {
  const tallies: Record<string, ItemTally> = Object.fromEntries(
    REVIEW_ITEM_IDS.map((itemId) => [itemId, { itemId, agree: 0, change: 0, object: 0, noVerdict: 0, total: 0 }])
  );

  for (const r of allResponses) {
    const tally = tallies[r.itemId];
    if (!tally) continue;
    tally.total++;
    const key = (r.verdict as VerdictKey | null) ?? null;
    if (key === "agree") tally.agree++;
    else if (key === "change") tally.change++;
    else if (key === "object") tally.object++;
    else tally.noVerdict++;
  }

  return tallies;
}
