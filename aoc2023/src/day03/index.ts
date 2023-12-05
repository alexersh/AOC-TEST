import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const regExp = /[^*|.|\d\n]/g;

const buildMatrix = (arr: string[]) => {
  const matrix = new Map<number, Map<number, string>>();
  const symbolsCoords: { x: number; y: number }[] = [];
  const adjacentGears: { x: number; y: number }[] = [];

  arr.forEach((data, y) => {
    if (!matrix.get(y)) {
      matrix.set(y, new Map<number, string>());
    }
    const column = matrix.get(y);
    data.split("").forEach((v, x) => {
      if (regExp.test(v)) {
        symbolsCoords.push({ x, y });
      } else if (v === "*") {
        adjacentGears.push({ x, y });
      }
      column.set(x, v || ".");
    });
  });

  return { matrix, symbolsCoords, adjacentGears };
};

const checkLeft = (
  matrix: Map<number, Map<number, string>>,
  maxX: number,
  maxY: number,
  result: string,
  x: number,
  y: number,
) => {
  if (x - 1 <= maxX && x - 1 >= 0 && y <= maxY && y >= 0) {
    const left = matrix.get(y).get(x - 1);

    if (!isNaN(+left)) {
      return checkLeft(matrix, maxX, maxY, `${left}${result}`, x - 1, y);
    }
  }
  return { result, start: x };
};

const checkRight = (
  matrix: Map<number, Map<number, string>>,
  maxX: number,
  maxY: number,
  result: string,
  x: number,
  y: number,
) => {
  if (x + 1 <= maxX && x + 1 >= 0 && y >= 0 && y <= maxY) {
    const right = matrix.get(y).get(x + 1);

    if (!isNaN(+right)) {
      return checkRight(matrix, maxX, maxY, `${result}${right}`, x + 1, y);
    }
  }
  return { result, end: x };
};

function filterUniqueObjects(array) {
  const seen = new Set();
  return array.filter((obj) => {
    const objString = JSON.stringify(obj);
    if (!seen.has(objString)) {
      seen.add(objString);
      return true;
    }
    return false;
  });
}
const checkSurroundings = (
  matrix: Map<number, Map<number, string>>,
  x: number,
  y: number,
  maxX: number,
  maxY: number,
) => {
  const coordsToCheck = [
    { y: y - 1, x: x - 1 }, // top left
    { y: y - 1, x: x }, // top
    { y: y - 1, x: x + 1 }, // top right
    { y: y, x: x + 1 }, // right
    { y: y + 1, x: x + 1 }, // bottom right
    { y: y + 1, x: x }, // bottom
    { y: y + 1, x: x - 1 }, // bottom left
    { y: y, x: x - 1 }, // left
  ];

  const checked = coordsToCheck
    .map(({ x, y }) => {
      if (x >= 0 && y >= 0 && x <= maxX && y <= maxY) {
        const found = matrix.get(y).get(x);

        // Found number
        if (!isNaN(+found)) {
          // Check left
          const left = checkLeft(matrix, maxX, maxY, "", x, y);
          // Check right
          const right = checkRight(matrix, maxX, maxY, "", x, y);

          return {
            result: +`${left.result}${found}${right.result}`,
            y,
            start: left.start,
            end: right.end,
          };
        }
      }
      return undefined;
    })
    .filter((v) => v);

  return filterUniqueObjects(checked);
};
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const { matrix, symbolsCoords, adjacentGears } = buildMatrix(input);

  const gearNumbers = [...symbolsCoords, ...adjacentGears].map(({ x, y }) =>
    checkSurroundings(matrix, x, y, matrix.get(0).size, matrix.size),
  );

  return gearNumbers.reduce(
    (a, b) => a + b.reduce((s, g) => s + g.result, 0),
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const { matrix, adjacentGears } = buildMatrix(input);

  const adjacent: {
    end: number;
    start: number;
    result: number;
    y: number;
  }[][] = adjacentGears.map(({ x, y }) =>
    checkSurroundings(matrix, x, y, matrix.get(0).size, matrix.size),
  );

  return adjacent.reduce((sum, gears) => {
    if (gears.length === 2) {
      return sum + gears[0].result * gears[1].result;
    }
    return sum;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
