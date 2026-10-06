export const profile = {
  name: "Zuhayr Khan",
  email: "zuhayrk00@gmail.com",
  github: "https://github.com/ZuhayrK00",
  linkedin: "https://www.linkedin.com/in/zuhayr-khan-51136a285",
  location: "United Kingdom",
  company: "Nudj",
  companyUrl: "https://nudj.cx/",
};

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
    url: "https://zuhayrk00.github.io/baizebook/",
    linkLabel: "Project website",
    status: "App Store review pending",
    role: "Independent project",
    details: [
      "An offline, native snooker app for iPhone, iPad, and Apple Watch. Player profiles, frames, matches, and statistics stay on the device.",
      "The scoring engine models pots, fouls, free balls, undo, and redo. Watch commands carry revision checks so a delayed tap cannot score twice.",
      "Built with SwiftUI and SwiftData, with validated JSON imports and backups. The latest documented release was submitted for App Store review on 5 October 2026.",
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
    status: "In development",
    role: "Independent project",
    details: [
      "A workout tracker for iPhone, iPad, and Apple Watch. Log sets, build plans, track progress, and bring health data into one native experience.",
      "Apple Foundation Models generate personalised workout plans on-device on supported iOS 26+ hardware. A guided flow collects goals, experience, equipment, and preferences.",
      "A local GRDB / SQLite database is the source of truth. A mutation queue syncs changes to Supabase when connectivity returns. This project is actively in development.",
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
    id: "passport",
    name: "Passport Pursuit",
    category: "FULL-STACK WEB APP",
    filters: ["Web"],
    year: "2023",
    tagline: "Make room for somewhere new.",
    description:
      "A travel bucket list that takes the places in your head and puts your next adventure on the map.",
    tags: ["Python", "Flask", "SQL"],
    github: "https://github.com/ZuhayrK00/SoloProject",
    status: "Independent project",
    role: "Full-stack development",
    details: [
      "A travel bucket list for countries and cities you have visited or want to explore. Create, edit, and delete destinations while keeping track of your travel goals.",
      "The Python / Flask backend connects HTML and CSS screens to a SQL database, with relational models for destinations.",
      "One of my early end-to-end builds: from data modelling and server routes to the finished user interface.",
    ],
  },
  {
    id: "copia",
    name: "Copia",
    category: "FULL-STACK WEB APP",
    filters: ["Web"],
    year: "2023",
    tagline: "A clearer view of the market.",
    description:
      "A stock portfolio concept that brings market data, simulated holdings, and visual insights together.",
    tags: ["React", "Node.js", "Market APIs"],
    github: "https://github.com/Synonymous-Bosch/shares_project",
    status: "Group project",
    role: "Team collaboration",
    details: [
      "A collaborative stock portfolio application exploring market data and simulated share holdings.",
      "Built with React and Node.js, with an external market data API and charts to visualise a user’s portfolio.",
      "The project focused on connecting an interactive frontend to backend services and presenting complex data in a useful way.",
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
