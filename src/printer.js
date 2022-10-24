import * as doc from "prettier/doc";

const builders = (doc.default ? doc.default : doc).builders;
const { group, hardline, indent, softline } = builders;

const printer = {
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
        return group([
          "[",
          indent([softline, path.map(print, "value")]),
          [softline, "]"]
        ]);
      case "root":
        return [path.map(print, "value"), hardline];
      default:
        throw new Error(`Unsupported node encountered: ${type}`);
    }
  }
};

export default printer;
