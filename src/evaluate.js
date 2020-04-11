const readline = require("readline");

const parse = require("./parse");

const getChar = () =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("> ", (input) => {
      rl.close();

      resolve(input.charCodeAt(0));
    });
  });

/* eslint-disable no-restricted-syntax, no-param-reassign, no-await-in-loop */
const execute = async ({ type, value }, { tape, cursor }) => {
  switch (type) {
    case "+":
      return {
        tape: Object.assign({}, tape, { [cursor]: (tape[cursor] || 0) + 1 }),
        cursor
      };
    case "-":
      return {
        tape: Object.assign({}, tape, { [cursor]: (tape[cursor] || 0) - 1 }),
        cursor
      };
    case ">":
      return { tape, cursor: cursor + 1 };
    case "<":
      return { tape, cursor: cursor - 1 };
    case ".":
      process.stdout.write(String.fromCharCode(tape[cursor]));
      return { tape, cursor };
    case ",":
      return {
        tape: Object.assign({}, tape, { [cursor]: await getChar() }),
        cursor
      };
    case "loop":
      while (tape[cursor]) {
        for (const insn of value) {
          ({ tape, cursor } = await execute(insn, { tape, cursor }));
        }
      }

      return { tape, cursor };
    default:
      throw new Error(`Invalid instruction type: ${type}`);
  }
};

const evaluate = async (text) => {
  let state = {
    tape: {},
    cursor: 0
  };

  for (const insn of parse(text).value) {
    state = await execute(insn, state);
  }
};

module.exports = evaluate;
