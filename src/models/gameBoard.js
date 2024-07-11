import Ship from "./ship.js";

// game board class :
class GameBoard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.board = [];
  }
  // creates game board :
  createBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = { value: 0, missed: null };
      }
    }
    return this.board;
  }
  // place the ship in the correct coordinates :
  placeShip(row, column) {
    // this.createBoard();
    if (this.isWithinBounds(row, column)) {
      const ship = new Ship(); // creates ship instance.
      this.board[row][column] = ship;
      return "ship placed!";
    } else return "out of bound coordinates!";
  }
  // checks the given coordinates is within the bounds of the board :
  isWithinBounds(x, y) {
    return x >= 0 && x < this.rows && y >= 0 && y < this.columns;
  }
  // checks if the attack hits a ship or not :
  receiveAttack(row, column) {
    const attackedCoordinates = this.board[row][column];
    if (attackedCoordinates.value != 0) {
      attackedCoordinates.hit(); // increases attacked ship hits.
      return "attack hits the ship!";
    } else {
      attackedCoordinates.missed = true; // tracks missed attacks.
      return "attack missed the ship!";
    }
  }
  // checks if all ships are sunk :
  isAllShipsSunk() {
    const allShips = [];
    for (const i in this.board) {
      for (const j in this.board[i]) {
        if (!this.board[i][j].hasOwnProperty("value"))
          allShips.push(this.board[i][j]);
      }
    }
    const isShipsSunk = allShips.every((ship) => ship.isShipSunk);
    return isShipsSunk ? true : false;
  }
}
export default GameBoard;
