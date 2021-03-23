import fs from "fs";
import { parse } from "../src/parser";

const code = fs.existsSync(process.argv[2])
  ? fs.readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");

console.log(JSON.stringify(parse(code), null, 2));
