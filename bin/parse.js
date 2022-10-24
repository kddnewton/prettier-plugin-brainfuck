import { existsSync, readFileSync } from "node:fs";
import { parse } from "../src/parser";

const code = existsSync(process.argv[2])
  ? readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");

console.log(JSON.stringify(parse(code), null, 2));
