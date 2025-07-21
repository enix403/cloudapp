import { sum } from "./core.service";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

// example.test.js

// Function to test
function add(a, b) {
  return a + b;
}

function throwIfNegative(n) {
  if (n < 0) throw new Error("Negative number not allowed");
  return n;
}

async function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve("data"), 100));
}

const utils = {
  multiply: (a, b) => a * b,
  logger: msg => console.log(msg)
};

// 🧪 Test Suite
describe("Jest Features Showcase", () => {
  test("adds numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toEqual(0);
  });

  test("object equality with toEqual", () => {
    const user = { name: "Alice", age: 30 };
    expect(user).toEqual({ name: "Alice", age: 30 });
  });

  test("throws error on negative input", () => {
    expect(() => throwIfNegative(-1)).toThrow("Negative number not allowed");
  });

  test("resolves async data", () => {
    return expect(fetchData()).resolves.toBe("data");
  });

  test("awaits async data", async () => {
    const data = await fetchData();
    expect(data).toBe("data");
  });

  test("spies on logger", () => {
    const spy = jest.spyOn(utils, "logger");
    utils.logger("Hello");
    expect(spy).toHaveBeenCalledWith("Hello");
    spy.mockRestore();
  });

  test("mocks a function", () => {
    const mockFn = jest.fn().mockReturnValue(42);
    expect(mockFn()).toBe(42);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  let value = 0;

  beforeEach(() => {
    value = 10;
  });

  afterEach(() => {
    value = 0;
  });

  test("value should be initialized before test", () => {
    expect(value).toBe(10);
  });

  describe("utils.multiply", () => {
    test("multiplies two numbers", () => {
      expect(utils.multiply(3, 4)).toBe(12);
    });
  });

  test("matches object snapshot", () => {
    const user = { id: 1, name: "Bob" };
    expect(user).toMatchSnapshot();
  });

  test.each([
    [1, 2, 3],
    [5, 5, 10],
    [-1, -1, -2]
  ])("add(%i, %i) = %i", (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });

  test("not matcher", () => {
    expect(add(2, 2)).not.toBe(5);
  });
});
