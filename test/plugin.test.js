import * as prettier from "prettier";
import plugin from "../src/plugin.js";

describe("plugin", () => {
  test("does not wrap anything when it all fits", async () => {
    const source = "++++----<<<<>>>>....,,,,[[[[]]]]\n";
    const formatted = await prettier.format(source, {
      parser: "brainfuck",
      plugins: [plugin]
    });

    expect(formatted).toEqual(source);
  });

  test("wraps loops when it hits the breaks", async () => {
    const inner = "++++----++++----++++----++++----++++----++++";
    const source = `++--[${inner}${inner}${inner}${inner}]--++\n`;

    const expected = `++--[\n  ${inner}${inner}${inner}${inner}\n]--++\n`;
    const formatted = await prettier.format(source, {
      parser: "brainfuck",
      plugins: [plugin]
    });

    expect(formatted).toEqual(expected);
  });
});
