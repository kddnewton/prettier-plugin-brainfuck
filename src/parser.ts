import type { Parser } from "prettier";

const simpleInsnTypes = ["+", "-", ">", "<", ".", ","] as const;

type SimpleInsn = { type: typeof simpleInsnTypes; index: number };
type LoopInsn = { type: "loop"; start: number; end: number; value: Insn[] };
type RootInsn = { type: "root"; start: number; end: number; value: Insn[] };

export type Insn = SimpleInsn | LoopInsn | RootInsn;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSimpleInsnType(type: any): type is SimpleInsn["type"] {
  return simpleInsnTypes.includes(type);
}

function getValue(text: string): Insn[] {
  const value: Insn[] = [];
  let index = 0;

  while (index < text.length) {
    const char = text.charAt(index);

    if (isSimpleInsnType(char)) {
      value.push({ type: char, index });
      index += 1;
    } else if (char === "[") {
      let matched = 1;
      let endIndex = index + 1;

      while (matched !== 0 && endIndex < text.length) {
        matched += { "[": 1, "]": -1 }[text.charAt(endIndex)] || 0;
        endIndex += 1;
      }

      if (matched !== 0) {
        throw new SyntaxError("Unmatched start loop");
      }

      value.push({
        type: "loop",
        start: index,
        end: endIndex - 1,
        value: getValue(text.slice(index + 1, endIndex - 1))
      });

      index = endIndex;
    } else if (char === "]") {
      throw new SyntaxError("Unmatched end loop");
    } else {
      index += 1;
    }
  }

  return value;
}

export function parse(text: string): RootInsn {
  return { type: "root", value: getValue(text), start: 0, end: text.length };
}

const parser: Parser<Insn> = {
  astFormat: "brainfuck",
  parse(text) {
    return parse(text);
  },
  locStart(node) {
    if (node.type === "root" || node.type === "loop") {
      return node.start;
    }
    return node.index;
  },
  locEnd(node) {
    if (node.type === "root" || node.type === "loop") {
      return node.end;
    }
    return node.index;
  }
};

export default parser;
