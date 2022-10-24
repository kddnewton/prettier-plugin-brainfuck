const fs = require("node:fs");

function parse(text) {
  const insns = [];
  const loops = [];

  let index = 0;
  while (index < text.length) {
    const char = text.charAt(index);
    index += 1;

    switch (char) {
      case "+":
        insns.push({ op: "incr" });
        break;
      case "-":
        insns.push({ op: "decr" });
        break;
      case ">":
        insns.push({ op: "right" });
        break;
      case "<":
        insns.push({ op: "left" });
        break;
      case ".":
        insns.push({ op: "out" });
        break;
      case ",":
        insns.push({ op: "in" });
        break;
      case "[":
        loops.push(insns.length);
        insns.push({ op: "jmpz", target: -1 });
        break;
      case "]": {
        const start = loops.pop();
        if (start === undefined) {
          throw new SyntaxError("Unmatched end loop");
        }

        insns.push({ op: "jmp", target: start });
        insns[start].target = insns.length;
        break;
      }
    }
  }

  if (loops.length > 0) {
    throw new SyntaxError("Unmatched start loop");
  }

  return insns;
}

function evaluate(text) {
  const insns = parse(text);
  let pc = 0;

  const tape = {};
  let cursor = 0;

  const buffer = Buffer.alloc(1);

  while (pc < insns.length) {
    const insn = insns[pc++];

    switch (insn.op) {
      case "incr":
        tape[cursor] = (tape[cursor] || 0) + 1;
        break;
      case "decr":
        tape[cursor] = (tape[cursor] || 0) - 1;
        break;
      case "right":
        cursor += 1;
        break;
      case "left":
        cursor -= 1;
        break;
      case "out":
        process.stdout.write(String.fromCharCode(tape[cursor]));
        break;
      case "in":
        fs.readSync(0, buffer, 0, 1, null);
        tape[cursor] = buffer.toString("ascii").charCodeAt(0);
        break;
      case "jmpz":
        pc = tape[cursor] ? pc : insn.target;
        break;
      case "jmp":
        pc = insn.target;
        break;
    }
  }

  return tape;
}

module.exports = { parse, evaluate };
