import parser from "./parser";
import printer from "./printer";

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
