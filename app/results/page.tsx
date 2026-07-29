import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { REVIEW_ITEM_IDS, REVIEW_ITEM_LABELS } from "@/app/lib/taxonomy-data";
import { tallyByItem } from "@/app/lib/aggregate";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const submissions = await prisma.submission.findMany({
    include: { responses: true },
    orderBy: { submittedAt: "desc" },
  });

  const allResponses = submissions.flatMap((s) => s.responses);
  const tallies = tallyByItem(allResponses);

  return (
    <>
      <header className="top">
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="YCP" />
          <div className="divider"></div>
          <div className="htext">
            <span className="k">MSD Global Practice</span>
            <span className="t">Survey results — Industry Practice Alignment</span>
          </div>
          <div className="status">
            <Link href="/" style={{ color: "var(--a2)" }}>
              ← Back to survey
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="wrap">
          <section className="screen active" role="tabpanel">
            <div className="screen-head">
              <p className="eyebrow">For the MSD Global Practice lead</p>
              <h1 className="lead">Responses so far.</h1>
              <p className="sub">
                Read-only view of every MP submission, for consolidation ahead of the 18–19 August DMC/GMC.
              </p>
            </div>

            <div className="matrix-meta">
              <div className="stat">
                <div className="big">{submissions.length}</div>
                <div className="lab">responses submitted</div>
              </div>
            </div>

            <p className="eyebrow" style={{ marginTop: 24 }}>
              Verdicts by item
            </p>
            <div className="matrix-scroll">
              <table className="matrix">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Agree</th>
                    <th>Suggest a change</th>
                    <th>Object</th>
                    <th>No verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {REVIEW_ITEM_IDS.map((itemId) => {
                    const t = tallies[itemId];
                    return (
                      <tr key={itemId}>
                        <th>{REVIEW_ITEM_LABELS[itemId]}</th>
                        <td className={t.agree > 0 ? "cell ok" : "cell"}>
                          <span className="v">{t.agree}</span>
                        </td>
                        <td className={t.change > 0 ? "cell div" : "cell"}>
                          <span className="v">{t.change}</span>
                        </td>
                        <td className={t.object > 0 ? "cell gap" : "cell"}>
                          <span className="v">{t.object}</span>
                        </td>
                        <td className="cell">
                          <span className="v">{t.noVerdict}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="eyebrow" style={{ marginTop: 30 }}>
              All submissions
            </p>
            {submissions.length === 0 && <p className="sub">No responses have been submitted yet.</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {submissions.map((s) => {
                const commentedResponses = s.responses.filter((r) => r.verdict || r.comment.trim());
                return (
                  <details className="deploy" key={s.id} style={{ borderStyle: "solid" }}>
                    <summary style={{ color: "var(--navy)" }}>
                      {s.reviewerName}
                      {s.reviewerOffice ? ` — ${s.reviewerOffice}` : ""}
                      <span style={{ color: "var(--sub)", fontWeight: 400 }}>
                        {" "}
                        · {new Date(s.submittedAt).toLocaleString()}
                      </span>
                    </summary>
                    {commentedResponses.length === 0 ? (
                      <p style={{ fontSize: 13.5 }}>No verdicts or comments given.</p>
                    ) : (
                      <table className="owners">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Verdict</th>
                            <th>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {commentedResponses.map((r) => (
                            <tr key={r.id}>
                              <td>{REVIEW_ITEM_LABELS[r.itemId] ?? r.itemId}</td>
                              <td>{r.verdict ?? "—"}</td>
                              <td>{r.comment || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </details>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <footer className="foot">
        <div className="wrap">
          <span>YCP Holdings — MSD Global Practice · Internal working document for MP syndication</span>
          <span>One YCP Industry Practice Alignment · results</span>
        </div>
      </footer>
    </>
  );
}
