const insns = ["+", "-", ">", "<", ".", ","];

const getValue = text => {
  const value = [];
  let index = 0;

  while (index < text.length) {
    const char = text.charAt(index);

    if (insns.includes(char)) {
      value.push({ type: char, index });
      index += 1;
    } else if (char === "[") {
      let matched = 0;

      const endIndex = text
        .slice(index)
        .split("")
        .findIndex(nextChar => {
          matched += { "[": 1, "]": -1 }[nextChar] || 0;
          return matched === 0;
        });

      if (endIndex === -1) {
        throw new SyntaxError("Unmatched loop");
      }

      value.push({
        type: "loop",
        start: index,
        end: index + endIndex,
        value: getValue(text.substring(index + 1, endIndex + 1))
      });

      index += endIndex + 1;
    } else if (char === "]") {
      throw new SyntaxError("Unmatched loop");
    } else {
      index += 1;
    }
  }

  return value;
};

const parse = (text, _parsers, _opts) => ({
  type: "root",
  value: getValue(text)
});

module.exports = parse;
