import Player from "./player";
import GameBoard from "./gameBoard";
import Ship from "./ship";

// dom :
const playButton = document.getElementById("play-button");
const playersCard = document.getElementById("players-card");
const placeShipsCard = document.getElementById("place-ships-card");
const begginButton = document.getElementById("beggin-button");
begginButton.addEventListener("click", function () {
  placeShipsCard.style.display = "none";
});
playButton.addEventListener("click", function () {
  playersCard.style.display = "none";
  placeShipsCard.style.display = "flex";
});
// players game boards :
const playerBoardContainer = document.getElementById("player-game-board");
const computerBoardContainer = document.getElementById(
  "computer-board-container"
);
// assign new players :
const humanPlayer = new Player("human");
const computerPlayer = new Player("computer");
// create player game board elements :
const createPlayerGameBoardElements = (arr, container) => {
  for (const row of arr) {
    for (const ele of row) {
      const square = document.createElement("div");
      const [x, y] = ele.coords;
      square.textContent = [x, y];
      square.setAttribute("data-x", x);
      square.setAttribute("data-y", y);
      square.className = "square";
      container.appendChild(square);
    }
  }
};
createPlayerGameBoardElements(humanPlayer.boardArr, playerBoardContainer);
// get correct ship type coordinates :
const getCorrectShipTypeCoords = (square, shipType) => {
  console.log(square, shipType);
  square.style.background = "red";
  // const square = event.target;
  const squareCoordinates = [
    Number(square.getAttribute("data-x")),
    Number(square.getAttribute("data-y")),
  ];
  const [x, y] = squareCoordinates;
  const carrierShipCoords = [
    [x, y],
    [x, y + 1],
    [x, y + 2],
    [x, y + 3],
    [x, y + 4],
  ];
  carrierShipCoords.map((coord) => {
    const [x, y] = coord;
    humanPlayer.place(x, y, "carrier", 5);
  });
  console.log(humanPlayer.boardArr);
};
const squareLenght = document.querySelector(".square");

const movePlayerShipELements = () => {
  const carrierShip = document.getElementById("carrier-ship");
  const followMouse = (event) => {
    // console.log(event);
    var x = event.clientX;
    var y = event.clientY - carrierShip.height;
    carrierShip.style.left = `${x}px`;
    carrierShip.style.top = `${y}px`;
  };

  const getBoardLimitCoords = (event) => {
    const rightLimitCoords = [
      event.target.getAttribute("data-x"),
      event.target.getAttribute("data-y"),
    ];
    // const [x, y] = rightLimitCoords;
    // humanPlayer.setplayerBoard(x, y);
    // console.log(rightLimitCoords);
  };

  // get correct ship size :
  const getCorrectShipSize = (ship) => {
    ship.style.pointerEvents = "none";
    ship.style.width = `${squareLenght.offsetWidth * 5}px`;
    ship.style.height = `${squareLenght.clientHeight}px`;
    ship.style.cursor = "pointer";
  };

  // place ship on board :
  const placeShipOnBoard = (ship) => {
    [...playerBoardContainer.children].map((square) => {
      square.addEventListener("click", function () {
        console.log(square.textContent);
        square.appendChild(ship);
        ship.style.position = "absolute";
        ship.style.top = "-75%";
        ship.style.left = "0%";
        ship.style.pointerEvents = "none";

        const rightLimitCoords = [
          square.getAttribute("data-x"),
          square.getAttribute("data-y"),
        ];

        const [x, y] = rightLimitCoords;

        document.removeEventListener("mousemove", followMouse);
        getCurrentSquareCoords(x, y);
      });
    });
  };

  const getCurrentSquareCoords = (x, y) => {
    console.log(x, y);
    getUnplaceableBoardCoord(x, y);
  };

  // carrier ship click event :
  carrierShip.addEventListener("click", () => {
    getCorrectShipSize(carrierShip); // get ship size.
    document.addEventListener("mousemove", (event) => {
      followMouse(event); // follow mouse event.
      // getBoardLimitCoords(event);
    });
    placeShipOnBaord(carrierShip); // place ship on boar.
  });
};
movePlayerShipELements();

