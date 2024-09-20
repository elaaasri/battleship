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
const createGameBoardElements = (arr, container) => {
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
          const isShiptValid = humanPlayerGameBoard.isShipCoordsValid(
            currValidCoords,
            this.allPreviousShipCoords
          );
          if (!isShiptValid) return;
          // if all validations passed :
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
    const allComputerShipImages = allPlayerShipImages.map((image) => {
      const clonedImage = image.cloneNode(true);
      clonedImage.className = "computer-ship-image"; // change class name.
      return clonedImage;
    });
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
      this.hideComputerShipImages(); // hides computer images on board.
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
      coords =
        computerPlayerGameBoard.getRandomComputerShipValidCoords(shipLength);
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
  // hides all computer images on board.
  hideComputerShipImages() {
    const allComputerShipImages = document.querySelectorAll(
      ".computer-ship-image"
    );
    [...allComputerShipImages].forEach(
      (image) => (image.style.display = "none")
    );
  },
};

// display place player ships card :
const showPlacingPlayerShipsCard = () => {
  // set styles :
  playersCard.style.display = "none";
  placePlayerShipsCard.style.display = "flex";
};

// checks if all player ships placed :
const isAllPlayerShipsPlaced = () => {
  // get player ship images form parent container :
  const playerShipTypes = document.querySelectorAll(".player-ship-type");
  const allNestedShipImages = [...playerShipTypes].filter((ship) =>
    ship.querySelector("img")
  );
  // checks player ship images length :
  if (!allNestedShipImages.length == 0) {
    alert("Must Place All Player Ships!");
    return false;
  }
  return true;
};

// display battle card :
const showBattleCard = () => {
  // set styles :
  placePlayerShipsCard.style.display = "none";
  battleCard.style.display = "flex";
  playerName.textContent = `${playerOneInput.value.toUpperCase()} WATERS`;
  computerName.textContent = `${playerTwoInput.value.toUpperCase()} WATERS`;
  playerBattleContainer.appendChild(playerBoardContainer); // insert player board.
};

// checks players names validity :
const getPlayersNamesValidation = (playerOneName, playerTwoName) => {
  if (!playerOneName || !playerTwoName) {
    alert("Must Enter Names!");
    return false;
  }
  return true;
};

// play button event :
playButton.addEventListener("click", () => {
  const isPlayersNamesValid = getPlayersNamesValidation(
    playerOneInput.value,
    playerTwoInput.value
  );
  if (!isPlayersNamesValid) return;
  // show player placing card :
  showPlacingPlayerShipsCard();
  // creates player game board :
  createGameBoardElements(humanPlayerGameBoard.board, playerBoardContainer);
  // render player ship types event :
  allPlayerShipImages.map((ship) => {
    ship.addEventListener("click", () => renderPlayerShipTypes.render(ship));
  });
});
// beggin button event :
begginButton.addEventListener("click", () => {
  // checks if player ships are place :
  const isPlayerShipsPlaced = isAllPlayerShipsPlaced();
  console.log(isPlayerShipsPlaced);
  if (!isPlayerShipsPlaced) return;
  // show battle card :
  showBattleCard();
  // creates computer game board :
  createGameBoardElements(
    computerPlayerGameBoard.board,
    computerBoardContainer
  );
  // render computer ships :
  renderComputerShips.render();
  // plays the battle :
  playRound();
  // console.log("human board", humanPlayerGameBoard.board);
  // console.log("computer boad", computerPlayerGameBoard.board);
});

let currPlayer = humanPlayer.getName();
const playRound = () => {
  // attacks enemy board :
  const attackEnemyBoard = (enemyBoardContainer) => {
    [...enemyBoardContainer.children].forEach((square) => {
      square.addEventListener("click", () => handleSquareClick(square));
    });
  };

  // get current coords :
  const getCurrCoords = (currSquare) => {
    return [Number(currSquare.dataset.x), Number(currSquare.dataset.y)];
  };

  // get most left shi head square nested image :
  const getShipHeadSquareImage = (currShip) => {
    const allComputerShipImages = [
      ...document.querySelectorAll(".computer-ship-image"),
    ];
    return [...allComputerShipImages].find(
      (image) => image.id == currShip.shipName
    );
  };

  // hides curr ship hits :
  const hideCurrShipHits = (currShipLength, shipSquareImage) => {
    const currShipNextSiblings = [];
    // get curr ship next siblings :
    for (let i = 0; i < currShipLength; i++) {
      currShipNextSiblings.push(shipSquareImage);
      shipSquareImage = shipSquareImage.nextElementSibling;
    }
    // hides hits style :
    currShipNextSiblings.forEach((square) => {
      square.style.background = "none";
    });
  };

  // manipulate curr clicked square :
  const handleSquareClick = (currSquare) => {
    currSquare.style.pointerEvents = "none";
    const [x, y] = getCurrCoords(currSquare); // gets curr square coords.
    const currShip = computerPlayerGameBoard.getCurrShip(x, y); // checks if curr square is a ship :
    //  stop executing if no ship :
    if (!currShip.isShip) return;
    // triggers battle funcs :
    currSquare.style.background = "red";
    computerPlayerGameBoard.receiveAttack(currShip);
    computerPlayerGameBoard.makeAllCurrShipItemsSunk(currShip);
    if (currShip.isSunk()) {
      const shipHeadSquareImage = getShipHeadSquareImage(currShip);
      hideCurrShipHits(
        currShip.getShipLength(),
        shipHeadSquareImage.parentElement
      );
      shipHeadSquareImage.style.display = "flex";
    }
  };

  // toggle players round :
  if (currPlayer == "human") {
    console.log("attack computer board");
    attackEnemyBoard(computerBoardContainer);
  } else {
    console.log("attack player board");
  }
};
