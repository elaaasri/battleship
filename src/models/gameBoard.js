import Ship from "./ship.js";

// game board class :
class GameBoard {
  constructor(name) {
    this.name = name;
    this.rows = 10;
    this.columns = 10;
    this.board = [];
    this.allCoords = [];
  }
  // get board name :
  getBoardName() {
    return this.name;
  }
  // get player board :
  getPlayerBoard() {
    return this.board;
  }
  // creates game board :
  createBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = { coords: [i, j], isShip: false };
        this.allCoords.push([i, j]);
      }
    }
  }
  // place the ship in the correct coords :
  placeShip(row, column, shipType, shipLength) {
    const ship = new Ship(shipType, shipLength); // creates new ship.
    this.board[row][column] = ship;
  }
  // checks the given coordinates is within the bounds of the board :
  isWithinBounds(x, y) {
    return x >= 0 && x < this.rows && y >= 0 && y < this.columns;
  }
  // get correct ship coords :
  getPlayerCurrValidCoords(currSquare, currShipLength) {
    // gets curr square coords :
    const currSquareCoords = [
      Number(currSquare.getAttribute("data-x")),
      Number(currSquare.getAttribute("data-y")),
    ];
    // gets all right ship coords :
    const allRightSideCoords = this.getAllRightSideCoords(
      currSquareCoords,
      currShipLength
    );
    // checks if curr ship type coords are within the board :
    const isShipCoordsWithingBoard = allRightSideCoords.every(([x, y]) =>
      this.isWithinBounds(x, y)
    );
    return isShipCoordsWithingBoard ? allRightSideCoords : null;
  }
  // checks if ship coords are valid :
  isPreviousCoordsUsed(validCoords, allPreviousShipCoordsArr) {
    const areCoordsEqual = allPreviousShipCoordsArr.some((prevCoord) =>
      prevCoord.some((coord) =>
        validCoords.some(
          (currCoord) => JSON.stringify(coord) === JSON.stringify(currCoord)
        )
      )
    );
    return !areCoordsEqual;
  }
  // get all right side coords :
  getAllRightSideCoords(coords, shipSize) {
    const [x, y] = coords;
    return [
      [x, y],
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
      [x, y + 4],
    ].slice(0, shipSize);
  }
  // get random computer valid ship coords :
  getRandomComputerShipValidCoord(shipSize) {
    const allCoords = this.board.map((row) => {
      return row.map((cell) => {
        return cell.coords;
      });
    });
    // get random coords :
    const randomValidIndex = Math.floor(Math.random() * allCoords.length);
    const randomCoord = allCoords[randomValidIndex][randomValidIndex];
    if (!randomCoord) return;
    const allRightSideCoords = this.getAllRightSideCoords(
      randomCoord,
      shipSize
    );
    // checks if curr ship type coords are within the board :
    const isShipCoordsWithingBoard = allRightSideCoords.every(([x, y]) =>
      this.isWithinBounds(x, y)
    );
    return isShipCoordsWithingBoard ? allRightSideCoords : null;
  }
  // get one ship that represents all current ship items :
  getCurrShip(x, y) {
    const currShip = this.board[x][y];
    return currShip;
  }
  // get all curr ship items :
  getAllCurrShipItems(currShip) {
    return this.board.flatMap((row) =>
      row.filter((square) => square.shipName === currShip.shipName)
    );
  }
  // receive attack :
  receiveAttack(currShip) {
    const allCurrShipItems = this.getAllCurrShipItems(currShip);
    // hits and sunk all ship on game board object.
    allCurrShipItems.forEach((ship) => {
      ship.hit();
      ship.isSunk();
    });
  }
  // get random player game board valid coords :
  getRandomPlayerValidCoord() {
    // get random coord :
    const randomValidIndex = Math.floor(Math.random() * this.allCoords.length);
    const randomCoord = this.allCoords[randomValidIndex];
    // update all coords array so it shouldn’t get the same coord twice:
    const randomCoordIndex = this.allCoords.indexOf(randomCoord);
    this.allCoords.splice(randomCoordIndex, 1);
    return randomCoord;
  }
  // checks if all ships are sunk :
  isAllCurrGameBoardShipsSunk() {
    return this.board
      .flat()
      .filter((cell) => cell.isShip)
      .every((ship) => ship.isShipSunk);
  }
}
export default GameBoard;