// playerBoardContainer.addEventListener("mousemove", function (event) {
//   const rect = playerBoardContainer.getBoundingClientRect();

//   console.log(this.getBoundingClientRect());
//   console.log(rect);

//   // const mouseX = event.clientX - rect.left;
//   // const mouseY = event.clientY - rect.top;
// });

// [...playerBoardContainer.children].map((square) => {
//   square.addEventListener("click", () => {
//     console.log(image.width);
//     console.log(image.height);

//     square.appendChild(image);
//     image.style.position = "absolute";
//     image.style.top = "-75%";
//     image.style.left = "-220%";
//     document.removeEventListener("mousemove", followMouse);
//     // image.style.pointerEvents = "none";
//   });
// });

// });

const getPlayerShipTypeEvent = () => {
  const allPlayerShipsTypes = document.querySelectorAll(".player-ship");
  const playerGameBoardSquares = playerBoardContainer.children;
  [...allPlayerShipsTypes].map((ship) =>
    ship.addEventListener(
      "click",
      function () {
        console.log(this);
        // this.style.display = "none";
        const playeShipType = ship.id;
        [...playerGameBoardSquares].map((square) => {
          square.addEventListener("click", () =>
            getCorrectShipTypeCoords(square, playeShipType)
          );
        });
      }
      // { once: true }
    )
  );
};

// getPlayerShipTypeEvent();

// // script.js
// document.addEventListener("DOMContentLoaded", function () {
//   var image = document.getElementById("image");

//   image.addEventListener("click", function () {
//     document.addEventListener("mousemove", followMouse);
//   });
//   const container = document.querySelector(".container");
//   container.addEventListener("click", function () {
//     console.log(image);
//     container.appendChild(image);
//     image.style.position = "absolute";
//     image.style.top = "50%";
//     image.style.left = "50%";
//     image.style.transform = "translate(-50%, -50%)";
//     image.style.width = "200px";
//     document.removeEventListener("mousemove", followMouse);
//   });

//   function followMouse(event) {
//     console.log(event);
//     var x = event.clientX - image.width / 2;
//     var y = event.clientY - image.height / 2;
//     image.style.left = x + "px";
//     image.style.top = y + "px";
//   }
// });

// creates board elements :
// function getCorrectPlayerCoordinates(event) {
//   const square = event.target;
//   const coordinates = [
//     square.getAttribute("data-x"),
//     square.getAttribute("data-y"),
//   ];
//   const [x, y] = coordinates;
//   console.log(humanPlayer.boardArr);
//   return humanPlayer.place(x, y);

// }

// const assignPlayrs =e () => {
//   const humanPlayer = new Player("human");
//   const computerPlayer = new Player("computer");
//   return { humanPlayer, computerPlayer };
// };
// assign players boards :
// const playerBoard = assignPlayers().humanPlayer.boardArr;
// const computerBoard = assignPlayers().computerPlayer.boardArr;

// Fictional Pirate Ships

// N | Class of ship |	Size
//   1 |	Blackbeard's Revenge |   5
//   2 |	Corsair's Fury	 |   4
//   3 |	Tempest Raider	   |   3
//   4 |	Shadow Shark	   |   3
//   5 |	Swift Cutlass  |   2

const typeOfShips = () => {
  const carrierShip = new Ship("Carrier", 5);
  const battleShip = new Ship("Battleship", 4);
  const destroyerShip = new Ship("Destroyer", 3);
  const submarineShip = new Ship("Submarine", 3);
  const patrolBoatShip = new Ship("Patrol Boat", 2);

  console.log(carrierShip);
  console.log(battleShip);
  console.log(destroyerShip);
  console.log(submarineShip);
  console.log(patrolBoatShip);

  return {
    carrierShip,
    battleShip,
    destroyerShip,
    submarineShip,
    patrolBoatShip,
  };
};

