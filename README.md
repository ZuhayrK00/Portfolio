# Zuhayr Khan — Portfolio

A personal portfolio built with React, TypeScript, Vite, Three.js, and Motion. Warm editorial design, a live WebGL sculpture, six project stories, a searchable public repository archive, and interactive engineering experiments.

## Run locally

Requires Node.js 22.12+ (Node 22.22.1 was used for this build).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173`. Changes update immediately.

```sh
npm run build     # TypeScript checks + production build
npm run preview   # Serve the production output locally
```

## Make it yours

- **Name, email, GitHub, LinkedIn, employer and featured project stories:** `src/data/portfolio.ts`.
- **Main page copy and composition:** `src/App.tsx`.
- **Colours, typography, layouts and responsive breakpoints:** `src/styles.css`.
- **3D sculpture:** `src/components/Sculpture.tsx`.
- **Engineering playground:** `src/components/Lab.tsx`.
- **Project artwork and avatar:** `public/images/`.
- **Page title and search/social description:** `index.html`.

The project copy uses public GitHub descriptions and the previous portfolio as its sources. The professional experience, impact figures, skills, education, location, and LinkedIn link were updated from the CV supplied by Zuhayr on 6 October 2026. The portrait was supplied for use on the site. The original CV and phone number are not bundled in the public site. Treat the first-person editorial copy as a draft for review. Project roles do not claim particular contributions to group projects. BaizeBook's review status and Shift's development status reflect repository documentation read on 6 October 2026; update these as releases change.

The repository archive is a committed snapshot. Refresh it with an authenticated GitHub CLI:

```sh
npm run sync:projects
```

Only public, non-fork repositories are saved. Private repository data and credentials are never included. The original collaborative projects are also featured separately.

## Interactions

- New visitors start in dark mode. The header's sun/moon button switches themes and remembers the choice locally. The theme is applied before the first paint; storage restrictions do not break the control.
- Move the pointer over the sculpture; change its colour using the three dots.
- Filter projects, open their case studies, and follow real source links.
- Search all public repositories in the project archive.
- Open quick navigation with **⌘K / Ctrl+K**. Use Tab/Enter to choose and Escape to close.
- In the playground, adjust the card's colour/radius, follow a simulated backend request, or search project notes.
- Use the footer's motion control to pause decorative animation. Operating-system reduced-motion preferences are respected automatically.

The Systems experiment is a **browser simulation**, and Intelligence is **local keyword search**, not an LLM. Neither sends data off-device. Shift is the featured project containing actual on-device AI. Contact uses email links and copy-to-clipboard; there is no message-storage service or fake form submission.

## Deployment after review

The redesign is on `redesign/creative-engineering`; the existing site's branch and history are preserved. Local review comes before publication.

The production build is static in `dist/`, with relative asset paths, and works on GitHub Pages or Vercel. A manual GitHub Pages workflow is included. After merging the approved redesign, select **GitHub Actions** as the repository's Pages source, then run **Deploy portfolio to GitHub Pages** from Actions. The workflow itself does not run on push.

For Vercel, use the Vite preset, `npm run build`, and output directory `dist`.

No API keys, environment variables, third-party trackers, or remote font requests are required. The fonts are bundled locally. Screenshots are from the project's public repositories and the original portfolio; update them alongside project releases.
