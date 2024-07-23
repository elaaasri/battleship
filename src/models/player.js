import GameBoard from "./gameBoard.js";

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
  // place ship :
  place(x, y, name, length) {
    return this.gameBoard.placeShip(x, y, name, length);
  }
  // set player board limit :
  setplayerBoard(x, y) {
    return this.gameBoard.setBoardlimit(x, y);
  }
  // return new GameBoard().placeShip(x, y);
  // ship(x, y) {
  // }
  // getPlayerBoard() {
  //   this.board = new GameBoard().createBoard();
  //   return this.board;
  // }
  // getComputerBoard() {
  //   this.board = new GameBoard().createBoard();
  //   return this.board;
  // }
}
export default Player;
