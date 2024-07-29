import Player from "./player";
import Ship from "./ship";
// import GameBoard from "./gameBoard";
// import Ship from "./ship";

// dom elements :
const playerBoardContainer = document.getElementById("player-game-board");
const allPlayerShipImages = [
  ...document.querySelectorAll(".player-ship-image"),
];
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
// setup player ship types dom obj :
const dislayPlayerShipTypes = {
  // display ship type elements :
  render(ship) {
    const shipSize = this.getShipSize(ship); // get ship size.
    this.resizePlayerShipImage(ship, shipSize); // resize player ship image.
    const handleMouseEvent = (mouseEvent) => this.followMouse(ship, mouseEvent);
    document.addEventListener("mousemove", handleMouseEvent);
    this.makeOtherShipsUnclickable(ship);
    this.placeShipOnBoard(ship, handleMouseEvent);
  },
  // place ship on board :
  placeShipOnBoard(ship, handleMouse) {
    const playerSquares = [...playerBoardContainer.children];
    let shipGotPlaced = false;
    const placeShipOnSquare = (currentSquare) => {
      if (!shipGotPlaced) {
        currentSquare.style.background = "red";
        ship.style.position = "absolute";
        ship.style.top = "-75%";
        ship.style.left = "0%";
        ship.style.pointerEvents = "none";
        currentSquare.appendChild(ship);
        shipGotPlaced = true;
      }
    };
    // square event :
    playerSquares.map((square) =>
      square.addEventListener("click", () => {
        placeShipOnSquare(square);
        document.removeEventListener("mousemove", handleMouse);
        this.makeOtherShipsClickable();
      })
    );
  },
  // get ship size :
  getShipSize(ship) {
    const shipName = ship.id;
    switch (shipName) {
      case "carrier-ship":
        return 5;
      case "battle-ship":
        return 4;
      case "cruiser-ship":
      case "submarine-ship":
        return 3;
      case "destroyer-ship":
        return 2;
    }
  },
  // resize player ship image :
  resizePlayerShipImage(ship, shipSize) {
    const square = document.querySelector(".square");
    ship.style.width = `${square.offsetWidth * shipSize}px`;
    ship.style.height = `${square.offsetHeight}px`;
    ship.style.cursor = "pointer";
  },
  // makes the image follows the mouse pointer :
  followMouse(ship, event) {
    const x = event.clientX;
    const y = event.clientY - ship.height / 2;
    ship.style.left = `${x}px`;
    ship.style.top = `${y}px`;
  },
  // make other ships unclickable :
  makeOtherShipsUnclickable(currentShip) {
    allPlayerShipImages.map((ship) => {
      if (ship != currentShip) {
        ship.style.pointerEvents = "none";
      }
    });
  },
  // make other ships clickable :
  makeOtherShipsClickable() {
    allPlayerShipImages.map((ship) => {
      ship.style.pointerEvents = "auto";
    });
  },
};
// player ship types (images) event :
allPlayerShipImages.map((ship) => {
  ship.addEventListener("click", () => {
    dislayPlayerShipTypes.render(ship);
  });
});

/////////////////////
/////////////////////
/////////////////////
/////////////////////

// move player ship elements :
// const movePlayerShipELements = () => {
//   const getClickedShip = () => {
//     const allShipTypes = document.querySelectorAll(".player-ship-type");
//     [...allShipTypes].map((ship) =>
//       ship.addEventListener("click", function () {
//         return ship;
//       })
//     );
//   };
//   console.log(selectedShip);

//   console.log(clickedShip);
//   const carrierShip = document.getElementById("carrier-ship");
//   const followMouse = (event) => {
//     // console.log(event);
//     var x = event.clientX;
//     var y = event.clientY - carrierShip.height;
//     carrierShip.style.left = `${x}px`;
//     carrierShip.style.top = `${y}px`;
//   };
//   const getBoardLimitCoords = (event) => {
//     const rightLimitCoords = [
//       event.target.getAttribute("data-x"),
//       event.target.getAttribute("data-y"),
//     ];
//     // const [x, y] = rightLimitCoords;
//     // humanPlayer.setplayerBoard(x, y);
//     // console.log(rightLimitCoords);
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
//         console.log(square.textContent);
//         square.appendChild(ship);
//         ship.style.position = "absolute";
//         ship.style.top = "-75%";
//         ship.style.left = "0%";
//         ship.style.pointerEvents = "none";
//         document.removeEventListener("mousemove", () => followMouse);
//       });
//     });
//   };
//   const getCurrentSquareCoords = (x, y) => {
//     console.log(x, y);
//     getUnplaceableBoardCoord(x, y);
//   };
//   // carrier ship click event :
//   carrierShip.addEventListener("click", () => {
//     getCorrectShipSize(carrierShip); // get ship size.
//     document.addEventListener("mousemove", (event) => {
//       followMouse(event); // follow mouse event.
//       // getBoardLimitCoords(event);
//     });
//     placeShipOnBaord(carrierShip); // place ship on boar.
//   });
// };

