const {
  concat,
  group,
  hardline,
  indent,
  join,
  line,
  softline
} = require("prettier").doc.builders;

const genericPrint = (path, opts, print) => {
  const { type, value } = path.getValue();

  switch (type) {
    case "+":
    case "-":
    case ">":
    case "<":
    case ".":
    case ",":
      return type;
    case "[]":
      return group(concat([
        "[",
        indent(concat([
          softline,
          join("", path.map(print, "value"))
        ])),
        concat([softline, "]"])
      ]));
    case "root": 
      return concat([
        join("", path.map(print, "value")),
        hardline
      ]);
    default:
      throw new Error(`Unsupported node encountered: ${type}`);
  }
};

module.exports = genericPrint;
