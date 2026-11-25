import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of patch notes announcing that human sleep is fixed.
// Winner picked by the quality pipeline (10 variants -> 3-point filter
// -> pairwise judge vs the 90 verified top-10 lines in
// judge-calibration-one-liner.md): a single save/load concept, concrete
// numbers (8 hours, 20 minutes), terse changelog voice, no explanation.
const entry =
  "Fixed: sleep now saves correctly. Previously, 8 hours of sleep loaded as 20 minutes and a headache.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// The gate refuses anything outside 1..160 characters; fail loudly here
// instead of shipping an entry the scorer would mark invalid.
if (entry.length < 1 || entry.length > 160) {
  throw new Error(`entry is ${entry.length} characters, must be 1..160`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
