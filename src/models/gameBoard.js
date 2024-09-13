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
        this.board[i][j] = { coords: [i, j], isShip: false }; // curret problem
      }
    }
  }
  // place the ship in the correct coords :
  placeShip(row, column, shipType, shipLength) {
    // curret problem
    const ship = new Ship(shipType, shipLength); // creates ship instance.
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
    const [x, y] = currSquareCoords;
    const allRightSideCoords = [
      [x, y],
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
      [x, y + 4],
    ].slice(0, currShipLength);
    // checks if curr ship type coords are within the board :
    const isShipCoordsWithingBoard = allRightSideCoords.every((coord) =>
      this.isWithinBounds(coord[0], coord[1])
    );
    return isShipCoordsWithingBoard ? allRightSideCoords : null;
  }
  // checks if ship coords are valid :
  isShiptCoordsValid(validCoords, allPreviousShipCoordsArr) {
    const areCoordsEqual = allPreviousShipCoordsArr.some((prevCoord) =>
      prevCoord.some((coord) =>
        validCoords.some(
          (currCoord) => JSON.stringify(coord) === JSON.stringify(currCoord)
        )
      )
    );
    return !areCoordsEqual;
  }
  //   // get computer correct ship coords :
  getComputerShipValidCoords(shipSize) {
    const allCoords = this.board.map((row) => {
      return row.map((cell) => {
        return cell.coords;
      });
    });
    // get random coords :
    const randomValidIndex = Math.floor(Math.random() * allCoords.length);
    const randomCoords = allCoords[randomValidIndex][randomValidIndex];
    if (!randomCoords) return;
    const [x, y] = randomCoords;
    const allRightSideCoords = [
      [x, y],
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
      [x, y + 4],
    ].slice(0, shipSize);
    // checks if curr ship type coords are within the board :
    const isShipCoordsWithingBoard = allRightSideCoords.every(([x, y]) =>
      this.isWithinBounds(x, y)
    );
    return isShipCoordsWithingBoard ? allRightSideCoords : null;
  }
  isSquareShip(x, y) {
    const currSquare = this.board[x][y];
    return currSquare.isShip;
  }
  // checks if the attack hits a ship or not :
  // receiveAttack(ship) {
  //   const zbe = this.getTheWholeShip(row, column);
  //   console.log(zbe);

  //   // const currShip = this.board[row][column]; // get curr ship.
  //   // get all target ship items :
  //   // const allCurrShipItems = this.board.flatMap((row) =>
  //   // row.filter((square) => square.shipName === currShip.shipName)
  //   // );
  //   // const zbe = allCurrShipItems[0]; // assign one item of ship as the whole ship :
  //   ship.hit();
  //   console.log(ship);
  //   console.log(ship.isSunk());
  // }
  //
  getWholeShip(row, column) {
    const currShip = this.board[row][column]; // get curr ship.
    // get all target ship items :
    const allCurrShipItems = this.board.flatMap((row) =>
      row.filter((square) => square.shipName === currShip.shipName)
    );
    const wholeShip = allCurrShipItems[0]; // assign one item of ship as the whole ship :
    return wholeShip;
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

// once the ship sunk shows it on board :

// working on making the hitted ship increases numberofhit on each same target square ship!
// if (currSquare.isShip) {
//   for (let i = 0; i < this.board.length; i++) {
//     for (let j = 0; j < this.board[i].length; j++) {
//       if (currSquare.shipName == this.board[i][j].shipName) {
//         // console.log("target square", this.board[i][j]);
//         const targetShip = this.board[i][j];
//         targetShip.hit();
//         // console.log(targetShip);
//       }
//     }
//   }
// }

// hit() {
// return this.numberOfHits++;
// }
// if (attackedCoordinates.value != 0) {
//   attackedCoordinates.hit(); // increases attacked ship hits.
//   return "attack hits the ship!";
// } else {
//   attackedCoordinates.missed = true; // tracks missed attacks.
//   return "attack missed the ship!";
// }

// / const matchingSquares = this.board.flatMap((row) =>
//   row.filter((square) => square.shipName === currSquare.shipName)
// );
// const matchingSquares = this.board.map((row) =>
// row.filter((square) => {
// return square.shipName == currSquare.shipName;
// })
// );
//

// checks if it's a ship :
// if (currSquare.isShip) {
//   // get all target ship items :
//   const allTargetShipItems = this.board.flatMap((row) =>
//     row.filter((square) => square.shipName === currSquare.shipName)
//   );
//   // hits every ship item :
//   allTargetShipItems.map((item) => {
//     return item.hit();
//   });
//   console.log(allTargetShipItems);
// }
// const allTargetShipItems = this.board.flatMap((row) =>
//   row.filter((square) => square.shipName === currSquare.shipName)
// );
// // hits every ship item :
// allTargetShipItems.map((item) => {
//   return item.hit();
// });

// hits every ship item :
// allTargetShipItems.map((item.isSunk());
//   return item.hit();
// });m) => {
//   // console.log(ite
