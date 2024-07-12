import Player from "./player";
import GameBoard from "./gameBoard";
import Ship from "./ship";

// const gameBoard = new GameBoard();
// const board = gameBoard.createBoard();
// const boardContainer = document.getElementById("boards-container");
// console.log(boardContainer);
// console.log("test");
//////////////////////
// const boardsContainer = document.getElementById("boards-container");
// const playerBoardContainer = document.createElement("div");
// const computerBoardContainer = document.createElement("div");
// playerBoardContainer.id = "player-board-container";
// computerBoardContainer.id = "computer-board-container";
// boardsContainer.appendChild(computerBoardContainer);
// boardsContainer.appendChild(playerBoardContainer);
const playerBoard = new Player().humanBoard;
const computerBoard = new Player().computerBoard;
const playerBoardContainer = document.getElementById("player-board-container");
const computerBoardContainer = document.getElementById(
  "computer-board-container"
);
const createBoardElements = (arr, container) => {
  for (const row of arr) {
    for (const ele of row) {
      const square = document.createElement("div");
      square.id = "square";
      // square.textContent = "p";
      container.appendChild(square);
    }
  }
};
createBoardElements(playerBoard, playerBoardContainer); // creates player board.
createBoardElements(computerBoard, computerBoardContainer); // creates computer board.

// for (const row of playerBoard) {
//   for (const ele of row) {
//     const square = document.createElement("div");
//     square.id = "square";
//     square.textContent = "h";
//     playerBoardContainer.appendChild(square);
//   }
// }

// for (const row of computerBoard) {
//   for (const ele of row) {
//     const square = document.createElement("div");
//     square.id = "square";
//     square.textContent = "c";
//     computerBoardContainer.appendChild(square);
//   }
// }

// boardsContainer.appendChild(computerBoardContainer);
// boardsContainer.appendChild(playerBoardContainer);

// const allBoards = [playerBoard, computerBoard];
// for (const board of allBoards) {
//   const square = document.createElement("div");
//   square.className = "square";
//   square.textContent = "a";
//   document.body.appendChild(square);
//   for (const row of board) {

//     console.log(row);
//   }
// }

// const board = new GameBoard();
// for (let i = 0; i < board.length; i++) {
//   const square = document.createElement("div");
//   square.className = "square";
//   square.textContent = "a";
//   document.body.appendChild(square);
// }
