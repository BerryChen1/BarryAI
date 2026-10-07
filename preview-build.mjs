import fs from "node:fs";
import path from "node:path";
import { compile } from "tailwindcss";
import { Scanner } from "@tailwindcss/oxide";

const root = process.cwd();
const inputPath = path.join(root, "src", "index.css");
const input = fs.readFileSync(inputPath, "utf8");

const scanner = new Scanner({
  sources: [
    { base: path.join(root, "src"), pattern: "**/*.{ts,tsx,js,jsx}", negated: false },
    { base: root, pattern: "index.html", negated: false },
  ],
});

const compiler = await compile(input, {
  base: path.dirname(inputPath),
  async loadStylesheet(id, base) {
    const resolved = id === "tailwindcss"
      ? path.join(root, "node_modules", "tailwindcss", "index.css")
      : path.resolve(base, id);

    return {
      path: resolved,
      base: path.dirname(resolved),
      content: fs.readFileSync(resolved, "utf8"),
    };
  },
});

fs.writeFileSync(
  path.join(root, "preview-styles.css"),
  compiler.build(scanner.scan()),
  "utf8",
);
