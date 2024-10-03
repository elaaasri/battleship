import Player from "./player";
// import Ship from "./ship";
// import GameBoard from "./gameBoard";

// dom elements :
const playerBoardElement = document.getElementById("player-game-board");
const computerBoardElement = document.getElementById("computer-game-board");
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
const humanPlayer = new Player("humanPlayer"); // player obj.
const humanGameBoardObject = humanPlayer.getPlayerBoard(); // player game board.
const humanGameBoardObjectName = humanGameBoardObject.getBoardName();

// console.log(humanPlayer);
// console.log(humanGameBoardObject);
// console.log(humanGameBoardObjectName);
//
const computerPlayer = new Player("computerPlayer"); // computer obj.
const computerGameBoardObject = computerPlayer.getPlayerBoard(); // computer game board.
const computerGameBoardObjectName = computerGameBoardObject.getBoardName();

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
    const playerSquares = [...playerBoardElement.children]; // player squares.
    let shipGotPlaced = false;
    // player square click event :
    playerSquares.map((square) =>
      square.addEventListener("click", () => {
        if (!shipGotPlaced) {
          const currValidCoords = humanGameBoardObject.getPlayerCurrValidCoords(
            square,
            shipLength
          );
          if (!currValidCoords) return;
          const isShiptValid = humanGameBoardObject.isShipCoordsValid(
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
    });
  },
  getValidCoords(shipLength) {
    let coords = null;
    while (!coords) {
      coords =
        computerGameBoardObject.getRandomComputerShipValidCoord(shipLength);
    }
    return coords;
  },
  // place computer ships on board :
  placeComputerShipsOnBoard(validCoord, shipImage, shipLength) {
    renderPlayerShipTypes.resizePlayerShipImage(shipImage, shipLength);
    const [x, y] = validCoord;
    const targetSquare = [...computerBoardElement.children].find(
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
  playerBattleContainer.appendChild(playerBoardElement); // insert player board.
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
  // createGameBoardElements(humanGameBoardObject.board, playerBoardElement);
  // // render player ship types event :
  // allPlayerShipImages.map((ship) => {
  //   ship.addEventListener("click", () => renderPlayerShipTypes.render(ship));
  // });
  // triggers battle funcs :
});

// beggin button event :
begginButton.addEventListener("click", () => {
  // checks if player ships are place :
  const isPlayerShipsPlaced = isAllPlayerShipsPlaced();
  if (!isPlayerShipsPlaced) return;
  // show battle card :
  showBattleCard();
  // creates computer game board :
  createGameBoardElements(computerGameBoardObject.board, computerBoardElement);
  // render computer ships :
  renderComputerShips.render();
  // starts the battle :
  startBattle.togglePlayers(humanPlayer.getName());
});

const startBattle = {
  // toggles players rounds :
  togglePlayers(currentPlayer) {
    // playerBoardElement.style.pointerEvents = "none";
    // computerBoardElement.style.pointerEvents = "none";
    this.disablePlayersBoardContainers(); // fix problem.
    // toggle players round :
    if (currentPlayer == humanPlayer.getName()) {
      this.attackComputerPlayer(computerBoardElement, computerGameBoardObject);
    } else if (currentPlayer == computerPlayer.getName()) {
      this.attackHumanPlayer(playerBoardElement, humanGameBoardObject);
    }
  },
  // attack computer player :
  attackComputerPlayer(boardElement, boardObject) {
    boardElement.style.pointerEvents = "auto";
    boardElement.style.cursor = "pointer";
    // board element event :
    [...boardElement.children].forEach((square) => {
      // fixes event listener duplication.
      const newSquare = square.cloneNode(true);
      square.replaceWith(newSquare);
      newSquare.addEventListener("click", () => {
        console.log("#".repeat(20));
        newSquare.style.pointerEvents = "none";
        const currCoords = this.getCurrCoords(newSquare); // gets curr square coords.
        const [x, y] = currCoords;
        const currShip = boardObject.getCurrShip(x, y); // checks if curr square is a ship :
        // stop executing if no ship :
        if (!currShip.isShip) {
          newSquare.style.background = "white";
          this.togglePlayers(computerPlayer.getName());
          return;
        }
        // triggers battle funcs :
        newSquare.style.background = "red";
        boardObject.receiveAttack(currShip);
        console.log("player ship", currShip, currShip.isShip, boardObject);
        if (currShip.isSunk()) {
          const currShipImage = this.getComputerSunkShipImage(currShip);
          console.log(currShipImage);
          this.hideCurrShipHits(
            currShip.getShipLength(),
            currShipImage.parentElement
          );
          currShipImage.style.display = "flex";
        }
        const isAllShipsSunk = boardObject.isAllShipsSunk();
        if (isAllShipsSunk) {
          this.disablePlayersBoardContainers();
          alert("human player wons");
        }
      });
    });
  },
  // attack human player :
  attackHumanPlayer(boardElement, boardObject) {
    boardElement.style.pointerEvents = "auto";
    boardElement.style.cursor = "pointer";
    // get random player valid coord :
    const randomPlayerValidCoord = boardObject.getRandomPlayerValidCoord();
    // console.log("random", randomPlayerValidCoord);
    const [x, y] = randomPlayerValidCoord;
    // get the current square element :
    const currSquare = this.getCurrSquareElement(boardElement, x, y);
    currSquare.style.pointerEvents = "none";
    // get current ship object :
    const currShip = boardObject.getCurrShip(x, y);
    // currSquare.style.background = currShip.isShip ? "red" : "blue";
    if (!currShip.isShip) {
      currSquare.style.background = "white";
      this.togglePlayers(humanPlayer.getName());
      return;
    }
    // triggers battle funcs :
    currSquare.style.background = "red";
    boardObject.receiveAttack(currShip);
    if (currShip.isSunk()) {
      const currShipImage = this.getHumanSunkShipImage(currShip);
      this.hideCurrShipHits(
        currShip.getShipLength(),
        currShipImage.parentElement
      );
      currShipImage.style.display = "flex";
    }
    this.togglePlayers(computerPlayer.getName()); // attack player again if its a ship.
    // checks if all ships are sunk :
    const isAllShipsSunk = boardObject.isAllShipsSunk();
    if (isAllShipsSunk) {
      this.disablePlayersBoardContainers();
      alert("computer wons");
    }
  },
  // get the current square element :
  getCurrSquareElement(boardElement, x, y) {
    return [...boardElement.children].find(
      (square) => +square.dataset.x == x && +square.dataset.y == y
    );
  },
  // get current coords :
  getCurrCoords(currSquare) {
    return [Number(currSquare.dataset.x), Number(currSquare.dataset.y)];
  },
  // get most left shi head square nested image :
  getComputerSunkShipImage(currShip) {
    const allComputerShipImages = [
      ...document.querySelectorAll(".computer-ship-image"),
    ];
    return [...allComputerShipImages].find(
      (image) => image.id == currShip.shipName
    );
  },
  getHumanSunkShipImage(currShip) {
    return [...allPlayerShipImages].find(
      (image) => image.id == currShip.shipName
    );
  },
  // hides curr ship hits :
  hideCurrShipHits(currShipLength, shipSquareImage) {
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
  },
  // func to stop the game :
  disablePlayersBoardContainers() {
    playerBoardElement.style.pointerEvents = "none";
    computerBoardElement.style.pointerEvents = "none";
  },
};

createGameBoardElements(humanGameBoardObject.board, playerBoardElement);
// render player ship types event :
allPlayerShipImages.map((ship) => {
  ship.addEventListener("click", renderPlayerShipTypes.render(ship));
});

// const declareWinner = (playerName) => {
//   console.log("the winner is :", playerName);
// };

// fix allCoords array in getRandomComputerShipValidCoord.
// clean the condiotions in handlePlayerSquareEvent in renderPlayerShipTypes.

// after declaring the winner.
// => display a window that shows the winner and a play again button

// styles :
// => fix players board squares when ships are placed !
// => fix styles for the hits and missed hits and when the ship is sunk
// => fix overall styles for the game!
