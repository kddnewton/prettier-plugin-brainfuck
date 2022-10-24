import { format } from "prettier";
import plugin from "../src/plugin.js";

function checkFormat(before, after) {
  const formatted = format(before, {
    parser: "brainfuck",
    plugins: [plugin]
  });

  return {
    pass: formatted.trim() === after.trim(),
    message: () => `Expected:\n${after}\nReceived:\n${formatted}`
  };
}

expect.extend({
  toChangeFormat: checkFormat,
  toMatchFormat: (before) => checkFormat(before, before)
});

describe("plugin", () => {
  test("does not wrap anything when it all fits", () => {
    expect("++++----<<<<>>>>....,,,,[[[[]]]]").toMatchFormat();
  });

  test("wraps loops when it hits the breaks", () => {
    const inner = "++++----++++----++++----++++----++++----++++";
    const content = `++++----[${inner}${inner}${inner}${inner}]----++++`;

    expect(content).toChangeFormat(
      `++++----[\n  ${inner}${inner}${inner}${inner}\n]----++++`
    );
  });
});