// createBoardElements(computerPlayer.boardArr, computerBoardContainer); // creates computer board.
// placing ships :
const placePlayerShips = () => {
  // [...playerBoardContainer.children].map((square) => {
  //   square.addEventListener("click", function () {
  //     humanPlayer.gameBoard.placeShip(0, 1);

  //     console.log(playerBoardContainer);

  //     const playerBoard = humanPlayer.gameBoard.board;
  //     console.log(playerBoard);
  //     console.log(playerBoardContainer[0]);

  //     square.style.backgroundColor = "red";
  //     square.previousElementSibling.style.backgroundColor = "red";
  //     square.nextSibling.style.backgroundColor = "red";
  //     square.nextSibling.nextSibling.style.backgroundColor = "red";
  //   });
  // });
  const playergameBoardSquares = playerBoardContainer.children;
  for (let i = 0; i < playergameBoardSquares.length; i++) {
    playergameBoardSquares[i].addEventListener("click", function () {
      console.log(this);

      // if (i == 0) {
      //   console.log("target", playergameBoardSquares[i]);
      // }
    });
  }
};
// placePlayerShips();

// toggle player rounds :
const togglePlayer = (currentPlayer) => {
  console.log(currentPlayer);
  if (currentPlayer == "human") {
    placePlayerShips();
    // attack(computerBoardContainer, currentPlayer);
    currentPlayer = "computer";
  } else {
    // attack(playerBoardContainer);
  }
  console.log("###".repeat(20));
};
// togglePlayer(humanPlayer.getName());

//   N | Class of ship |	Size
//   1 |	Carrier	     |   5
//   2 |	Battleship	 |   4
//   3 |	Destroyer	   |   3
//   4 |	Submarine	   |   3
//   5 |	Patrol Boat  |   2
// Fictional Pirate Ships

// N | Class of ship |	Size
//   1 |	Blackbeard's Revenge |   5
//   2 |	Corsair's Fury	 |   4
//   3 |	Tempest Raider	   |   3
//   4 |	Shadow Shark	   |   3
//   5 |	Swift Cutlass  |   2

// prev solution :
// import Player from "./player";
// import GameBoard from "./gameBoard";
// import Ship from "./ship";

// // dom :
// const playButton = document.getElementById("play-button");
// const playersCard = document.getElementById("players-card");
// const placeShipsCard = document.getElementById("place-ships-card");
// const begginButton = document.getElementById("beggin-button");
// begginButton.addEventListener("click", function () {
//   placeShipsCard.style.display = "none";
// });
// playButton.addEventListener("click", function () {
//   playersCard.style.display = "none";
//   placeShipsCard.style.display = "flex";
// });
// // players game boards :
// const playerBoardContainer = document.getElementById("player-game-board");
// const computerBoardContainer = document.getElementById(
//   "computer-board-container"
// );
// // assign new players :
// const humanPlayer = new Player("human");
// const computerPlayer = new Player("computer");
// // create player game board elements :
// const createPlayerGameBoardElements = (arr, container) => {
//   for (const row of arr) {
//     for (const ele of row) {
//       const square = document.createElement("div");
//       const [x, y] = ele.coords;
//       square.setAttribute("data-x", x);
//       square.setAttribute("data-y", y);
//       square.className = "square";
//       container.appendChild(square);
//     }
//   }
// };
// createPlayerGameBoardElements(humanPlayer.boardArr, playerBoardContainer);
// // get correct ship type coordinates :
// const getCorrectShipTypeCoords = (square, shipType) => {
//   console.log(square, shipType);
//   square.style.background = "red";
//   // const square = event.target;
//   const squareCoordinates = [
//     Number(square.getAttribute("data-x")),
//     Number(square.getAttribute("data-y")),
//   ];
//   const [x, y] = squareCoordinates;
//   const carrierShipCoords = [
//     [x, y],
//     [x, y + 1],
//     [x, y + 2],
//     [x, y + 3],
//     [x, y + 4],
//   ];
//   carrierShipCoords.map((coord) => {
//     const [x, y] = coord;
//     humanPlayer.place(x, y, "carrier", 5);
//   });
//   console.log(humanPlayer.boardArr);
// };
// // document.addEventListener("DOMContentLoaded", function () {
// const image = document.getElementById("carrier-ship");
// const squareLenght = document.querySelector(".square");
// image.addEventListener("click", function () {
//   image.style.pointerEvents = "none";
//   image.style.width = `${squareLenght.offsetWidth * 5}px`;
//   image.style.height = `${squareLenght.clientHeight}px`;
//   image.style.cursor = "pointer";
//   document.addEventListener("mousemove", followMouse);
// });

