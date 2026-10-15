// Tiny JSON "database" for the simulated Orbit Labs systems.
// Every call reads from disk, so edits to data/*.json show up immediately.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const SEED_DIR = join(here, "seed");
export const DATA_DIR = join(here, "data");

export function resetData() {
  mkdirSync(DATA_DIR, { recursive: true });
  for (const file of readdirSync(SEED_DIR)) {
    copyFileSync(join(SEED_DIR, file), join(DATA_DIR, file));
  }
}

function ensureData() {
  if (!existsSync(join(DATA_DIR, "project.json"))) resetData();
}

export function read(name) {
  ensureData();
  return JSON.parse(readFileSync(join(DATA_DIR, `${name}.json`), "utf8"));
}

export function write(name, value) {
  ensureData();
  writeFileSync(join(DATA_DIR, `${name}.json`), JSON.stringify(value, null, 2) + "\n");
}

// Days between two YYYY-MM-DD dates.
export function daysBetween(from, to) {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}

// Tickets with a computed daysOpen, measured against the project's review date
// (not today's date) so the course dataset behaves the same for every learner.
export function ticketsWithAge() {
  const { reviewDate } = read("project");
  return read("tickets").map((t) => ({
    ...t,
    daysOpen: t.status === "closed" ? null : daysBetween(t.opened, reviewDate),
  }));
}
