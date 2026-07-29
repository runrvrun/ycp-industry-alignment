"use client";

import { useState } from "react";
import { REVIEW_ITEM_IDS } from "@/app/lib/taxonomy-data";
import { AnswersMap, ReviewerInfo, ScreenId, VerdictKey } from "@/app/lib/types";
import ComparisonMatrix from "@/app/components/ComparisonMatrix";
import ProcessOverview from "@/app/components/ProcessOverview";
import ProposedStandardForm from "@/app/components/ProposedStandardForm";
import NextSteps from "@/app/components/NextSteps";

const STEPS: { id: ScreenId; label: string }[] = [
  { id: "s1", label: "The problem" },
  { id: "s2", label: "How we align" },
  { id: "s3", label: "Proposed standard & your input" },
  { id: "s4", label: "What happens next" },
];

function emptyAnswers(): AnswersMap {
  return Object.fromEntries(REVIEW_ITEM_IDS.map((id) => [id, { verdict: null, comment: "" }]));
}

function buildPayload(reviewer: ReviewerInfo, answers: AnswersMap) {
  return {
    tool: "One YCP Industry Practice Alignment",
    version: "1",
    reviewer: {
      name: reviewer.name.trim(),
      office: reviewer.office.trim(),
      submittedAt: new Date().toISOString(),
    },
    responses: answers,
  };
}

function downloadJSON(payload: ReturnType<typeof buildPayload>) {
  const safe = (payload.reviewer.name || "anonymous").replace(/[^\w-]+/g, "_");
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `YCP_taxonomy_response_${safe}_${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 0);
}

export default function SurveyWizard() {
  const [screen, setScreen] = useState<ScreenId>("s1");
  const [reviewer, setReviewer] = useState<ReviewerInfo>({ name: "", office: "" });
  const [answers, setAnswers] = useState<AnswersMap>(emptyAnswers);
  const [showNameError, setShowNameError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  function go(id: ScreenId) {
    setScreen(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReviewerChange(field: keyof ReviewerInfo, value: string) {
    setReviewer((r) => ({ ...r, [field]: value }));
  }

  function handleVerdictChange(itemId: string, verdict: VerdictKey) {
    setAnswers((a) => ({ ...a, [itemId]: { ...a[itemId], verdict } }));
  }

  function handleCommentChange(itemId: string, comment: string) {
    setAnswers((a) => ({ ...a, [itemId]: { ...a[itemId], comment } }));
  }

  function requireName(): boolean {
    const ok = reviewer.name.trim().length > 0;
    setShowNameError(!ok);
    if (!ok) go("s3");
    return ok;
  }

  function handleDownload() {
    if (!requireName()) return;
    downloadJSON(buildPayload(reviewer, answers));
  }

  async function handleSubmit() {
    if (!requireName()) return;
    const payload = buildPayload(reviewer, answers);
    let ok = false;
    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    setConfirmText(
      ok
        ? `Thank you, ${payload.reviewer.name.split(" ")[0] || ""}. Your comments have been captured and will be included in consolidation ahead of the 18–19 August DMC/GMC.`
        : `We couldn't reach the server, so your response was saved locally as a JSON file instead — please send it to the MSD Global Practice lead.`
    );
    if (!ok) downloadJSON(payload);
    setSubmitted(true);
    go("s4");
  }

  return (
    <>
      <header className="top">
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="YCP" />
          <div className="divider"></div>
          <div className="htext">
            <span className="k">MSD Global Practice</span>
            <span className="t">One YCP — Industry Practice Alignment</span>
          </div>
          <div className="status">
            For MP review · target ratification
            <br />
            <b>DMC 18 Aug &amp; GMC 19 Aug 2026</b>
          </div>
        </div>
      </header>

      <nav className="steps" role="tablist" aria-label="Steps">
        <div className="wrap">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              className="stepbtn"
              role="tab"
              aria-selected={screen === s.id}
              onClick={() => go(s.id)}
            >
              <span className="n">{i + 1}</span>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <main>
        <div className="wrap">
          <ComparisonMatrix active={screen === "s1"} onNavigate={go} />
          <ProcessOverview active={screen === "s2"} onNavigate={go} />
          <ProposedStandardForm
            active={screen === "s3"}
            reviewer={reviewer}
            onReviewerChange={handleReviewerChange}
            answers={answers}
            onVerdictChange={handleVerdictChange}
            onCommentChange={handleCommentChange}
            showNameError={showNameError}
            onSubmit={handleSubmit}
            onDownload={handleDownload}
          />
          <NextSteps active={screen === "s4"} onNavigate={go} submitted={submitted} confirmText={confirmText} />
        </div>
      </main>

      <footer className="foot">
        <div className="wrap">
          <span>YCP Holdings — MSD Global Practice · Internal working document for MP syndication</span>
          <span>One YCP Industry Practice Alignment · v1</span>
        </div>
      </footer>
    </>
  );
}
