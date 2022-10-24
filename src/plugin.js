const parser = require("./parser");
const printer = require("./printer");

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

module.exports = plugin;
