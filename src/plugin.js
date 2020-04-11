const parse = require("./parse");
const print = require("./print");

const locStart = (node) => (node.type === "loop" ? node.start : node.index);
const locEnd = (node) => (node.type === "loop" ? node.end : node.index);

const plugin = {
  languages: [
    {
      name: "Brainfuck",
      parsers: ["brainfuck"],
      extensions: [".bf"]
    }
  ],
  parsers: {
    brainfuck: {
      parse,
      astFormat: "brainfuck",
      locStart,
      locEnd
    }
  },
  printers: {
    brainfuck: {
      print
    }
  },
  defaultOptions: {
    printWidth: 80,
    tabWidth: 2
  }
};

module.exports = plugin;
