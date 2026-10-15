// Brings orbit-launch/ to the end state of a given video.
// Usage (from the starter-project folder):  node solutions/catch-up.mjs 03_01
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const target = process.argv[2];
const steps = readdirSync(here).filter((d) => /^\d\d_\d\d$/.test(d) && statSync(join(here, d)).isDirectory()).sort();

if (!target || !/^\d\d_\d\d$/.test(target)) {
  console.log("Usage: node solutions/catch-up.mjs <video>   e.g. 03_01");
  console.log(`Available end states: ${steps.join(", ")}`);
  process.exit(1);
}

const apply = steps.filter((s) => s <= target);
if (apply.length === 0) {
  console.log(`Nothing to apply before ${target}. The starting workspace is already correct.`);
  process.exit(0);
}
const workspace = join(here, "..", "orbit-launch");
for (const step of apply) {
  const dir = join(here, step);
  // _remove.txt lists paths (relative to orbit-launch/) that this step deletes or moves away.
  const removeList = join(dir, "_remove.txt");
  if (existsSync(removeList)) {
    for (const line of readFileSync(removeList, "utf8").split(/\r?\n/)) {
      const rel = line.trim();
      if (rel && !rel.startsWith("#")) rmSync(join(workspace, rel), { recursive: true, force: true });
    }
  }
  cpSync(dir, workspace, { recursive: true, filter: (src) => !src.endsWith("_remove.txt") });
  console.log(`Applied ${step}`);
}
console.log(`orbit-launch/ now matches the end of video ${target}.`);
