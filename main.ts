import { dirname, join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "My alarm went off this Monday, checked the calendar, and hit snooze on itself.";

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
