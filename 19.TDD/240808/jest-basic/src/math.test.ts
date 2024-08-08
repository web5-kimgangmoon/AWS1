import { add } from "./math";

describe("test math", () => {
  it("test add method", () => {
    expect(add(1, 2)).toEqual(3);
    // matcher라 한다. 많이 있으니까 필요하면 찾아보자.
  });
});
