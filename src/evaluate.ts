import readline from "readline";
import { Insn, parse } from "./parser";

type State = {
  tape: { [key: number]: number };
  cursor: number;
};

function getChar(): Promise<number> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("> ", (input) => {
      rl.close();

      resolve(input.charCodeAt(0));
    });
  });
}

/* eslint-disable no-param-reassign, no-await-in-loop */
async function execute(insn: Insn, { tape, cursor }: State): Promise<State> {
  switch (insn.type) {
    case "+":
      return { tape: { ...tape, [cursor]: (tape[cursor] || 0) + 1 }, cursor };
    case "-":
      return { tape: { ...tape, [cursor]: (tape[cursor] || 0) - 1 }, cursor };
    case ">":
      return { tape, cursor: cursor + 1 };
    case "<":
      return { tape, cursor: cursor - 1 };
    case ".":
      process.stdout.write(String.fromCharCode(tape[cursor]));
      return { tape, cursor };
    case ",":
      return { tape: { ...tape, [cursor]: await getChar() }, cursor };
    case "loop":
      while (tape[cursor]) {
        for (const child of insn.value) {
          ({ tape, cursor } = await execute(child, { tape, cursor }));
        }
      }

      return { tape, cursor };
    default:
      throw new Error(`Invalid instruction type: ${insn.type}`);
  }
}

async function evaluate(text: string): Promise<State> {
  let state: State = { tape: {}, cursor: 0 };

  for (const insn of parse(text).value) {
    state = await execute(insn, state);
  }

  return state;
}

export default evaluate;
