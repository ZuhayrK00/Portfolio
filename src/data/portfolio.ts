export const profile = {
  name: "Zuhayr Khan",
  email: "zuhayrk00@gmail.com",
  github: "https://github.com/ZuhayrK00",
  linkedin: "https://www.linkedin.com/in/zuhayr-k",
  x: "https://x.com/zuhayr_dev",
  location: "Glasgow, UK",
  company: "Nudj",
  companyUrl: "https://nudj.cx/",
};

// Professional experience supplied in Zuhayr's CV, October 2026.
export const experience = [
  {
    company: "Nudj",
    role: "Full-Stack Software Engineer",
    period: "May 2024 — Present",
    current: true,
    summary:
      "Building across the whole stack at a B2B startup — from data models and APIs to admin tooling and the consumer experience.",
    highlights: [
      {
        title: "AI-native engineering",
        detail:
          "Shaped the team’s coding-agent workflow, authored custom skills and guidance, and built a 17-agent automated PR review system around senior-reviewer standards.",
      },
      {
        title: "A framework, from the ground up",
        detail:
          "Solo-built a white-label campaign framework in around three months: four pluggable engines, dual authentication, internationalisation, and asynchronous reward distribution.",
      },
      {
        title: "Products that connect",
        detail:
          "Delivered Shopify app features, storefront widgets, merchant configuration, incentive automation, and public APIs across React, Remix, and server-side event tracking.",
      },
      {
        title: "Strong foundations",
        detail:
          "Hardened multi-tenant access controls, session handling, and draft-resource access, and resolved race conditions in the API caching layer.",
      },
    ],
    tags: ["Next.js", "tRPC", "MongoDB", "TypeScript", "Claude Code"],
  },
  {
    company: "Cub3",
    role: "Junior Front-End Engineer",
    period: "Oct 2023 — May 2024",
    current: false,
    summary:
      "Started at the interface. Built responsive product experiences before Cub3 was acquired by Nudj.",
    highlights: [
      {
        title: "Design into production",
        detail:
          "Turned Figma designs into responsive React, Next.js, and Tailwind interfaces, with cross-browser and mobile compatibility.",
      },
      {
        title: "Components built to last",
        detail:
          "Created reusable cards, modals, carousels, and navigation that carried forward into the post-acquisition codebase.",
      },
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "Component systems"],
  },
];

export const education = [
  {
    name: "Professional Software Development",
    institution: "CodeClan",
    date: "Jun 2023",
  },
  {
    name: "Computer Science",
    institution: "University of Strathclyde",
    date: "Sep 2019",
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  filters: string[];
  year: string;
  tagline: string;
  description: string;
  tags: string[];
  github: string;
  url?: string;
  linkLabel?: string;
  status: string;
  role: string;
  details: string[];
};

export const projects: Project[] = [
  {
    id: "baizebook",
    name: "BaizeBook",
    category: "NATIVE APP",
    filters: ["Mobile"],
    year: "2026",
    tagline: "Every frame. Your story.",
    description:
      "A snooker companion built for the table. Thoughtful scoring, meaningful statistics, and a little magic on your wrist.",
    tags: ["SwiftUI", "SwiftData", "watchOS"],
    github: "https://github.com/ZuhayrK00/baizebook",
    url: "https://apps.apple.com/gb/app/baizebook/id6819089436",
    linkLabel: "View on App Store",
    status: "Available on the App Store",
    role: "Independent project",
    details: [
      "An offline, native snooker app for iPhone, iPad, and Apple Watch. Player profiles, frames, matches, and statistics stay on the device.",
      "The scoring engine models pots, fouls, free balls, undo, and redo. Watch commands carry revision checks so a delayed tap cannot score twice.",
      "Built with SwiftUI and SwiftData, with validated JSON imports and backups. Available now on the App Store.",
    ],
  },
  {
    id: "shift",
    name: "Shift",
    category: "NATIVE APP · AI",
    filters: ["Mobile", "AI"],
    year: "2026",
    tagline: "A stronger kind of personal.",
    description:
      "An offline-first workout companion, with on-device AI that turns your goals into a plan. Made to move with you.",
    tags: ["SwiftUI", "Foundation Models", "Supabase"],
    github: "https://github.com/ZuhayrK00/Shift",
    url: "https://apps.apple.com/gb/app/shift-gym-tracker/id6761838910",
    linkLabel: "View on App Store",
    status: "Available on the App Store",
    role: "Independent project",
    details: [
      "A workout tracker for iPhone, iPad, and Apple Watch. Log sets, build plans, track progress, and bring health data into one native experience.",
      "Apple Foundation Models generate personalised workout plans on-device on supported iOS 26+ hardware. A guided flow collects goals, experience, equipment, and preferences.",
      "A local GRDB / SQLite database is the source of truth. A mutation queue syncs changes to Supabase when connectivity returns. Available now on the App Store.",
    ],
  },
  {
    id: "sketchwars",
    name: "SketchWars",
    category: "REALTIME WEB APP",
    filters: ["Web"],
    year: "2023",
    tagline: "Big ideas. Questionable drawings.",
    description:
      "A multiplayer drawing game that turns two screens and a room full of people into a very good time.",
    tags: ["React", "Socket.io", "Fabric.js"],
    github: "https://github.com/ravaldo/sketchwars",
    status: "Group project",
    role: "Team collaboration",
    details: [
      "A family-friendly party game where two teams compete through drawing. A shared TV and a tablet create a connected, two-screen experience.",
      "React powers the interface, Fabric.js provides the drawing canvas, and Socket.io coordinates realtime events between devices.",
      "Built collaboratively as part of my software development journey. The repository contains the original project and setup instructions.",
    ],
  },
  {
    id: "portfolio",
    name: "This little corner",
    category: "CREATIVE DEVELOPMENT",
    filters: ["Web"],
    year: "2026",
    tagline: "The web can have a personality.",
    description:
      "A living playground for thoughtful interactions, real-time 3D, and code that feels a little more human.",
    tags: ["React", "Three.js", "Motion"],
    github: "https://github.com/ZuhayrK00/Portfolio",
    status: "You’re here",
    role: "Personal portfolio",
    details: [
      "This portfolio combines an interactive WebGL sculpture with a curated project collection and a small browser-based engineering lab.",
      "React and TypeScript structure the experience. Three.js renders the sculpture, and Motion adds transitions that respect reduced-motion preferences.",
      "Project content lives in a single data file. Public GitHub repositories can be refreshed with the included sync script. The portfolio assistant is a local, deterministic demo, not a connected language model.",
    ],
  },
];

export const filters = ["All work", "Web", "Mobile", "AI"];
