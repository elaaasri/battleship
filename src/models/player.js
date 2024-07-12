import GameBoard from "./gameBoard.js";

class Player {
  constructor() {
    this.humanBoard = new GameBoard().createBoard();
    this.computerBoard = new GameBoard().createBoard();
  }
}
export default Player;
