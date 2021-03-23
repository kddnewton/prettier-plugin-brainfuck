import prettier, { Printer } from "prettier";
import type { Insn } from "./parser";

const { concat, group, hardline, indent, softline } = prettier.doc.builders;

const printer: Printer<Insn> = {
  print(path, _opts, print) {
    const { type } = path.getValue();

    switch (type) {
      case "+":
      case "-":
      case ">":
      case "<":
      case ".":
      case ",":
        return type;
      case "loop":
        return group(
          concat([
            "[",
            indent(concat([softline, concat(path.map(print, "value"))])),
            concat([softline, "]"])
          ])
        );
      case "root":
        return concat([concat(path.map(print, "value")), hardline]);
      default:
        throw new Error(`Unsupported node encountered: ${type}`);
    }
  }
};

export default printer;