// playerBoardContainer.addEventListener("mousemove", function (event) {
//   const rect = playerBoardContainer.getBoundingClientRect();

//   console.log(this.getBoundingClientRect());
//   console.log(rect);

//   // const mouseX = event.clientX - rect.left;
//   // const mouseY = event.clientY - rect.top;
// });

// [...playerBoardContainer.children].map((square) => {
//   square.addEventListener("click", () => {
//     console.log(image.width);
//     console.log(image.height);

//     square.appendChild(image);
//     image.style.position = "absolute";
//     image.style.top = "-75%";
//     image.style.left = "-220%";
//     document.removeEventListener("mousemove", followMouse);
//     // image.style.pointerEvents = "none";
//   });
// });

// function followMouse(event) {
//   var x = event.clientX - image.width / 2;
//   var y = event.clientY - image.height;
//   image.style.left = `${x}px`;
//   image.style.top = `${y}px`;
// }

// // });

// const getPlayerShipTypeEvent = () => {
//   const allPlayerShipsTypes = document.querySelectorAll(".player-ship");
//   const playerGameBoardSquares = playerBoardContainer.children;
//   [...allPlayerShipsTypes].map((ship) =>
//     ship.addEventListener(
//       "click",
//       function () {
//         console.log(this);
//         // this.style.display = "none";
//         const playeShipType = ship.id;
//         [...playerGameBoardSquares].map((square) => {
//           square.addEventListener("click", () =>
//             getCorrectShipTypeCoords(square, playeShipType)
//           );
//         });
//       }
//       // { once: true }
//     )
//   );
// };
// // getPlayerShipTypeEvent();

// // // script.js
// // document.addEventListener("DOMContentLoaded", function () {
// //   var image = document.getElementById("image");

// //   image.addEventListener("click", function () {
// //     document.addEventListener("mousemove", followMouse);
// //   });
// //   const container = document.querySelector(".container");
// //   container.addEventListener("click", function () {
// //     console.log(image);
// //     container.appendChild(image);
// //     image.style.position = "absolute";
// //     image.style.top = "50%";
// //     image.style.left = "50%";
// //     image.style.transform = "translate(-50%, -50%)";
// //     image.style.width = "200px";
// //     document.removeEventListener("mousemove", followMouse);
// //   });

// //   function followMouse(event) {
// //     console.log(event);
// //     var x = event.clientX - image.width / 2;
// //     var y = event.clientY - image.height / 2;
// //     image.style.left = x + "px";
// //     image.style.top = y + "px";
// //   }
// // });

// // creates board elements :
// // function getCorrectPlayerCoordinates(event) {
// //   const square = event.target;
// //   const coordinates = [
// //     square.getAttribute("data-x"),
// //     square.getAttribute("data-y"),
// //   ];
// //   const [x, y] = coordinates;
// //   console.log(humanPlayer.boardArr);
// //   return humanPlayer.place(x, y);

// // }

// // const assignPlayrs =e () => {
// //   const humanPlayer = new Player("human");
// //   const computerPlayer = new Player("computer");
// //   return { humanPlayer, computerPlayer };
// // };
// // assign players boards :
// // const playerBoard = assignPlayers().humanPlayer.boardArr;
// // const computerBoard = assignPlayers().computerPlayer.boardArr;

// // Fictional Pirate Ships

// // N | Class of ship |	Size
// //   1 |	Blackbeard's Revenge |   5
// //   2 |	Corsair's Fury	 |   4
// //   3 |	Tempest Raider	   |   3
// //   4 |	Shadow Shark	   |   3
// //   5 |	Swift Cutlass  |   2

// const typeOfShips = () => {
//   const carrierShip = new Ship("Carrier", 5);
//   const battleShip = new Ship("Battleship", 4);
//   const destroyerShip = new Ship("Destroyer", 3);
//   const submarineShip = new Ship("Submarine", 3);
//   const patrolBoatShip = new Ship("Patrol Boat", 2);

