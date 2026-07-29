import { ScreenId } from "@/app/lib/types";

interface NextStepsProps {
  active: boolean;
  onNavigate: (screen: ScreenId) => void;
  submitted: boolean;
  confirmText: string;
}

export default function NextSteps({ active, onNavigate, submitted, confirmText }: NextStepsProps) {
  return (
    <section className={`screen${active ? " active" : ""}`} id="s4" role="tabpanel">
      <div className={`confirm${submitted ? " show" : ""}`}>
        <h3>
          <span className="check">✓</span>Response recorded
        </h3>
        <p style={{ margin: 0, fontSize: 14.5, color: "var(--sub)" }}>{confirmText}</p>
      </div>

      <div className="screen-head">
        <p className="eyebrow">What happens next</p>
        <h1 className="lead">From your input to a ratified standard.</h1>
      </div>

      <div className="grid2">
        <div className="card pad">
          <p className="eyebrow">The path from here</p>
          <ul className="tl" style={{ marginTop: 6 }}>
            <li>
              <span className="d">Now</span>{" "}
              <span className="x">— your response is recorded, visible only to the MSD Global Practice lead.</span>
            </li>
            <li>
              <span className="d">Week of 11 Aug</span>{" "}
              <span className="x">— all MP comments consolidated into a single final standard.</span>
            </li>
            <li className="key">
              <span className="d">18–19 Aug</span>{" "}
              <span className="x">— tabled at DMC and GMC for sign-off as the global internal &amp; external standard.</span>
            </li>
            <li>
              <span className="d">Post-ratification</span> <span className="x">— owners update each system (below).</span>
            </li>
          </ul>
        </div>
        <div className="card pad">
          <p className="eyebrow">The two calls we most want views on</p>
          <p style={{ fontSize: 14 }}>
            <b style={{ color: "var(--navy)" }}>Private Equity</b> — proposed as an <i>ownership flag</i> on the
            operating industry, not a standalone practice (our PE work is value creation inside other industries).
            This differs from the current website.
          </p>
          <p style={{ fontSize: 14, margin: 0 }}>
            <b style={{ color: "var(--navy)" }}>Aerospace &amp; Defense</b> — proposed to split: aviation →
            Transportation &amp; Logistics, defense → Industrials. Flag on Screen 3 if your practice sees this
            differently.
          </p>
        </div>
      </div>

      <p className="eyebrow" style={{ marginTop: 26 }}>
        Once ratified — what gets updated, where, by whom
      </p>
      <table className="owners">
        <thead>
          <tr>
            <th>System</th>
            <th>Update</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Public website</td>
            <td>Adopt the 10-practice names; remove PE as an industry; split Aerospace &amp; Defense</td>
            <td>Marketing + MSD Global Practice</td>
          </tr>
          <tr>
            <td>Credentials pack</td>
            <td>Merge Construction + Infrastructure tile; fold F&amp;B into Consumer &amp; Retail; align names</td>
            <td>MSD Global Practice</td>
          </tr>
          <tr>
            <td>HUB</td>
            <td>Add parent-practice roll-up behind the 32 sectors; add PE/sponsor flag; enable account-level roll-up</td>
            <td>YCP Digital (Arfian)</td>
          </tr>
          <tr>
            <td>Expert database</td>
            <td>Expand to the 10 practices; add Public Sector &amp; Transportation; drop the separate PE bucket</td>
            <td>YCP Digital (Arfian)</td>
          </tr>
          <tr>
            <td>GFI / MSD Focus</td>
            <td>Regenerate the focus overlay from the standard, as an attribute rather than a separate list</td>
            <td>Global Practice</td>
          </tr>
        </tbody>
      </table>

      <div className="navbtns">
        <button className="btn ghost" onClick={() => onNavigate("s3")}>
          ← Back to my input
        </button>
        <span></span>
      </div>
    </section>
  );
}
