import { readFileSync } from "node:fs";
import { evaluate } from "../src/evaluate";

evaluate(readFileSync(process.argv[2], "utf-8"));
