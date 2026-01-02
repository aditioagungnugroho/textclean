import { describe, it, expect } from "vitest";
import { clean } from "./index";

describe("texclean", () => {
  it("should trim whitespace", () => {
    expect(clean("  hello world  ")).toBe("hello world");
  });

  it("should collapse multiple spaces", () => {
    expect(clean("hello   world")).toBe("hello world");
  });

  it("should normalize newlines", () => {
    expect(clean("hello\r\nworld")).toBe("hello\nworld");
    expect(clean("hello\rworld")).toBe("hello\nworld");
  });

  it("should remove zero-width characters", () => {
    expect(clean("hello\u200Bworld")).toBe("helloworld");
  });

  it("should normalize non-breaking spaces", () => {
    expect(clean("hello\u00A0world")).toBe("hello world");
  });

  it("should handle unicode characters (accents)", () => {
    expect(clean("café")).toBe("café");
  });

  it("should handle emojis", () => {
    expect(clean("hello 🌍")).toBe("hello 🌍");
  });

  it("should trim per line", () => {
    expect(clean("  line1  \n  line2  ")).toBe("line1\nline2");
  });
});
