import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

// Keep the owner's curation and current release copy when refreshing GitHub data.
const excluded = new Set(["soloproject", "shares_project"]);
const descriptionOverrides = {
  Shift:
    "Shift — an offline-first workout tracker for iOS and Apple Watch. Log workouts, build plans, track progress, and generate on-device AI programs. Available on the App Store.",
  baizebook:
    "BaizeBook — native snooker scoring for iPhone, iPad and Apple Watch. Local data, no accounts, no backend. Available on the App Store.",
};
// Only public repositories are ever included in the portfolio.
const repos = JSON.parse(
  execFileSync(
    "gh",
    [
      "repo",
      "list",
      "ZuhayrK00",
      "--limit",
      "200",
      "--json",
      "name,description,url,isPrivate,isFork,primaryLanguage",
    ],
    { encoding: "utf8" },
  ),
);
const publicRepos = repos
  .filter(
    (repo) =>
      !repo.isPrivate && !repo.isFork && !excluded.has(repo.name.toLowerCase()),
  )
  .map((repo) => ({
    name: repo.name,
    description:
      descriptionOverrides[repo.name] ||
      repo.description ||
      "A project from my development journey.",
    url: repo.url,
    language: repo.primaryLanguage?.name || "Experiment",
  }));
mkdirSync("src/data", { recursive: true });
writeFileSync(
  "src/data/repositories.json",
  JSON.stringify(publicRepos, null, 2) + "\n",
);
console.log(`Saved ${publicRepos.length} public repositories.`);
