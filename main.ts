import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// One-line safety warning label for every human being.
// Universal flaw: procrastination — delaying a trivial task for weeks,
// then doing it in minutes and feeling clever about it. The turn lands
// in the last few words ("call it efficiency"), so the laugh arrives
// only once the whole line has been read.
const LABEL =
  "WARNING: This human will delay a five-minute task for three weeks, then do it in four minutes and call it efficiency.";

const MAX_LENGTH = 160;

function main(): void {
  const lines = LABEL.split("\n");
  if (lines.length !== 1) {
    throw new Error(`Label must be exactly one line, got ${lines.length}`);
  }
  if (LABEL.length < 1 || LABEL.length > MAX_LENGTH) {
    throw new Error(
      `Label must be 1-${MAX_LENGTH} characters, got ${LABEL.length}`,
    );
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR
    ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
    : "/output";
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, LABEL + "\n", "utf8");

  // Verify what was actually written: one line, same text, in range.
  const written = readFileSync(outputPath, "utf8");
  if (written !== LABEL + "\n") {
    throw new Error("Written output does not match the label");
  }
  console.log(`Wrote ${LABEL.length}-character label to ${outputPath}`);
}

main();
