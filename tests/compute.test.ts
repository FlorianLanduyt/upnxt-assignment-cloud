import { compute } from "../src/compute";
import { Game } from "../src/types";

it("should return 300 on a perfect game", () => {
  const input300: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10],
  ];

  const score = compute(input300);

  expect(score).toBe(300);
});


it("should return 10 on a example game of assignment", () => {
  const input10: Game = [
    [1, 2],
    [3, 4],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ];

  const score = compute(input10);

  expect(score).toBe(10);
});

it("should return 150 on game of all 5's", () => {
  const input150: Game = [
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5],
    [5, 5, 5],
  ];

  const score = compute(input150);

  expect(score).toBe(150);
});


it("should return 48 on double strike and 6", () => {
  const input48: Game = [
    [10, 0],
    [10, 0],
    [6, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ];

  const score = compute(input48);

  expect(score).toBe(48);
});

it("should return 78 on double strike and 6", () => {
  const input78: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [6, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ];

  const score = compute(input78);

  expect(score).toBe(78);
});

it("should return 80 on all 4's", () => {
  const input80: Game = [
    [4, 4],
    [4, 4],
    [4, 4],
    [4, 4],
    [4, 4],
    [4, 4],
    [4, 4],
    [4, 4],
    [4, 4],
    [4, 4, 0],
  ];

  const score = compute(input80);

  expect(score).toBe(80);
});

