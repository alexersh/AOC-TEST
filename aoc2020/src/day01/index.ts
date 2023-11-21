import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let res = 0;

  input.forEach((a, indexA) => {
    input.forEach((b, indexB) => {
      if (indexA >= indexB) return; // Skip same element and duplicates

      if (a + b === 2020) {
        res = a * b;
        return; // Early exit once a pair is found
      }
    });
  });

  return res.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const set = new Set(input);
  let res = 0;

  input.forEach((a, indexA) => {
    input.forEach((b, indexB) => {
      if (indexA >= indexB) return; // Avoid checking the same pair and duplicates

      const complement = 2020 - a - b;
      if (set.has(complement)) {
        res = a * b * complement;
      }
    });
  });

  return res.toString();
};

run({
  part1: {
    tests: [
      {
        input: `1721
979
366
299
675
1456`,
        expected: "514579",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1721
979
366
299
675
1456`,
        expected: "241861950",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
