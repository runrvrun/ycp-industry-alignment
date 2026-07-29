import { MATRIX } from "@/app/lib/taxonomy-data";
import { ScreenId } from "@/app/lib/types";

interface ComparisonMatrixProps {
  active: boolean;
  onNavigate: (screen: ScreenId) => void;
}

export default function ComparisonMatrix({ active, onNavigate }: ComparisonMatrixProps) {
  let divCount = 0;
  let alignedRows = 0;
  MATRIX.forEach((row) => {
    if (row.cells.every((c) => c.s === "ok")) alignedRows++;
    row.cells.forEach((c) => {
      if (c.s !== "ok") divCount++;
    });
  });

  return (
    <section className={`screen${active ? " active" : ""}`} id="s1" role="tabpanel">
      <div className="screen-head">
        <p className="eyebrow">The problem</p>
        <h1 className="lead">We define our industries in five places — and they don&apos;t match.</h1>
        <p className="sub">
          YCP names its industry practices differently on the public website, in the credentials pack, in HUB, in
          the internal Expert database, and on the MSD Global Focus slide. The same practice appears under
          different names, at different levels of detail, or not at all. That creates friction in business
          development, staffing, reporting, and how we show up to clients. This tool proposes one standard and
          asks for your input to close it.
        </p>
      </div>

      <div className="matrix-meta">
        <div className="stat warn">
          <div className="big">{divCount}</div>
          <div className="lab">cells that diverge or are missing</div>
        </div>
        <div className="stat">
          <div className="big">5</div>
          <div className="lab">internal sources compared</div>
        </div>
        <div className="stat good">
          <div className="big">{alignedRows}</div>
          <div className="lab">concept defined identically everywhere</div>
        </div>
      </div>

      <div className="legend">
        <span>
          <i className="sw ok"></i> Present &amp; consistent
        </span>
        <span>
          <i className="sw div"></i> Named, split or scoped differently
        </span>
        <span>
          <i className="sw gap"></i> Missing entirely
        </span>
        <span style={{ color: "var(--gray-mid)" }}>Hover any highlighted cell for the specific issue</span>
      </div>

      <div className="matrix-scroll">
        <table className="matrix">
          <thead>
            <tr>
              <th>Industry concept</th>
              <th>Public website</th>
              <th>Credentials pack</th>
              <th>HUB (project tagging)</th>
              <th>Expert database</th>
              <th>MSD Global Focus</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => {
              const rowAligned = row.cells.every((c) => c.s === "ok");
              return (
                <tr key={row.c} className={rowAligned ? "aligned-row" : undefined}>
                  <th>{row.c}</th>
                  {row.cells.map((c, i) => (
                    <td key={i} className={`cell ${c.s}`} title={c.m}>
                      <span className="v">{c.v}</span>
                      {c.m && <span className="m">{c.m}</span>}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="discs">
        <p className="eyebrow" style={{ marginTop: 24 }}>
          Where it hurts
        </p>
        <ul className="disc-list">
          <li>
            <span className="tag">Same practice, five names</span>
            <b>Energy</b> shows up as &ldquo;Energy &amp; Natural Resources&rdquo;, &ldquo;Energy &amp;
            Materials&rdquo; and &ldquo;Chemicals &amp; Energy&rdquo;, and HUB breaks it into four separate tiles.
          </li>
          <li>
            <span className="tag">Different granularity</span>HUB fragments <b>Industrials</b> into three tiles and{" "}
            <b>Energy</b> into four, while the website keeps each as one — so roll-ups don&apos;t reconcile.
          </li>
          <li className="gap">
            <span className="tag">Missing where it matters</span>
            <b>Public Sector</b> is a named MSD global focus, yet the Expert database has no bucket for it —
            public-sector experts can&apos;t be found.
          </li>
          <li>
            <span className="tag">Conceptual conflict</span>
            <b>Private Equity</b> is treated as an industry in four sources, though our PE work is value creation
            delivered inside other industries.
          </li>
          <li>
            <span className="tag">Exists in one place only</span>
            <b>Aerospace &amp; Defense</b> (website), <b>Real Estate</b> (HUB) and{" "}
            <b>Professional Services</b> (HUB) appear in a single source each.
          </li>
          <li>
            <span className="tag">The exception</span>Only <b>TMT</b> is defined identically across all five
            sources — proof the rest is fixable, not fundamental.
          </li>
        </ul>
      </div>

      <div className="peerbox">
        <p className="eyebrow">And versus the market</p>
        <h3>Our list is fine. Our consistency isn&apos;t.</h3>
        <p style={{ margin: 0, fontSize: 14.5, color: "var(--sub)" }}>
          Benchmarked against both the strategy cohort and the independent/turnaround cohort, all six firms converge
          on a near-identical set of ~10–14 industry practices. YCP already sits inside that consensus — the
          problem to solve is internal inconsistency, not the choice of industries.
        </p>
        <p className="firms">
          Strategy: McKinsey · BCG · Bain &nbsp;|&nbsp; Independent / turnaround: Alvarez &amp; Marsal · Roland
          Berger · AlixPartners
        </p>
      </div>

      <div className="navbtns">
        <span></span>
        <button className="btn primary" onClick={() => onNavigate("s2")}>
          How we&apos;ll align →
        </button>
      </div>
    </section>
  );
}
