const fs = require("node:fs");
const { evaluate } = require("../src/evaluate");

evaluate(fs.readFileSync(process.argv[2], "utf-8"));
