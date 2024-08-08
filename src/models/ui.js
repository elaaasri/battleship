import Player from "./player";
import Ship from "./ship";
import GameBoard from "./gameBoard";

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
  render(shipImage) {
    const shipObj = humanPlayer.createShipType(shipImage.id);
    this.resizePlayerShipImage(shipImage, shipObj.shipLength);
    const handleMouseEvent = (mouseEvent) =>
      this.followMouse(shipImage, mouseEvent);
    document.addEventListener("mousemove", handleMouseEvent);
    this.makeOtherShipsUnclickable(shipImage);
    this.handleClickedPlayerSquareEvent(shipImage, handleMouseEvent, shipObj);
  },
  handleClickedPlayerSquareEvent(currShipImage, handleMouse, curreShipObj) {
    const playerSquares = [...playerBoardContainer.children];
    let shipGotPlaced = false;
    playerSquares.map((square) =>
      square.addEventListener("click", () => {
        if (!shipGotPlaced) {
          const squareCoords = this.getSquareCoords(square);
          this.placeShipOnBoard(square, currShipImage);
          document.removeEventListener("mousemove", handleMouse);
          humanPlayer.setPlayerShipPosition(squareCoords, curreShipObj);
          this.makeOtherShipsClickable();
          shipGotPlaced = true;
        }
      })
    );
  },
  // get square coords :
  getSquareCoords(square) {
    const squareCoords = [
      Number(square.getAttribute("data-x")),
      Number(square.getAttribute("data-y")),
    ];
    return squareCoords;
  },
  // place ship element on board :
  placeShipOnBoard(currentSquare, ship) {
    ship.style.position = "absolute";
    ship.style.top = "-75%";
    ship.style.left = "0%";
    ship.style.pointerEvents = "none";
    currentSquare.appendChild(ship);
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
