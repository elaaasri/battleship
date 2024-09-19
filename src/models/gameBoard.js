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
        this.board[i][j] = { coords: [i, j], isShip: false };
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
  isShipCoordsValid(validCoords, allPreviousShipCoordsArr) {
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
    const allRightSideCoords = [
      [x, y],
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
      [x, y + 4],
    ].slice(0, shipSize);
    return allRightSideCoords;
  }
  // get random computer valid ship coords :
  getRandomComputerShipValidCoords(shipSize) {
    const allCoords = this.board.map((row) => {
      return row.map((cell) => {
        return cell.coords;
      });
    });
    // get random coords :
    const randomValidIndex = Math.floor(Math.random() * allCoords.length);
    const randomCoords = allCoords[randomValidIndex][randomValidIndex];
    if (!randomCoords) return;
    // const [x, y] = randomCoords;
    const allRightSideCoords = this.getAllRightSideCoords(
      randomCoords,
      shipSize
    );
    // checks if curr ship type coords are within the board :
    const isShipCoordsWithingBoard = allRightSideCoords.every(([x, y]) =>
      this.isWithinBounds(x, y)
    );
    return isShipCoordsWithingBoard ? allRightSideCoords : null;
  }
  // get current ship :
  getCurrShip(x, y) {
    const currShip = this.board[x][y];
    return currShip;
  }
  // get all curr ship items :
  getAllCurrShipItems(currShip) {
    const allCurrShipItems = this.board.flatMap((row) =>
      row.filter((square) => square.shipName === currShip.shipName)
    );
    return allCurrShipItems;
  }
  // checks if all curr ship items are sunk :
  makeAllShipItemsSunk(currShip) {
    const allCurrShipItems = this.getAllCurrShipItems(currShip);
    // checks if all curr ship items are sunk :
    allCurrShipItems.forEach((ship) => ship.isSunk());
    console.log(allCurrShipItems);
  }
  // receive attack
  receiveAttack(currShip) {
    const allCurrShipItems = this.getAllCurrShipItems(currShip);
    // hit all curr ship items :
    allCurrShipItems.forEach((ship) => ship.hit());
  }

  // get other ship square items :
  getOtherShipSquareItems(currShipHead) {
    console.log(currShipHead);
  }
  // checks if all ships are sunk :
  isAllShipsSunk() {
    for (const i in this.board) {
      const allShips = [];
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
