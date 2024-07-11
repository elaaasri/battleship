import GameBoard from "../models/gameBoard.js";

test("place ship", () => {
  const board = new GameBoard();
  expect(board.placeShip(9, 5)).toBe("ship placed!");
  expect(board.placeShip(11, 15)).toBe("out of bound coordinates!");
});

test("receive attack", () => {
  const board = new GameBoard();
  board.placeShip(9, 5); // places a ship for test.
  expect(board.receiveAttack(9, 5)).toBe("attack hits the ship!"); // same coordinates as the testing ship.
  expect(board.receiveAttack(9, 6)).toBe("attack missed the ship!"); // different coordinates from testing ship.
});

test("receive attack", () => {
  const board = new GameBoard();
  board.placeShip(9, 5); // places a ship for test.
  expect(board.receiveAttack(9, 5)).toBe("attack hits the ship!"); // same coordinates as the testing ship.
  expect(board.receiveAttack(9, 6)).toBe("attack missed the ship!"); // different coordinates from testing ship.
});
