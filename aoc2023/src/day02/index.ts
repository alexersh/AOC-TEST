import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line, i) => {
      const results = line.split(":")[1].trim();
      return {
        gameId: i + 1,
        piles: results
          .split("; ")
          .map((pile) => pile.split(", ").map((r) => r.split(" "))),
      };
    });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const possibleGames = input.filter(
    ({ gameId, piles }) =>
      !piles.some((pile) =>
        pile.some(([value, color]) => {
          switch (color) {
            case "red":
              return +value > 12;
            case "green":
              return +value > 13;
            case "blue":
              return +value > 14;
            default:
              return false;
          }
        }),
      ),
  );

  return possibleGames.reduce((sum, { gameId }) => sum + gameId, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const minCubes = input.map((game) => {
    const fewest = {
      red: 0,
      green: 0,
      blue: 0,
    };
    type Color = keyof typeof fewest;

    game.piles.forEach((pile) =>
      pile.forEach(([value, color]) => {
        if (+value > fewest[color as Color]) {
          fewest[color as Color] = +value;
        }
      }),
    );

    return fewest.red * fewest.green * fewest.blue;
  });

  return minCubes.reduce((a, b) => a + b, 0);
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
