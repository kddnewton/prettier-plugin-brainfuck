import parser from "./parser.js";
import printer from "./printer.js";

const plugin = {
  languages: [
    {
      name: "Brainfuck",
      parsers: ["brainfuck"],
      extensions: [".bf"]
    }
  ],
  parsers: {
    brainfuck: parser
  },
  printers: {
    brainfuck: printer
  },
  defaultOptions: {
    printWidth: 80,
    tabWidth: 2
  }
};

export default plugin;
