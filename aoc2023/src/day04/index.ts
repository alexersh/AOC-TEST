import run from "aocrunner";

const regexp = /\d+/gm;
const parseInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line) => {
      const [winning, numbers] = line.split(":")[1].split("|");
      return {
        winning: winning.match(regexp),
        numbers: numbers.match(regexp),
      };
    });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((s, { winning, numbers }) => {
    const wins = winning.filter((n) => numbers.includes(n));

    if (wins.length) {
      return s + (1 << (wins.length - 1));
    }
    return s;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const cards: [wins: number, count: number][] = input.map(
    ({ numbers, winning }) => [
      numbers.filter((n) => winning.includes(n)).length,
      1,
    ],
  );

  for (let w = 0; w < cards.length; w++) {
    const [wins, count] = cards[w];
    if (wins === 0) continue;
    for (let e = 1; e <= wins; e++) {
      if (w + e > cards.length - 1) break;
      cards[w + e][1] += count;
    }
  }
  return cards.map(([, w]) => w).reduce((a, c) => a + c, 0);
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
