import { add } from "../services/math.service.js";

describe("add()", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds negative and positive numbers", () => {
    expect(add(-2, 5)).toBe(3);
  });

  test("adds zero", () => {
    expect(add(0, 0)).toBe(0);
  });

  test("handles decimal numbers", () => {
    expect(add(2.5, 1.5)).toBe(4);
  });
});
