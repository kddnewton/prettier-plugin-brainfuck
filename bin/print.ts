import fs from "fs";
import prettier from "prettier";
import plugin from "../src/plugin";

const code = fs.existsSync(process.argv[2])
  ? fs.readFileSync(process.argv[2], "utf-8")
  : process.argv.slice(2).join(" ").replace(/\\n/g, "\n");

console.log(prettier.format(code, { plugins: [plugin], parser: "brainfuck" }));
