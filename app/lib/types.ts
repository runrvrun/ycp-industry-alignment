import type { VerdictKey } from "@/app/lib/taxonomy-data";

export type { VerdictKey };

export type ScreenId = "s1" | "s2" | "s3" | "s4";

export interface ReviewerInfo {
  name: string;
  office: string;
}

export interface Answer {
  verdict: VerdictKey | null;
  comment: string;
}

export type AnswersMap = Record<string, Answer>;
