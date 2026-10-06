import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Send,
  Sparkles,
  Terminal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project } from "../data/portfolio";

const tabs = [
  { label: "Interface", icon: Code2 },
  { label: "Systems", icon: Database },
  { label: "Intelligence", icon: Sparkles },
];

export default function Lab({
  onProject,
}: {
  onProject: (project: Project) => void;
}) {
  const [tab, setTab] = useState(0);
  const [radius, setRadius] = useState(20);
  const [color, setColor] = useState("#d1f268");
  const [stage, setStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [matches, setMatches] = useState<Project[]>([]);
  const runId = useRef(0);
  const run = async () => {
    if (running) return;
    const id = ++runId.current;
    setRunning(true);
    setStage(0);
    for (let i = 1; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (id !== runId.current) return;
      setStage(i);
    }
    setRunning(false);
  };
  const ask = (question: string) => {
    const terms = question
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      .filter(
        (word) =>
          word.length > 1 &&
          ![
            "the",
            "with",
            "show",
            "what",
            "does",
            "your",
            "have",
            "tell",
            "about",
            "projects",
            "work",
            "built",
            "that",
            "some",
            "using",
            "you",
          ].includes(word),
      );
    const ranked = projects
      .map((project) => {
        const text =
          `${project.name} ${project.description} ${project.tags.join(" ")} ${project.details.join(" ")} ${project.filters.join(" ")}`.toLowerCase();
        const words = text.replace(/[^a-z0-9 ]/g, " ").split(/\s+/);
        const score = terms.filter((term) =>
          term.length <= 3
            ? words.includes(term)
            : words.some((word) => word.startsWith(term)),
        ).length;
        return {
          project,
          score:
            score +
            (score > 0 &&
            project.filters.some((filter) =>
              terms.includes(filter.toLowerCase()),
            )
              ? 2
              : 0),
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
    setMatches(ranked.map((item) => item.project));
    setInput(question);
    setAnswer(
      ranked.length
        ? `Here’s what I found in Zuhayr’s work. ${ranked[0].project.description}`
        : "Try asking about AI, SwiftUI, realtime games, React, or Python. I search the project notes on this site, so I only know what’s in them.",
    );
  };
  return (
    <section id="lab" className="lab-section section-space">
      <div className="section-heading light">
        <div>
          <p className="eyebrow">
            <span>02 /</span> THE PLAYGROUND
          </p>
          <h2>
            A little less tell.
            <br />A little more <span className="serif">try.</span>
          </h2>
        </div>
        <p>
          Good engineering should feel good, too.
          <br />
          Pull a few levers. See what happens.
        </p>
      </div>
      <div className="lab-shell">
        <div className="lab-sidebar">
          <div className="lab-window-label">
            <span />
            <span />
            <span />
            <p>ideas.playground</p>
          </div>
          <div
            role="tablist"
            aria-label="Engineering experiments"
            className="lab-tabs"
          >
            {tabs.map((item, i) => (
              <button
                role="tab"
                id={`lab-tab-${i}`}
                aria-controls={`lab-panel-${i}`}
                aria-selected={tab === i}
                tabIndex={tab === i ? 0 : -1}
                key={item.label}
                className={tab === i ? "active" : ""}
                onClick={() => setTab(i)}
                onKeyDown={(e) => {
                  const keys = [
                    "ArrowRight",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowUp",
                    "Home",
                    "End",
                  ];
                  if (!keys.includes(e.key)) return;
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : (i +
                            (e.key === "ArrowRight" || e.key === "ArrowDown"
                              ? 1
                              : 2)) %
                          3;
                  setTab(next);
                  document.getElementById(`lab-tab-${next}`)?.focus();
                }}
              >
                <item.icon size={18} />
                {item.label}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <p className="lab-aside-copy">
            Small experiments.
            <br />
            Real curiosity.
            <br />
            <span>Made to be played with.</span>
          </p>
          <div className="lab-status">
            <i /> RUNNING IN YOUR BROWSER
          </div>
        </div>
        <div
          className="lab-stage"
          role="tabpanel"
          id={`lab-panel-${tab}`}
          aria-labelledby={`lab-tab-${tab}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 0 && (
                <div className="interface-demo">
                  <div className="demo-controls">
                    <span className="mono-label">01 — MAKE IT YOURS</span>
                    <h3>
                      Small details.
                      <br />
                      Big difference.
                    </h3>
                    <p>
                      A tiny design system.
                      <br />
                      You’re the art director.
                    </p>
                    <label>Accent colour</label>
                    <div className="swatches">
                      {["#d1f268", "#bdb5ff", "#f3a47c", "#a9d8e3"].map(
                        (value) => (
                          <button
                            key={value}
                            aria-label={`Use ${value} accent`}
                            aria-pressed={color === value}
                            onClick={() => setColor(value)}
                            style={{ background: value }}
                          >
                            {color === value && <Check size={16} />}
                          </button>
                        ),
                      )}
                    </div>
                    <label htmlFor="radius">
                      Corner radius <span>{radius}px</span>
                    </label>
                    <input
                      id="radius"
                      type="range"
                      min="0"
                      max="40"
                      value={radius}
                      onChange={(e) => setRadius(Number(e.target.value))}
                    />
                  </div>
                  <div
                    className="demo-preview"
                    style={{ borderRadius: radius }}
                  >
                    <div
                      className="preview-art"
                      style={{
                        background: color,
                        borderRadius: Math.max(radius - 8, 0),
                      }}
                    >
                      <span>✳</span>
                      <span className="preview-art-label">
                        a little
                        <br />
                        unexpected.
                      </span>
                      <ArrowUpRight size={28} />
                    </div>
                    <div className="preview-card-bottom">
                      <div>
                        <span>BUILT WITH INTENTION</span>
                        <h4>Your next good idea.</h4>
                      </div>
                      <div
                        className="preview-arrow"
                        style={{ background: color }}
                      >
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tab === 1 && (
                <div className="systems-demo">
                  <span className="mono-label">02 — UNDER THE SURFACE</span>
                  <h3>Follow the request.</h3>
                  <p>
                    A visual simulation of a request moving through a backend.
                  </p>
                  <div className="pipeline">
                    {["Client", "Validate", "Database", "Response"].map(
                      (label, i) => (
                        <div
                          className={stage >= i ? "complete" : ""}
                          key={label}
                        >
                          <span>
                            {stage > i ? (
                              <Check size={20} />
                            ) : i === 2 ? (
                              <Database size={20} />
                            ) : (
                              <Terminal size={20} />
                            )}
                          </span>
                          <p>{label}</p>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="terminal-output" aria-live="polite">
                    <span>
                      {stage < 0
                        ? "> Ready when you are."
                        : stage === 0
                          ? "> GET /api/projects → received"
                          : stage === 1
                            ? "> Schema valid · request accepted"
                            : stage === 2
                              ? "> Reading project records…"
                              : stage === 3
                                ? "> Serialising response…"
                                : "> 200 OK · 6 projects returned · simulation complete"}
                    </span>
                  </div>
                  <button
                    className="button lime small"
                    disabled={running}
                    onClick={run}
                  >
                    {running
                      ? "Request in flight…"
                      : stage === 4
                        ? "Run it again"
                        : "Send a request"}
                    <ArrowUpRight size={17} />
                  </button>
                  <span className="demo-note">
                    Interactive architecture demo · no external server
                  </span>
                </div>
              )}
              {tab === 2 && (
                <div className="ai-demo">
                  <span className="mono-label">
                    03 — A CURIOUS LITTLE ASSISTANT
                  </span>
                  <h3>Meet the work. Ask a question.</h3>
                  <p>
                    A local portfolio search demo. For real on-device AI,
                    explore{" "}
                    <button
                      className="inline-link"
                      onClick={() => onProject(projects[1])}
                    >
                      Shift ↗
                    </button>
                    .
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (input.trim()) ask(input);
                    }}
                  >
                    <label className="sr-only" htmlFor="question">
                      Ask about projects
                    </label>
                    <input
                      id="question"
                      value={input}
                      maxLength={200}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="What have you built with AI?"
                    />
                    <button
                      aria-label="Search projects"
                      disabled={!input.trim()}
                    >
                      <Send size={18} />
                    </button>
                  </form>
                  <div className="prompt-chips">
                    {["AI projects", "Realtime games", "Python backend"].map(
                      (q) => (
                        <button key={q} onClick={() => ask(q)}>
                          {q}
                          <ArrowUpRight size={12} />
                        </button>
                      ),
                    )}
                  </div>
                  <div className="ai-answer" aria-live="polite">
                    {answer ? (
                      <>
                        <p>{answer}</p>
                        <div>
                          {matches.map((p) => (
                            <button key={p.id} onClick={() => onProject(p)}>
                              {p.name}
                              <ArrowUpRight size={16} />
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="ai-empty">
                        <Sparkles size={22} />
                        <span>A good question is a good place to start.</span>
                      </div>
                    )}
                  </div>
                  <span className="demo-note">
                    Local keyword search · no LLM connected · nothing leaves
                    your browser
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
