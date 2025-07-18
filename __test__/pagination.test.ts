import { describe, expect, test } from "@jest/globals";
import { paginate } from "@/utils/paginate";

const data = Array.from({ length: 10 }, (_, i) => i + 1); // [1,2,...,10]

describe("TC1. page > 0, size> 0일 경우 올바른 항목을 반환한다.", () => {
  // [page, size, expected]
  const testCases: [number, number, number[]][] = [
    [1, 1, [1]],
    [2, 1, [2]],
    [10, 1, [10]],
    [1, 2, [1, 2]],
    [2, 2, [3, 4]],
    [3, 2, [5, 6]],
    [4, 2, [7, 8]],
    [5, 2, [9, 10]],
    [1, 4, [1, 2, 3, 4]],
    [2, 4, [5, 6, 7, 8]],
    [3, 4, [9, 10]],
    [1, 6, [1, 2, 3, 4, 5, 6]],
    [2, 6, [7, 8, 9, 10]],
    [1, 7, [1, 2, 3, 4, 5, 6, 7]],
    [2, 7, [8, 9, 10]],
    [1, 8, [1, 2, 3, 4, 5, 6, 7, 8]],
    [2, 8, [9, 10]],
    [1, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [2, 9, [10]],
    [1, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  ];

  test.each(testCases)(
    "page: %i, size: %i ➝ returns %j",
    (page, size, expected) => {
      const result = paginate(page, data, size);
      expect(result).toEqual(expected);
    }
  );
});
