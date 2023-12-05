import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const numbers: string[] = [];

  const regexp = /\d/gm;

  input.forEach((data) => {
    const matches = data.match(regexp)!;

    numbers.push(`${matches[0]}${matches[matches.length - 1]}`);
  });

  return numbers.reduce((a, b) => {
    return a + Number(b);
  }, 0);
};

const writtenDigits: { [key in string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const numbers: string[] = [];

  const regexp = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/;

  input.forEach((data) => {
    const matches = data.match(regexp);

    const converted = matches?.map((data) => {
      if (!!writtenDigits[data]) {
        return writtenDigits[data];
      }
      return data;
    });

    // @ts-ignore
    numbers.push(`${converted[0]}${converted[converted.length - 1]}`);
  });

  return numbers.reduce((a, b) => {
    return a + +b;
  }, 0);
};

const digits = [...Object.entries(writtenDigits).flat()];
const getDigitValue = (digit: number | string) =>
  typeof digit === "string"
    ? writtenDigits[digit as keyof typeof writtenDigits]
    : digit;

export const getPart2Answer = (input: string) => {
  const parsed = parseInput(input);
  let sum = 0;
  const found = [];

  for (const line of parsed) {
    const foundDigits: number[] = [];
    digits.forEach((d) => {
      const firstDigitIndex = line.indexOf(d.toString());
      if (firstDigitIndex >= 0) foundDigits[firstDigitIndex] = getDigitValue(d);
      const lastDigitIndex = line.lastIndexOf(d.toString());
      if (lastDigitIndex >= 0) foundDigits[lastDigitIndex] = getDigitValue(d);
    });

    const condensed = foundDigits.filter((v) => v);
    found.push(condensed[0] * 10 + condensed[condensed.length - 1]);
    sum += condensed[0] * 10 + condensed[condensed.length - 1];
  }

  return sum;
};
// 54706

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: getPart2Answer,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
