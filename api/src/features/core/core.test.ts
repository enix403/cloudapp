import { sum as add } from "./core.service";

function throwIfNegative(n) {
  if (n < 0) throw new Error("Negative number not allowed");
  return n;
}

async function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve("data"), 100));
}


let globalCounter = 0;
let localCounter = 0;

beforeAll(() => {
  // Runs once before all tests
  globalCounter = 100;
  console.log("beforeAll - globalCounter initialized");
});

afterAll(() => {
  // Runs once after all tests
  console.log("afterAll - globalCounter cleanup");
});

beforeEach(() => {
  // Runs before each test
  localCounter = 10;
  console.log("beforeEach - localCounter reset");
});

afterEach(() => {
  // Runs after each test
  console.log("afterEach - test complete");
});

describe("Testing lifecycle hooks", () => {
  test("Test 1 - modify counters", () => {
    globalCounter += 1;
    localCounter += 1;
    expect(globalCounter).toBeGreaterThan(100);
    expect(localCounter).toBe(11);
  });

  test("Test 2 - ensure fresh localCounter", () => {
    expect(localCounter).toBe(10); // fresh value for each test
    expect(globalCounter).toBeGreaterThanOrEqual(101); // persists across tests
  });
});

describe("beforeAll and afterAll inside describe", () => {
  let scopedCounter = 0;

  beforeAll(() => {
    scopedCounter = 5;
    console.log("beforeAll in describe - scopedCounter set");
  });

  afterAll(() => {
    console.log("afterAll in describe - scopedCounter done");
  });

  test("scopedCounter should be 5 initially", () => {
    expect(scopedCounter).toBe(5);
  });

  test("scopedCounter persists between tests in same describe", () => {
    scopedCounter += 1;
    expect(scopedCounter).toBeGreaterThan(5);
  });
});


// --------------------------


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
