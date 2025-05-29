import { resolve } from "path";
import { readFileSync, writeFileSync } from "node:fs";

export default function viteCopySw() {
  const swPath = resolve(__dirname, "node_modules/@lil-el/codepen/dist/sw.js");
  const swCode = readFileSync(swPath, "utf-8");
  const targetPath = resolve(__dirname, "public/sw.js");
  writeFileSync(targetPath, swCode);
}
