import { sum, minus, mul, div } from "./index";

describe("test Math", () => {
  test("test sum", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(3, 4)).toBe(7);
  });
  test("test minus", () => {
    expect(minus(1, 2)).toBe(-1);
    expect(minus(3, 4)).toBe(-1);
  });
  test("test mul", () => {
    expect(mul(1, 2)).toBe(2);
    expect(mul(3, 4)).toBe(12);
  });
  test("test div", () => {
    expect(div(1, 2)).toBe(0.5);
    expect(div(3, 4)).toBe(0.75);
  });
});
