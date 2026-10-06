import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Command,
  Copy,
  GitBranch as Github,
  Globe2,
  Link as Linkedin,
  Mail,
  Menu,
  Pause,
  Play,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { filters, profile, projects, type Project } from "./data/portfolio";
import repositories from "./data/repositories.json";
import Modal from "./components/Modal";
import Lab from "./components/Lab";

const Sculpture = lazy(() => import("./components/Sculpture"));
const nav = [
  ["Work", "work"],
  ["Playground", "lab"],
  ["About", "about"],
];
const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-35px" }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}

function ProjectArt({ project }: { project: Project }) {
  const id = project.id;
  return (
    <div className={`project-art art-${id}`} aria-hidden="true">
      <div className="art-topline">
        <span>
          {id === "baizebook"
            ? "B / B"
            : id === "shift"
              ? "↗ shift"
              : id === "sketchwars"
                ? "SketchWars"
                : id === "passport"
                  ? "Passport Pursuit"
                  : id === "copia"
                    ? "copia."
                    : "zk."}
        </span>
        <span>
          {id === "baizebook" || id === "shift"
            ? "iOS + watchOS"
            : "DESIGNED TO EXPLORE"}
        </span>
      </div>
      {id === "baizebook" || id === "shift" ? (
        <>
          <div className="art-copy">
            {id === "baizebook" ? (
              <>
                Made for
                <br />
                <em>the table.</em>
              </>
            ) : (
              <>
                Find your
                <br />
                <em>next gear.</em>
              </>
            )}
          </div>
          <div className="phones">
            <img
              loading="lazy"
              className="phone-one"
              src={image(
                id === "baizebook" ? "baizebook-home.png" : "shift-today.png",
              )}
              alt=""
            />
            <img
              loading="lazy"
              className="phone-two"
              src={image(
                id === "baizebook"
                  ? "baizebook-score.png"
                  : "shift-workout.png",
              )}
              alt=""
            />
          </div>
          <span className="art-bottom">
            {id === "baizebook"
              ? "EVERY FRAME. YOUR STORY."
              : "YOUR WORKOUT. YOUR WAY."}
          </span>
        </>
      ) : id === "portfolio" ? (
        <div className="portfolio-art-content">
          <span className="art-asterisk">✳</span>
          <h4>
            Code with
            <br />
            <em>character.</em>
          </h4>
          <span>THOUGHTFUL BY DESIGN.</span>
        </div>
      ) : (
        <>
          <div className="browser-mock">
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span>
                {id === "sketchwars"
                  ? "Good times, drawn together."
                  : id === "passport"
                    ? "Your next adventure starts here."
                    : "A little clarity goes a long way."}
              </span>
            </div>
            <img loading="lazy" src={image(`${id}.png`)} alt="" />
          </div>
          <span className="art-bottom">{project.tagline.toUpperCase()}</span>
        </>
      )}
      <span className="art-open">
        <ArrowUpRight size={24} />
      </span>
    </div>
  );
}