// place ship on board :
// function placeShipOnBoard(ship) {
//   const playerBoardSquares = Array.from(playerBoardContainer.children);
//   [...playerBoardContainer.children].map((square) => {
//     square.addEventListener("click", function () {
//       square.appendChild(ship);
//       ship.style.position = "absolute";
//       ship.style.top = "-75%";
//       ship.style.left = "0%";
//       console.log("triggered");
//     });
//     document.removeEventListener("mousemove", followMouse);
//   });
//   // document.removeEventListener("mousemove", followMouse);
// }

// get ship name :
const getSelectedPlayerShipElement = (ship) => {
  const followMouse = (event) => {
    var x = event.clientX;
    var y = event.clientY - carrierShip.height;
    carrierShip.style.left = `${x}px`;
    carrierShip.style.top = `${y}px`;
  };
  // const squareLenght = document.querySelector(".square");

  // get correct ship size :
  const getCorrectShipSize = (ship) => {
    ship.style.pointerEvents = "none";
    ship.style.width = `${squareLenght.offsetWidth * 5}px`;
    ship.style.height = `${squareLenght.clientHeight}px`;
    ship.style.cursor = "pointer";
  };

  // let selectedShip = null;
  // switch (shipName) {
  //   case "carrier-ship":
  //     selectedShip = new Ship(shipName, 5);
  //     break;
  //   case "battle-ship":
  //     selectedShip = new Ship(shipName, 4);
  //     break;
  //   case "cruiser-ship":
  //     selectedShip = new Ship(shipName, 3);
  //     break;
  //   case "submarine-ship":
  //     selectedShip = new Ship(shipName, 3);
  //     break;
  //   case "destroyer-ship":
  //     selectedShip = new Ship(shipName, 2);
  //     break;
  // }

  // console.log(selectedShip);
};
// // get correct ship size :
// const getCorrectShipSize = (ship) => {
//   const squareLenght = document.querySelector(".square");
//   ship.style.pointerEvents = "none";
//   ship.style.width = `${squareLenght.offsetWidth * 5}px`;
//   ship.style.height = `${squareLenght.clientHeight}px`;
//   ship.style.cursor = "pointer";
// };
//
// const followMouse = (ship, event) => {
//   var x = event.clientX;
//   var y = event.clientY - ship.height / 2;
//   ship.style.left = `${x}px`;
//   ship.style.top = `${y}px`;
// };
// // dislabe other shis images :
// const disableOtherShips = (shipsArr, currentShip) => {
//   shipsArr.map((ship) => {
//     if (ship != currentShip) {
//       ship.style.pointerEvents = "none";
//     }
//   });
// };
// const enableOtherShips = () => {
//   const allShipTypes = document.querySelectorAll(".player-ship");
//   const allShipTypesArr = Array.from(allShipTypes);
//   allShipTypesArr.map((ship) => {
//     ship.style.pointerEvents = "auto";
//   });
// };
// // disable squares :
// const disableOtherSquares = (squaresArr, targetSquare) => {
//   squaresArr.map((square) => {
//     if (square !== targetSquare) {
//       square.style.pointerEvents = "none";
//     }
//   });
// };
// // enable squares :
// const enableOtherSquares = () => {
//   const playerSquares = [...playerBoardContainer.children];
//   playerSquares.map((square) => {
//     square.style.pointerEvents = "auto";
//   });
// };

// // place ship on board :
// const placeShipOnBoard = (ship, handleMouse) => {
//   const playerSquares = [...playerBoardContainer.children];
//   playerSquares.map((square) => {
//     square.addEventListener("click", function (event) {
//       console.log(square, ship);
//       square.appendChild(ship);
//       ship.style.position = "absolute";
//       ship.style.top = "-75%";
//       ship.style.left = "0%";
//       ship.style.pointerEvents = "none";
//       document.removeEventListener("mousemove", handleMouse);
//       enableOtherShips();
//       disableOtherSquares(playerSquares, square);
//     });
//   });
// };
