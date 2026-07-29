import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { REVIEW_ITEM_IDS, VERDICT_OPTS } from "@/app/lib/taxonomy-data";

export const runtime = "nodejs";

const VALID_VERDICTS = new Set<string>(VERDICT_OPTS.map((o) => o.k));
const VALID_ITEM_IDS = new Set(REVIEW_ITEM_IDS);

interface AnswerPayload {
  verdict?: string | null;
  comment?: string;
}

interface SubmitPayload {
  reviewer?: { name?: string; office?: string };
  responses?: Record<string, AnswerPayload>;
}

export async function POST(req: Request) {
  let body: SubmitPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const reviewerName = body.reviewer?.name?.trim();
  if (!reviewerName) {
    return NextResponse.json({ error: "reviewer.name is required" }, { status: 400 });
  }

  const responses = body.responses ?? {};
  const responseRows = Object.entries(responses)
    .filter(([itemId]) => VALID_ITEM_IDS.has(itemId))
    .map(([itemId, answer]) => {
      const verdict = answer?.verdict && VALID_VERDICTS.has(answer.verdict) ? answer.verdict : null;
      return {
        itemId,
        verdict,
        comment: (answer?.comment ?? "").toString(),
      };
    });

  try {
    const submission = await prisma.submission.create({
      data: {
        reviewerName,
        reviewerOffice: body.reviewer?.office?.trim() || null,
        responses: { create: responseRows },
      },
    });
    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to save submission", err);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}
