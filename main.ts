// PetTranslator — The Worst App Idea Ever Pitched.
// Writes one sentence (134 characters) pitching the worst app idea
// imaginable to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22, stdlib only, zero network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "PetTranslator translates your dog's bark into English, but only into the phrase 'I am a dog' delivered in 40 different tones of voice.";

// The gate requires UTF-8 text of 1 to 240 characters, not only whitespace,
// and the competition asks for exactly one sentence.
if (ENTRY.length < 1 || ENTRY.length > 240) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-240 gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read back and confirm the file holds exactly the entry, no trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the entry byte for byte");
}
console.log(`wrote ${outPath}`);
