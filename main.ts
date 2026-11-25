import { dirname, join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

function buildEntryLine(): string {
  return "My alarm went off this Monday, checked the calendar, and hit snooze on itself.";
}

const ENTRY = buildEntryLine();

// Kit gate (RULES.txt): entry must be UTF-8 text of 1–200 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error("entry fails the 1–200 character gate");
}

function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) {
    return join(process.env.MAKEFUN_OUTPUT_DIR, "entry.txt");
  }
  if (process.env.OUTPUT_PATH) {
    return process.env.OUTPUT_PATH;
  }
  if (process.env.MAKEFUN_BOT_DIR) {
    return "/output/entry.txt";
  }
  return join("output", "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
