import fs from "fs";
import { evaluate } from "../src/evaluate";

evaluate(fs.readFileSync(process.argv[2], "utf-8"));
