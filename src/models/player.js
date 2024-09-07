import GameBoard from "./gameBoard.js";
import Ship from "./ship.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
    this.gameBoard.createBoard();
  }
  // get player name :
  getName() {
    return this.name;
  }
  // set player ship position :
  setShipPositionOnBoard(correctCoords, shipName, shipLength) {
    correctCoords.map((coord) => {
      const [x, y] = coord;
      this.gameBoard.placeShip(x, y, shipName, shipLength);
    });
    // console.log(this.gameBoard.board);
  }
  // creates ship type obj :
  createShipType(shipName) {
    const allShipTypes = {
      "carrier-ship": 5,
      "battle-ship": 4,
      "cruiser-ship": 3,
      "submarine-ship": 3,
      "destroyer-ship": 2,
    };
    const shipLength = allShipTypes[shipName];
    return new Ship(shipName, shipLength);
  }
}
export default Player;
