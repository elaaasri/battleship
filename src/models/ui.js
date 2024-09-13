import Player from "./player";
// import Ship from "./ship";
// import GameBoard from "./gameBoard";

// dom elements :
const playerBoardContainer = document.getElementById("player-game-board");
const computerBoardContainer = document.getElementById("computer-game-board");
const allPlayerShipImages = [
  ...document.querySelectorAll(".player-ship-image"),
];
const playButton = document.getElementById("play-button");
const playersCard = document.getElementById("players-card");
const playerOneInput = document.getElementById("player-one-input");
const playerTwoInput = document.getElementById("player-two-input");
const playerBattleContainer = document.getElementById(
  "player-battle-container"
);
const begginButton = document.getElementById("beggin-button");
const placePlayerShipsCard = document.getElementById("place-player-ships-card");
const battleCard = document.getElementById("battle-card");
const playerName = document.getElementById("player-name");
const computerName = document.getElementById("computer-name");

// assign new players :
const humanPlayer = new Player("human"); // player obj.
const humanPlayerGameBoard = humanPlayer.gameBoard; // player game board.
const computerPlayer = new Player("computer"); // computer obj.
const computerPlayerGameBoard = computerPlayer.gameBoard; // computer game board.

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

// human player dom obj :
const renderPlayerShipTypes = {
  allPreviousShipCoords: [],
  // display ship type elements :
  render(shipImage) {
    shipImage.style.pointerEvents = "none";
    const currShipObj = humanPlayer.createShipType(shipImage.id);
    const currShipName = currShipObj.getShipName();
    const currShipLength = currShipObj.getShipLength();
    this.resizePlayerShipImage(shipImage, currShipLength); // resize ship image.
    const handleMouseEvent = (mouseEvent) =>
      this.followMouse(shipImage, mouseEvent); // handle follow mouse function.
    document.addEventListener("mousemove", handleMouseEvent); // mouse move event.
    this.makeCurrShipUnclickable(shipImage); // make curr ship unclickable.
    // handle clicked square event.
    this.handlePlayerSquareEvent(
      shipImage,
      handleMouseEvent,
      currShipName,
      currShipLength
    );
  },
  // resize player ship image to fit the board squares :
  resizePlayerShipImage(ship, shipSize) {
    const square = document.querySelector(".square");
    ship.style.width = `${square.offsetWidth * shipSize}px`;
    ship.style.height = `${square.offsetHeight}px`;
  },
  // makes the image follows the mouse pointer :
  followMouse(ship, event) {
    const x = event.clientX;
    const y = event.clientY - ship.height / 2;
    ship.style.left = `${x}px`;
    ship.style.top = `${y}px`;
  },
  //  make curr ship unclickable :
  makeCurrShipUnclickable(currShipElement) {
    const shipIndex = allPlayerShipImages.indexOf(currShipElement);
    allPlayerShipImages[shipIndex].style.pointerEvents = "none";
  },
  // handle player square click event :
  handlePlayerSquareEvent(shipImage, handleMouse, shipName, shipLength) {
    const playerSquares = [...playerBoardContainer.children]; // player squares.
    let shipGotPlaced = false;
    // player square click event :
    playerSquares.map((square) =>
      square.addEventListener("click", () => {
        if (!shipGotPlaced) {
          const currValidCoords = humanPlayerGameBoard.getPlayerCurrValidCoords(
            square,
            shipLength
          );
          if (!currValidCoords) return;
          const isShiptValid = humanPlayerGameBoard.isShiptCoordsValid(
            currValidCoords,
            this.allPreviousShipCoords
          );
          if (!isShiptValid) return;
          document.removeEventListener("mousemove", handleMouse);
          this.allPreviousShipCoords.push(currValidCoords);
          this.placeShipOnBoard(square, shipImage);
          humanPlayer.setShipPositionOnBoard(
            currValidCoords,
            shipName,
            shipLength
          );
          shipGotPlaced = true;
        }
      })
    );
  },
  // place ship element on board :
  placeShipOnBoard(currentSquare, ship) {
    ship.style.position = "absolute";
    ship.style.top = "-75%";
    ship.style.left = "0%";
    ship.style.pointerEvents = "none";
    currentSquare.appendChild(ship);
  },
};
// player ship types click event :
// allPlayerShipImages.map((ship) => {
//   ship.addEventListener("click", () => renderPlayerShipTypes.render(ship));
// });

