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
const playerOneValue = document.getElementById("player-one-input").value;
const playerTwoValue = document.getElementById("player-two-input").value;
const playerBattleContainer = document.getElementById(
  "player-battle-container"
);
const begginButton = document.getElementById("beggin-button");
const placePlayerShipsCard = document.getElementById("place-player-ships-card");
const battleCard = document.getElementById("battle-card");
const battlePlayerNameDiv = document.getElementById("battle-player-name");
const battleComputerNameDiv = document.getElementById("battle-computer-name");

// DOM elements for PvP mode :
const overlayWindow = document.getElementById("overlay-window");
const winnerPopupContainer = document.getElementById("winner-popup-container");
const playAgainButton = document.getElementById("play-again-button");
const showWinnerDiv = document.getElementById("show-winner-div");

// assign new players :
const humanPlayer = new Player("anas"); // player obj.
const humanGameBoardObject = humanPlayer.getPlayerBoard(); // player game board.
const computerPlayer = new Player("computer"); // computer obj.
const computerGameBoardObject = computerPlayer.getPlayerBoard(); // computer game board.

// create player game board elements :
const createGameBoardElements = (arr, container) => {
  for (const row of arr) {
    for (const ele of row) {
      const square = document.createElement("div");
      const [x, y] = ele.coords;
      // square.textContent = [x, y];
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
        // fixes event listener duplication.
        if (!shipGotPlaced) {
          // checks all player validtation before placing the ships on board :
          // checks if cur coords are valid :
          const currValidCoords = humanGameBoardObject.getPlayerCurrValidCoords(
            square,
            shipLength
          );
          if (!currValidCoords) return;
          // checks if cur coords are not already used! :
          const isCoordinateUsed = humanGameBoardObject.isPreviousCoordsUsed(
            currValidCoords,
            this.allPreviousShipCoords
          );
          if (!isCoordinateUsed) return;
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
  battlePlayerNameDiv.textContent = `${playerOneValue.toUpperCase()} WATERS`;
  battleComputerNameDiv.textContent = `${playerTwoValue.toUpperCase()} WATERS`;
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
    playerOneValue,
    playerTwoValue
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
    // disable container pointerEvents.
    this.disablePlayersBoardContainers();
    // toggle players round :
    if (currentPlayer == humanPlayer.getName()) {
      this.attackComputerPlayer(computerBoardElement, computerGameBoardObject);
    } else if (currentPlayer == computerPlayer.getName()) {
      this.attackHumanPlayer(playerBoardElement, humanGameBoardObject);
    }
  },
  // attack computer player :
  attackComputerPlayer(gameBoardElement, gameBoardObject) {
    gameBoardElement.style.pointerEvents = "auto";
    gameBoardElement.style.cursor = "pointer";
    // board element event :
    [...gameBoardElement.children].forEach((square) => {
      // fixes event listener duplication.
      const newSquare = square.cloneNode(true);
      square.replaceWith(newSquare);
      newSquare.addEventListener("click", () => {
        newSquare.style.pointerEvents = "none";
        const currCoords = this.getCurrCoords(newSquare); // gets curr square coords.
        const [x, y] = currCoords;
        const currShip = gameBoardObject.getCurrShip(x, y); // checks if curr square is a ship :
        newSquare.style.background = currShip.isShip
          ? "rgba(255, 0, 0, 0.6)"
          : "rgba(222, 198, 158, 0.6)";
        // switch player if no ship :
        if (!currShip.isShip) {
          this.togglePlayers(computerPlayer.getName());
          return;
        }
        // triggers battle funcs :
        gameBoardObject.receiveAttack(currShip);
        if (currShip.isSunk()) {
          const currShipImage = this.getComputerSunkShipImage(currShip);
          this.manipulateCurrSunkShipStyle(
            currShip.getShipLength(),
            currShipImage
          );
        }
        declareWinner(gameBoardObject);
      });
    });
  },
  // manipulates sunked ship styles :
  manipulateCurrSunkShipStyle(currShipLength, shipImage) {
    shipImage.style.display = "flex";
    let squareParent = shipImage.parentElement;
    // get curr ship next siblings :
    const currShipNextSiblings = [];
    for (let i = 0; i < currShipLength; i++) {
      currShipNextSiblings.push(squareParent);
      squareParent = squareParent.nextElementSibling;
    }
    // hides hits style :
    currShipNextSiblings.forEach((square) => {
      square.style.background = "rgba(0, 0, 0, 0.6)";
      square.style.border = "none";
    });
  },
  // attack human player :
  attackHumanPlayer(gameBoardElement, gameBoardObject) {
    gameBoardElement.style.pointerEvents = "auto";
    gameBoardElement.style.cursor = "pointer";
    // get random player valid coord :
    const randomPlayerValidCoord = gameBoardObject.getRandomPlayerValidCoord();
    const [x, y] = randomPlayerValidCoord;
    // get the current square element :
    const currSquare = this.getCurrSquareElement(gameBoardElement, x, y);
    currSquare.style.pointerEvents = "none";
    // get current ship object :
    const currShip = gameBoardObject.getCurrShip(x, y);
    currSquare.style.background = currShip.isShip
      ? "rgba(255, 0, 0, 0.6)"
      : "rgba(222, 198, 158, 0.6)";
    // switch player if no ship :
    if (!currShip.isShip) {
      this.togglePlayers(humanPlayer.getName());
      return;
    }
    // triggers battle funcs :
    gameBoardObject.receiveAttack(currShip);
    if (currShip.isSunk()) {
      const currShipImage = this.getHumanSunkShipImage(currShip, currSquare);
      this.manipulateCurrSunkShipStyle(currShip.getShipLength(), currShipImage);
    }
    this.togglePlayers(computerPlayer.getName()); // attack player again if its a ship.
    declareWinner(gameBoardObject);
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
  // disable containers point events after the game is finished :
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

const declareWinner = (gameBoardObject) => {
  // get correct winner name :
  const winnerName =
    playerOneValue == gameBoardObject.getBoardName()
      ? playerTwoValue
      : playerOneValue;
  // check if current game board ships are sunk :
  if (!gameBoardObject.isAllShipsSunk()) return;
  startBattle.disablePlayersBoardContainers(); // disable containers pointerEvents.
  showOverlayAndWinnerContainer(); // shows winner card.
  showWinnerDiv.textContent = `${winnerName} Is The Winner!`;
};

// activate overlay and show winner pop up container :
const showOverlayAndWinnerContainer = () => {
  overlayWindow.style.display = "flex";
  winnerPopupContainer.style.display = "flex";
};

// play again button event :
playAgainButton.addEventListener("click", () => window.location.reload());

// fix problems :
// add a function that check for both players if they win or not! ==> done!
// after declaring the winner. ===> done!
// => display a window that shows the winner and a play again button ==> done!
// fix allCoords array in getRandomComputerShipValidCoord. ==> done!
// clean the conditions in handlePlayerSquareEvent in renderPlayerShipTypes. ==> done!

// working on setting ships styles :
// missed square ==> done
// hitted square ==> done

// styles :
// => fix players board squares when ships are placed! ==>
// => fix hover mouse ==>
// => fix styles for the hits and missed hits and when the ship is sunk! ==> done!
// => fix overall styles for the game! ==>
// => fix players names inputs and assign new player function! ==>
