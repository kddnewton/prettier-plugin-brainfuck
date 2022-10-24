import { existsSync, readFileSync } from "node:fs";
import { format } from "prettier";
import plugin from "../src/plugin";

const code = existsSync(process.argv[2])
  ? readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");

console.log(format(code, { plugins: [plugin], parser: "brainfuck" }));
