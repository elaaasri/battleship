import { experiments } from "webpack";
import GameBoard from "../models/gameBoard.js";
import Ship from "../models/ship.js";

test("place ship", () => {
  const board = new GameBoard();
  board.createBoard(); // creates board.
  expect(board.placeShip(9, 5)).toBe("ship placed!");
  expect(board.placeShip(11, 15)).toBe("out of bound coordinates!");
});

test("receive attacks and track missed ones", () => {
  const board = new GameBoard();
  board.createBoard();
  board.placeShip(9, 5); // places a ship for test.
  expect(board.receiveAttack(9, 5)).toBe("attack hits the ship!"); // same coordinates as the testing ship.
  expect(board.receiveAttack(9, 6)).toBe("attack missed the ship!"); // different coordinates from testing ship.
});

test("checks if all ships are sunk", () => {
  const board = new GameBoard();
  board.createBoard();
  // places ships for testing :
  board.placeShip(0, 0);
  board.placeShip(0, 1);
  expect(board.isAllShipsSunk()).toBeFalsy();
});
