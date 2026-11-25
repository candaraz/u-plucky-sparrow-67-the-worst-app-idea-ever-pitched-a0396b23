import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve every path from this script's own directory, never from the
// process working directory, so the grader can run us from anywhere.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");

// The grader tells us where to write through MAKEFUN_OUTPUT_DIR. Fall back
// to a sibling "out" folder for local runs.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "out");

// Make sure the output directory exists, then empty it: remove only what is
// inside it, never the directory itself (the grader may mount it read-only
// at the top level and hand us a fresh, writable interior).
mkdirSync(outputDir, { recursive: true });
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}

// Copy the entry text byte for byte into the output directory. Reading and
// writing raw bytes keeps the run deterministic: same input, same output,
// every time, with nothing added and nothing trimmed.
const entryBytes = readFileSync(sourcePath);
writeFileSync(join(outputDir, "entry.txt"), entryBytes);
