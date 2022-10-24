import * as prettier from "prettier";
import plugin from "../src/plugin.js";

async function checkFormat(before, after) {
  const formatted = await prettier.format(before, {
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
    return expect("++++----<<<<>>>>....,,,,[[[[]]]]").toMatchFormat();
  });

  test("wraps loops when it hits the breaks", () => {
    const inner = "++++----++++----++++----++++----++++----++++";
    const content = `++++----[${inner}${inner}${inner}${inner}]----++++`;

    return expect(content).toChangeFormat(
      `++++----[\n  ${inner}${inner}${inner}${inner}\n]----++++`
    );
  });
});
