import { PRACTICES, HUB_CROSSCUTTING, RULE_ITEM_ID, ATTR_ITEM_ID } from "@/app/lib/taxonomy-data";
import { AnswersMap, ReviewerInfo, VerdictKey } from "@/app/lib/types";
import VerdictGroup from "@/app/components/VerdictGroup";

interface ProposedStandardFormProps {
  active: boolean;
  reviewer: ReviewerInfo;
  onReviewerChange: (field: keyof ReviewerInfo, value: string) => void;
  answers: AnswersMap;
  onVerdictChange: (itemId: string, verdict: VerdictKey) => void;
  onCommentChange: (itemId: string, comment: string) => void;
  errorMessage: string | null;
  submitting: boolean;
  onSubmit: () => void;
}

export default function ProposedStandardForm({
  active,
  reviewer,
  onReviewerChange,
  answers,
  onVerdictChange,
  onCommentChange,
  errorMessage,
  submitting,
  onSubmit,
}: ProposedStandardFormProps) {
  return (
    <section className={`screen${active ? " active" : ""}`} id="s3" role="tabpanel">
      <div className="screen-head">
        <p className="eyebrow">Proposed standard &amp; your input</p>
        <h1 className="lead">The One YCP industry standard — 10 practices.</h1>
        <p className="sub">
          Two levels: each <b>industry practice</b> below is the top-level unit, and the detailed{" "}
          <b>HUB sub-industries</b> — maintained by the OXD team, given the breadth of their work — roll up into
          it. Each row shows the practice, what it includes (with its HUB sub-industries), and why. Add your
          reaction and comments in the last column. Responses go only to the MSD Global Practice lead.
        </p>
      </div>

      <div className="youbar">
        <h3>Your details</h3>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--sub)" }}>
          So your comments can be attributed during consolidation. Other reviewers won&apos;t see your responses.
        </p>
        <div className="row">
          <div className="field">
            <label htmlFor="rvName">
              Name <span className="req">*</span>
            </label>
            <input
              id="rvName"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              value={reviewer.name}
              onChange={(e) => onReviewerChange("name", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="rvOffice">
              Office / role <span style={{ color: "var(--gray-mid)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="rvOffice"
              type="text"
              placeholder="e.g. Managing Partner, Tokyo"
              value={reviewer.office}
              onChange={(e) => onReviewerChange("office", e.target.value)}
            />
          </div>
        </div>
      </div>

      <p className="eyebrow">The 10 proposed practices &amp; their HUB sub-industries</p>
      <div className="ptable-scroll">
        <table className="ptable">
          <colgroup>
            <col className="c-name" />
            <col className="c-inc" />
            <col className="c-why" />
            <col className="c-com" />
          </colgroup>
          <thead>
            <tr>
              <th>Proposed practice nomenclature</th>
              <th>What all is included</th>
              <th>Why</th>
              <th>Your comments &amp; reactions</th>
            </tr>
          </thead>
          <tbody>
            {PRACTICES.map((p, i) => (
              <tr key={p.id}>
                <td>
                  <span className="pnum">Practice {i + 1}</span>
                  <span className="pname">{p.name}</span>
                </td>
                <td>
                  <div>{p.def}</div>
                  {p.rolls && p.rolls.length > 0 && (
                    <ul className="rolls">
                      {p.rolls.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  )}
                  {p.hub.length > 0 && (
                    <div className="hubmap">
                      <span className="hublab">HUB sub-industries</span>
                      {p.hub.map((h) => (
                        <span className="hubchip" key={h}>
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td>
                  <div className="why">{p.why}</div>
                </td>
                <td>
                  <VerdictGroup
                    itemId={p.id}
                    value={answers[p.id]?.verdict ?? null}
                    onChange={(v) => onVerdictChange(p.id, v)}
                  />
                  <textarea
                    placeholder="Comments & reactions"
                    value={answers[p.id]?.comment ?? ""}
                    onChange={(e) => onCommentChange(p.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card pad" style={{ marginTop: 18, borderLeft: "4px solid var(--amber)" }}>
        <p className="eyebrow" style={{ color: "var(--amber)" }}>
          Treated as attributes — not standalone practices
        </p>
        <div className="grid2" style={{ gap: 14 }}>
          <div>
            <p style={{ fontSize: 14, margin: "0 0 8px" }}>
              <b style={{ color: "var(--navy)" }}>Private Equity.</b> PE engagements are classified under the{" "}
              <b>target / portfolio company&apos;s own industry</b> — that&apos;s where the work is actually
              delivered — so PE is not a standalone practice. To keep PE clients identifiable, HUB carries a
              separate <b>Client Type</b> tag (e.g. &ldquo;Private Equity / sponsor&rdquo;) alongside the industry,
              so we can still pull all PE-sponsor work in one view.{" "}
              <i>This differs from the current website, which lists PE as an industry.</i>
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              <b style={{ color: "var(--navy)" }}>Professional Services / Advisors.</b> Not a client industry at
              any peer firm — kept as a client tag, not a practice.
            </p>
            <div className="hubmap" style={{ marginTop: 12 }}>
              <span className="hublab">HUB sub-industries handled here (as a tag, or by primary business)</span>
              {HUB_CROSSCUTTING.map((h) => (
                <span className="hubchip alt" key={h}>
                  {h}
                </span>
              ))}
              <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 8, width: "100%" }}>
                Private Equity is captured via a Client Type tag (the engagement itself is classified by the
                target&apos;s industry); Advisors and Professional Services become client tags; Conglomerate,
                Holding Companies and Others are tagged by the client&apos;s primary business.
              </div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 14, margin: "0 0 10px" }}>
              <b style={{ color: "var(--navy)" }}>Aerospace &amp; Defense.</b> Proposed to split: aviation →
              Transportation &amp; Logistics, defense → Industrials.
            </p>
            <div className="respond" style={{ borderTop: 0, padding: 0, background: "none" }}>
              <div className="rlab">Your reaction to these treatments</div>
              <VerdictGroup
                itemId={ATTR_ITEM_ID}
                value={answers[ATTR_ITEM_ID]?.verdict ?? null}
                onChange={(v) => onVerdictChange(ATTR_ITEM_ID, v)}
              />
              <textarea
                placeholder="Do you agree PE should be an ownership attribute rather than an industry? And with splitting Aerospace & Defense across Transportation and Industrials?"
                value={answers[ATTR_ITEM_ID]?.comment ?? ""}
                onChange={(e) => onCommentChange(ATTR_ITEM_ID, e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <details className="deploy" style={{ borderStyle: "solid", borderColor: "var(--a3)", marginTop: 18 }}>
        <summary style={{ color: "var(--navy)" }}>
          Supporting rule — how we decide where &ldquo;infrastructure&rdquo; work sits (for reference)
        </summary>
        <p style={{ margin: "10px 0 4px", fontSize: 14 }}>
          A single test keeps the three build-heavy practices from overlapping. Classify by the{" "}
          <b>asset&apos;s economic purpose</b>, not the construction activity (EPC happens everywhere, so it
          can&apos;t be the classifier). Apply in order, stop at the first match:
        </p>
        <ol className="rule-steps">
          <li>
            <span className="q">1 · Produces, transmits or extracts energy / resources / water?</span>
            <span className="arrow">→ Energy &amp; Natural Resources</span>
          </li>
          <li>
            <span className="q">2 · Else — moves people or goods?</span>
            <span className="arrow">→ Transportation &amp; Logistics</span>
          </li>
          <li>
            <span className="q">3 · Else — built environment?</span>
            <span className="arrow">→ Construction &amp; Infrastructure</span>
          </li>
        </ol>
        <div className="worked" style={{ marginTop: 12 }}>
          <b>For example:</b> a highway or metro line → Transportation &amp; Logistics · a power plant or
          transmission grid → Energy &amp; Natural Resources · an office tower, hospital or factory building →
          Construction &amp; Infrastructure.
        </div>
        <div className="respond" style={{ marginTop: 14, borderTop: 0, padding: 0, background: "none" }}>
          <div className="rlab">Any comments on this rule (optional)</div>
          <VerdictGroup
            itemId={RULE_ITEM_ID}
            value={answers[RULE_ITEM_ID]?.verdict ?? null}
            onChange={(v) => onVerdictChange(RULE_ITEM_ID, v)}
          />
          <textarea
            placeholder="Any edge cases or refinements to the asset-purpose rule?"
            value={answers[RULE_ITEM_ID]?.comment ?? ""}
            onChange={(e) => onCommentChange(RULE_ITEM_ID, e.target.value)}
          />
        </div>
      </details>

      <div className={`err${errorMessage ? " show" : ""}`}>{errorMessage}</div>
      <div className="submitbar">
        <button className="btn primary" onClick={onSubmit} disabled={submitting}>
          {submitting ? "Submitting…" : "Submit my response"}
        </button>
        <span style={{ fontSize: 13, color: "var(--sub)" }}>You can change any answer before submitting.</span>
      </div>
    </section>
  );
}