// computer player dom obj :
const renderComputerShips = {
  render() {
    const allComputerShipsArr = this.getComputerShipTypes();
    this.placeComputerShips(allComputerShipsArr);
  },
  // get all computer ship types :
  getComputerShipTypes() {
    // clone ship images :
    const allComputerShipImages = allPlayerShipImages.map((image) =>
      image.cloneNode(true)
    );
    // all computer ship types :
    const allShipTypesArr = [
      ["carrier-ship", 5, allComputerShipImages[0]],
      ["battle-ship", 4, allComputerShipImages[1]],
      ["cruiser-ship", 3, allComputerShipImages[2]],
      ["submarine-ship", 3, allComputerShipImages[3]],
      ["destroyer-ship", 2, allComputerShipImages[4]],
    ];
    return allShipTypesArr;
  },
  placeComputerShips(computerShipTypes) {
    computerShipTypes.map(([shipName, shipLength, shipImage]) => {
      let computerValidCoords = this.getValidCoords(shipLength);
      // place ship on board :
      this.placeComputerShipsOnBoard(
        computerValidCoords[0],
        shipImage,
        shipLength
      );
      // sets ship position on board :
      computerPlayer.setShipPositionOnBoard(
        computerValidCoords,
        shipName,
        shipLength
      );
      // zbe(computerValidCoords);
    });
  },
  getValidCoords(shipLength) {
    let coords = null;
    while (!coords) {
      coords = computerPlayerGameBoard.getComputerShipValidCoords(shipLength);
    }
    return coords;
  },
  // place computer ships on board :
  placeComputerShipsOnBoard(validCoord, shipImage, shipLength) {
    renderPlayerShipTypes.resizePlayerShipImage(shipImage, shipLength);
    const [x, y] = validCoord;
    const targetSquare = [...computerBoardContainer.children].find(
      (square) => +square.dataset.x == x && +square.dataset.y == y
    );
    renderPlayerShipTypes.placeShipOnBoard(targetSquare, shipImage);
  },
};

// display place player ships card :
function showPlacingPlayerShipsCard() {
  // players name required :
  if (playerOneInput.value == "" || playerTwoInput.value == "") {
    alert("Must Enter Names!");
    return;
  }
  // set styles :
  playersCard.style.display = "none";
  placePlayerShipsCard.style.display = "flex";

  // creates player game board :
  // createPlayerGameBoardElements(
  //   humanPlayerGameBoard.board,
  //   playerBoardContainer
  // );
}

// checks if all player ships placed :
function isAllPlayerShipsPlaced() {
  const playerShipTypes = document.querySelectorAll(".player-ship-type");
  const allNestedShipImages = [...playerShipTypes].filter((ship) =>
    ship.querySelector("img")
  );
  return allNestedShipImages.length == 0;
}

// display battle card :
function showBattleCard() {
  // checks if player ships are place :
  const isPlayerShipsPlaced = isAllPlayerShipsPlaced();
  if (!isPlayerShipsPlaced) {
    alert("Must Place All Player Ships!");
    return;
  }
  // set styles :
  placePlayerShipsCard.style.display = "none";
  battleCard.style.display = "flex";
  playerName.textContent = `${playerOneInput.value.toUpperCase()} WATERS`;
  computerName.textContent = `${playerTwoInput.value.toUpperCase()} WATERS`;
  playerBattleContainer.appendChild(playerBoardContainer); // insert player board.
  // creates computer game board :
  // createPlayerGameBoardElements(
  //   computerPlayerGameBoard.board,
  //   computerBoardContainer
  // );
  // render computer ships :
  // renderComputerShips.render();
  // console.log("human board", humanPlayerGameBoard.board);
  // console.log("computer boad", computerPlayerGameBoard.board);
}
createPlayerGameBoardElements(
  computerPlayerGameBoard.board,
  computerBoardContainer
);
createPlayerGameBoardElements(humanPlayerGameBoard.board, playerBoardContainer);

// renderPlayerShipTypes.render(ship);
// allPlayerShipImages.map((ship) => {
//   renderPlayerShipTypes.render(ship);
// });

renderComputerShips.render();

// play button event :
playButton.addEventListener("click", showPlacingPlayerShipsCard);
// beggin button event :
begginButton.addEventListener("click", showBattleCard);

// attacks computer game board :
function attackComputerBoard() {
  [...computerBoardContainer.children].map((square) => {
    square.addEventListener("click", () => {
      square.style.pointerEvents = "none";
      const coords = [Number(square.dataset.x), Number(square.dataset.y)];
      const [x, y] = coords;
      const isCurrSquareShip = computerPlayerGameBoard.isSquareShip(x, y);
      if (isCurrSquareShip) {
        square.style.background = "red";
        const currComputerShip = computerPlayerGameBoard.getWholeShip(x, y);
        currComputerShip.hit();
        // console.log(currComputerShip.);
        // computerPlayerGameBoard.receiveAttack(x, y);
      }
    });
  });
}
attackComputerBoard();
