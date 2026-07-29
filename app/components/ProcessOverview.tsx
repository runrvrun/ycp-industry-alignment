import { ScreenId } from "@/app/lib/types";

interface ProcessOverviewProps {
  active: boolean;
  onNavigate: (screen: ScreenId) => void;
}

export default function ProcessOverview({ active, onNavigate }: ProcessOverviewProps) {
  return (
    <section className={`screen${active ? " active" : ""}`} id="s2" role="tabpanel">
      <div className="screen-head">
        <p className="eyebrow">How we align</p>
        <h1 className="lead">One standard, agreed once, adopted everywhere.</h1>
      </div>

      <div className="hypo">
        <p className="eyebrow">Hypothesis — the purpose of this tool</p>
        <p>
          YCP already serves a coherent set of industries — the same set our peers and our own website use. The
          fragmentation is <b>internal</b>: four systems each captured a slice of that set for their own purpose,
          with no single owner. A single <b>One YCP industry standard</b> — defined once and adopted across the
          website, HUB, the Expert database, and all internal and external materials — closes this for good.
        </p>
      </div>

      <p className="eyebrow" style={{ marginTop: 26 }}>
        The process
      </p>
      <div className="flow">
        <div className="step">
          <div className="n">1</div>
          <h4>Lay out the hypothesis</h4>
          <p>Proposed standard set out in this tool, with the reasoning for each call.</p>
        </div>
        <div className="step here">
          <div className="n">2</div>
          <h4>Get MP comments</h4>
          <p>Managing Partners review and comment on each practice (next screen).</p>
          <span className="badge">You are here</span>
        </div>
        <div className="step">
          <div className="n">3</div>
          <h4>Consolidate &amp; finalise</h4>
          <p>Comments reconciled into a single final standard.</p>
        </div>
        <div className="step">
          <div className="n">4</div>
          <h4>Identify the updates</h4>
          <p>What changes, where — website, HUB, Expert DB, credentials, GFI — and who owns each.</p>
        </div>
        <div className="step">
          <div className="n">5</div>
          <h4>Ratify at DMC &amp; GMC</h4>
          <p>Final standard tabled and signed off as the global standard.</p>
        </div>
      </div>

      <div className="timeline">
        <p className="eyebrow">Target timeline</p>
        <ul className="tl">
          <li>
            <span className="d">Week of 28 Jul</span> <span className="x">— tool circulated to Managing Partners</span>
          </li>
          <li>
            <span className="d">28 Jul – 7 Aug</span> <span className="x">— comment window (~one week for input)</span>
          </li>
          <li>
            <span className="d">Week of 11 Aug</span>{" "}
            <span className="x">— consolidate comments and finalise the standard</span>
          </li>
          <li className="key">
            <span className="d">18 Aug (DMC) &amp; 19 Aug (GMC)</span>{" "}
            <span className="x">— ratify and document the finalised split</span>
          </li>
        </ul>
      </div>

      <div className="navbtns">
        <button className="btn ghost" onClick={() => onNavigate("s1")}>
          ← The problem
        </button>
        <button className="btn primary" onClick={() => onNavigate("s3")}>
          See the proposed standard →
        </button>
      </div>
    </section>
  );
}