//   console.log(carrierShip);
//   console.log(battleShip);
//   console.log(destroyerShip);
//   console.log(submarineShip);
//   console.log(patrolBoatShip);

//   return {
//     carrierShip,
//     battleShip,
//     destroyerShip,
//     submarineShip,
//     patrolBoatShip,
//   };
// };

// // createBoardElements(computerPlayer.boardArr, computerBoardContainer); // creates computer board.
// // placing ships :
// const placePlayerShips = () => {
//   // [...playerBoardContainer.children].map((square) => {
//   //   square.addEventListener("click", function () {
//   //     humanPlayer.gameBoard.placeShip(0, 1);

//   //     console.log(playerBoardContainer);

//   //     const playerBoard = humanPlayer.gameBoard.board;
//   //     console.log(playerBoard);
//   //     console.log(playerBoardContainer[0]);

//   //     square.style.backgroundColor = "red";
//   //     square.previousElementSibling.style.backgroundColor = "red";
//   //     square.nextSibling.style.backgroundColor = "red";
//   //     square.nextSibling.nextSibling.style.backgroundColor = "red";
//   //   });
//   // });
//   const playergameBoardSquares = playerBoardContainer.children;
//   for (let i = 0; i < playergameBoardSquares.length; i++) {
//     playergameBoardSquares[i].addEventListener("click", function () {
//       console.log(this);

//       // if (i == 0) {
//       //   console.log("target", playergameBoardSquares[i]);
//       // }
//     });
//   }
// };
// // placePlayerShips();

// // toggle player rounds :
// const togglePlayer = (currentPlayer) => {
//   console.log(currentPlayer);
//   if (currentPlayer == "human") {
//     placePlayerShips();
//     // attack(computerBoardContainer, currentPlayer);
//     currentPlayer = "computer";
//   } else {
//     // attack(playerBoardContainer);
//   }
//   console.log("###".repeat(20));
// };
// // togglePlayer(humanPlayer.getName());

// //   N | Class of ship |	Size
// //   1 |	Carrier	     |   5
// //   2 |	Battleship	 |   4
// //   3 |	Destroyer	   |   3
// //   4 |	Submarine	   |   3
// //   5 |	Patrol Boat  |   2
// // Fictional Pirate Ships

// // N | Class of ship |	Size
// //   1 |	Blackbeard's Revenge |   5
// //   2 |	Corsair's Fury	 |   4
// //   3 |	Tempest Raider	   |   3
// //   4 |	Shadow Shark	   |   3
// //   5 |	Swift Cutlass  |   2

// solution :

// const squareLenght = document.querySelector(".square");

// const movePlayerShipELements = () => {
//   const carrierShip = document.getElementById("carrier-ship");
//   const followMouse = (event) => {
//     var x = event.clientX - carrierShip.width / 2;
//     var y = event.clientY - carrierShip.height;
//     carrierShip.style.left = `${x}px`;
//     carrierShip.style.top = `${y}px`;

//     console.log(event.target);

//     console.log(this);
//   };
//   // get correct ship size :
//   const getCorrectShipSize = (ship) => {
//     ship.style.pointerEvents = "none";
//     ship.style.width = `${squareLenght.offsetWidth * 5}px`;
//     ship.style.height = `${squareLenght.clientHeight}px`;
//     ship.style.cursor = "pointer";
//   };
//   // place ship on board :
//   const placeShipOnBoard = (ship) => {
//     [...playerBoardContainer.children].map((square) => {
//       square.addEventListener("click", function () {
//         square.appendChild(ship);
//         ship.style.position = "absolute";
//         ship.style.top = "-75%";
//         ship.style.left = "-220%";
//         ship.style.pointerEvents = "none";
//         document.removeEventListener("mousemove", followMouse);
//       });
//     });
//   };
//   // carrier ship click event :
//   carrierShip.addEventListener("click", () => {
//     getCorrectShipSize(carrierShip); // get ship size.
//     document.addEventListener("mousemove", followMouse); // follow mouse event.
//     placeShipOnBoard(carrierShip); // place ship on boar.
//   });
// };
// movePlayerShipELements();
