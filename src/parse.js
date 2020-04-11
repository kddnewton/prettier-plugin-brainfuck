const insns = ["+", "-", ">", "<", ".", ","];

const getValue = (text) => {
  const value = [];
  let index = 0;

  while (index < text.length) {
    const char = text.charAt(index);

    if (insns.includes(char)) {
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
};

const parse = (text, _parsers, _opts) => ({
  type: "root",
  value: getValue(text)
});

module.exports = parse;