function ProjectDetail({
  project,
  close,
}: {
  project: Project;
  close: () => void;
}) {
  return (
    <Modal title={project.name} onClose={close} wide>
      <ProjectArt project={project} />
      <div className="project-detail">
        <p className="eyebrow">
          {project.category} <span> / {project.year}</span>
        </p>
        <h2>{project.name}</h2>
        <p className="detail-tagline">{project.tagline}</p>
        <div className="detail-meta">
          <div>
            <span>ROLE</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>STATUS</span>
            <p>{project.status}</p>
          </div>
        </div>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="detail-body">
          {project.details.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="detail-links">
          <a
            className="button dark"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} />
            View source
            <ArrowUpRight size={17} />
          </a>
          {project.url && (
            <a
              className="button outline"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {project.linkLabel || "Visit project"}
              <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}

function Archive({ close }: { close: () => void }) {
  const [search, setSearch] = useState("");
  const found = repositories.filter((repo) =>
    `${repo.name} ${repo.language} ${repo.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <Modal title="Project archive" onClose={close} wide>
      <div className="archive-content">
        <p className="eyebrow">THE WHOLE JOURNEY</p>
        <h2>
          The project archive<span className="lime-dot">.</span>
        </h2>
        <p>
          Experiments, early lessons, and things I’ve built along the way. All{" "}
          {repositories.length} public repositories, plus the collaborative
          projects in selected work.
        </p>
        <div className="search-field">
          <Search size={18} />
          <input
            autoFocus
            aria-label="Search repository archive"
            placeholder="Search by project or technology…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>{found.length}</span>
        </div>
        <div className="archive-list">
          {found.map((repo) => (
            <a href={repo.url} target="_blank" rel="noreferrer" key={repo.name}>
              <div>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
              </div>
              <span>{repo.language}</span>
              <ArrowUpRight size={18} />
            </a>
          ))}
          {!found.length && (
            <p className="empty-results">
              No projects match “{search}”. Try a language like Python or
              JavaScript.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

function CommandMenu({
  close,
  select,
}: {
  close: () => void;
  select: (project: Project) => void;
}) {
  const [query, setQuery] = useState("");
  const go = (id: string) => {
    close();
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    );
  };
  return (
    <Modal title="Quick navigation" onClose={close}>
      <div className="command-content">
        <p className="eyebrow">GO SOMEWHERE GOOD</p>
        <div className="search-field">
          <Search size={20} />
          <input
            autoFocus
            placeholder="Find a page or project…"
            aria-label="Search navigation"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="command-results">
          {[...nav, ["Get in touch", "contact"]]
            .filter(([name]) =>
              name.toLowerCase().includes(query.toLowerCase()),
            )
            .map(([name, id]) => (
              <button onClick={() => go(id)} key={id}>
                <span>{name}</span>
                <ArrowRight size={17} />
              </button>
            ))}
          {projects
            .filter((p) =>
              `${p.name} ${p.tags.join(" ")}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  close();
                  select(p);
                }}
              >
                <span>
                  {p.name}
                  <small>PROJECT</small>
                </span>
                <ArrowUpRight size={17} />
              </button>
            ))}
        </div>
        <p className="command-hint">
          Tab to navigate · Enter to open · Esc to close
        </p>
      </div>
    </Modal>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState(0);
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<Project | null>(null);
  const [archive, setArchive] = useState(false);
  const [command, setCommand] = useState(false);
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [time, setTime] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const motionOff = paused || !!reduceMotion;
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        }).format(new Date()),
      );
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motionOff ? "off" : "on";
  }, [motionOff]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!selected && !archive) setCommand((value) => !value);
      }
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [selected, archive]);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
    }
  };
  const visibleProjects = projects.filter(
    (project) => filter === "All work" || project.filters.includes(filter),
  );
  return (
    <MotionConfig reducedMotion={motionOff ? "always" : "user"}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Zuhayr Khan home">
          <span className="brand-mark">
            zk<span>.</span>
          </span>
          <span>
            Zuhayr Khan<span>DEVELOPER & CURIOUS HUMAN</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="command-trigger"
            aria-label="Open quick navigation"
            onClick={() => setCommand(true)}
          >
            <Command size={14} />
            <span>K</span>
          </button>
          <a className="header-contact" href="#contact">
            Let’s talk
            <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {[...nav, ["Contact", "contact"]].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <main id="main">
        <section className="hero" id="home">
          <div className="hero-top">
            <span className="status-label">
              <i /> FULL-STACK ENGINEER. FULL-TIME CURIOUS.
            </span>
            <span className="edition">PERSONAL PORTFOLIO / VOL. 02</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <motion.p
                className="hero-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Hey, I’m Zuhayr <span className="wave">↗</span>
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease }}
              >
                Serious code.
                <br />A little
                <br />
                <span className="serif">unexpected.</span>
                <span className="headline-dot">*</span>
              </motion.h1>
              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                I turn complex problems into things that feel simple.
                <br className="desktop-break" /> From the first pixel to the
                last API call —<br className="desktop-break" /> with a little AI
                in the mix.
              </motion.p>
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a className="button dark" href="#work">
                  Explore my work
                  <ArrowDown size={17} />
                </a>
                <a className="text-link" href="#about">
                  The human behind the code
                  <ArrowUpRight size={17} />
                </a>
              </motion.div>
            </div>
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease }}
            >
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit-cross cross-one">+</div>
              <div className="orbit-cross cross-two">+</div>
              <span className="visual-coordinate">
                FIG. 001 — CONNECTING THE DOTS
              </span>
              <Suspense fallback={<div className="sculpture-fallback">✳</div>}>
                <Sculpture mode={mode} paused={motionOff} />
              </Suspense>
              <div className="floating-tag tag-front">
                <span className="tag-symbol">&lt;/&gt;</span>Frontend
                <span className="tag-dot" />
              </div>
              <div className="floating-tag tag-back">
                <span className="tag-symbol">{`{ }`}</span>Backend
                <span className="tag-dot" />
              </div>
              <div className="floating-tag tag-ai">
                <Sparkles size={16} />A bit of AI
                <span className="tag-dot" />
              </div>
              <div className="visual-controls">
                <span>GO ON, MOVE YOUR CURSOR</span>
                <div>
                  {["Lime", "Lilac", "Peach"].map((label, i) => (
                    <button
                      key={label}
                      aria-label={`${label} sculpture`}
                      aria-pressed={mode === i}
                      onClick={() => setMode(i)}
                      className={`color-dot color-${i} ${mode === i ? "chosen" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          <div className="hero-footer">
            <div>
              <Globe2 size={15} />
              <span>BASED IN THE UK</span>
              <i />
              <span>{time} LOCAL TIME</span>
            </div>
            <span className="hero-note">
              Thoughtful by design. Playful by nature.
            </span>
            <a href="#work">
              SCROLL TO EXPLORE
              <ArrowDown size={14} />
            </a>
          </div>
        </section>
        <div className="tech-strip" aria-label="Specialties">
          <div>
            {[
              "Interfaces that feel right",
              "Systems that hold up",
              "AI with a purpose",
              "Details that make a difference",
            ].map((text) => (
              <span key={text}>
                <span className="strip-star">✳</span>
                {text}
              </span>
            ))}
          </div>
        </div>
        <section id="work" className="work-section section-space">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span>01 /</span> SELECTED WORK
                </p>
                <h2>
                  Built with intent.
                  <br />
                  And a bit of <span className="serif">obsession.</span>
                </h2>
              </div>
              <p>
                A few things I’ve poured my brain into.
                <br />
                Real problems. Considered solutions.
              </p>
            </div>
          </Reveal>
          <div className="work-toolbar">
            <div className="filters" aria-label="Filter projects">
              {filters.map((value) => (
                <button
                  className={value === filter ? "active" : ""}
                  aria-pressed={value === filter}
                  onClick={() => setFilter(value)}
                  key={value}
                >
                  {value}
                  {value === "All work" && (
                    <span>{projects.length.toString().padStart(2, "0")}</span>
                  )}
                </button>
              ))}
            </div>
            <span className="work-count">
              {visibleProjects.length.toString().padStart(2, "0")} PROJECTS /
              2023—2026
            </span>
          </div>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, i) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(i * 0.035, 0.15),
                  }}
                  key={project.id}
                  className="project-card"
                >
                  <button
                    className="project-open"
                    aria-label={`Explore ${project.name}`}
                    onClick={() => setSelected(project)}
                  >
                    <ProjectArt project={project} />
                    <div className="project-info">
                      <div className="project-meta">
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </div>
                      <div className="project-title">
                        <h3>{project.name}</h3>
                        <ArrowUpRight size={22} />
                      </div>
                      <p>{project.description}</p>
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="archive-prompt">
            <span>There’s a whole lot more where that came from.</span>
            <button className="text-link" onClick={() => setArchive(true)}>
              Open the project archive
              <span className="archive-number">{repositories.length}</span>
              <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
        <Lab onProject={setSelected} />
        <section id="about" className="about-section section-space">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span>03 /</span> THE HUMAN BIT
                </p>
                <h2>
                  Engineer by trade.
                  <br />
                  <span className="serif">Curious</span> by default.
                </h2>
              </div>
              <div className="about-stamp">
                <span>ALWAYS</span>
                <span>✳</span>
                <span>LEARNING</span>
              </div>
            </div>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-portrait">
              <img
                src={image("avatar.jpg")}
                alt="Zuhayr’s illustrated avatar waving hello"
                loading="lazy"
              />
              <div className="portrait-caption">
                <span>Hi again. That’s me.</span>
                <span>↗</span>
              </div>
              <span className="portrait-sticker">
                human,
                <br />
                not a bot.
              </span>
            </Reveal>
            <Reveal className="about-copy">
              <p className="about-lead">
                I like making things work.
                <br />I love making them <span>feel right.</span>
              </p>
              <p>
                I’m Zuhayr, a full-stack software engineer based in the UK,
                currently building at{" "}
                <a href={profile.companyUrl} target="_blank" rel="noreferrer">
                  Nudj <ArrowUpRight size={14} />
                </a>
                . My happy place sits somewhere between a well-designed
                interface, a neatly solved problem, and an idea I haven’t tried
                yet.
              </p>
              <p>
                My journey has taken me from Python and Java to React, native
                Apple apps, and on-device AI. Different tools, same curiosity:
                how can this be simpler, more useful, or a little more
                delightful?
              </p>
              <div className="about-facts">
                <div>
                  <span>THE APPROACH</span>
                  <p>Think deeply. Build thoughtfully.</p>
                </div>
                <div>
                  <span>THE FUEL</span>
                  <p>Curiosity & a good problem.</p>
                </div>
              </div>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                The longer story on LinkedIn
                <ArrowUpRight size={17} />
              </a>
            </Reveal>
          </div>
          <div className="capabilities">
            {[
              {
                number: "01",
                title: "The experience",
                icon: Code2,
                copy: "Interfaces that are as thoughtful as they are functional.",
                stack: "React · TypeScript · SwiftUI · CSS",
              },
              {
                number: "02",
                title: "The engine",
                icon: Command,
                copy: "The logic, data, and connections that make it all work.",
                stack: "Python · Node.js · Java · SQL",
              },
              {
                number: "03",
                title: "The possibility",
                icon: Sparkles,
                copy: "Useful intelligence. Thoughtfully woven into real products.",
                stack: "Foundation Models · On-device AI",
              },
            ].map((item) => (
              <Reveal className="capability" key={item.number}>
                <div>
                  <span>{item.number} /</span>
                  <item.icon size={21} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <span className="capability-stack">{item.stack}</span>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section section-space">
          <div className="contact-top">
            <p className="eyebrow">
              <span>04 /</span> LET’S MAKE SOMETHING MATTER
            </p>
            <span>GOOD THINGS START WITH A CONVERSATION</span>
          </div>
          <Reveal>
            <h2>
              Have a good
              <br />
              <span className="serif">feeling</span> about this?
              <a
                className="contact-arrow"
                href={`mailto:${profile.email}`}
                aria-label="Email Zuhayr"
              >
                <ArrowUpRight />
              </a>
            </h2>
            <div className="contact-bottom">
              <p>
                A project, an opportunity, or a wonderfully weird idea.
                <br />
                I’d love to hear what you’re thinking.
              </p>
              <div className="email-group">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button
                  className="icon-button"
                  aria-label="Copy email address"
                  onClick={copyEmail}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <span className="copy-feedback" role="status">
                  {copied
                    ? "Copied!"
                    : copyFailed
                      ? "Select the email to copy it."
                      : ""}
                </span>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <a className="footer-logo" href="#home">
            zk<span>.</span>
          </a>
          <span>
            © {new Date().getFullYear()} Zuhayr Khan
            <br />
            Made with intention. And a few late nights.
          </span>
        </div>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={15} />
            GitHub
            <ArrowUpRight size={13} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={15} />
            LinkedIn
            <ArrowUpRight size={13} />
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={15} />
            Email
            <ArrowUpRight size={13} />
          </a>
        </div>
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-pressed={motionOff}
          aria-label={
            motionOff
              ? "Enable motion (system preferences still apply)"
              : "Pause motion"
          }
        >
          {motionOff ? <Play size={13} /> : <Pause size={13} />}MOTION{" "}
          {motionOff ? "OFF" : "ON"}
        </button>
      </footer>
      {selected && (
        <ProjectDetail project={selected} close={() => setSelected(null)} />
      )}
      {archive && <Archive close={() => setArchive(false)} />}
      {command && (
        <CommandMenu close={() => setCommand(false)} select={setSelected} />
      )}
    </MotionConfig>
  );
}
