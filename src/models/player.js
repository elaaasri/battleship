import GameBoard from "./gameBoard.js";
import Ship from "./ship.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
    this.gameBoard.createBoard();
    this.boardArr = this.gameBoard.board;
  }
  // get player name :
  getName() {
    return this.name;
  }
  // set player board limit :
  setplayerBoard(x, y) {
    return this.gameBoard.setBoardlimit(x, y);
  }
  // set player ship position :
  setPlayerShipPosition(correctCoords, shipName, shipLength) {
    // const shipName = currShip.getShipName();
    // const shipLength = currShip.getShipLength();
    // const [x, y] = squareCoords;
    // const allRightCoords = [
    //   [x, y],
    //   [x, y + 1],
    //   [x, y + 2],
    //   [x, y + 3],
    //   [x, y + 4],
    // ];
    // let correctCoords = allRightCoords.slice(0, shipLength);
    if (correctCoords == null) return;
    else
      correctCoords.map((coord) => {
        const [x, y] = coord;
        this.gameBoard.placeShip(x, y, shipName, shipLength);
      });
    // console.log(this.boardArr);
  }
  createShipType(shipName) {
    switch (shipName) {
      case "carrier-ship":
        return new Ship(shipName, 5);
      case "battle-ship":
        return new Ship(shipName, 4);
      case "cruiser-ship":
      case "submarine-ship":
        return new Ship(shipName, 3);
      case "destroyer-ship":
        return new Ship(shipName, 2);
    }
  }
}

export default Player;
