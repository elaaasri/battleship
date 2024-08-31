console.log("zbe");

function placeComputerShips() {
  const allShipTypes = {
    "carrier-ship": 5,
    "battle-ship": 4,
    "cruiser-ship": 3,
    "submarine-ship": 3,
    "destroyer-ship": 2,
  };
  const allShipTypesArr = Object.entries(allShipTypes);
  allShipTypesArr.map(([shipName, shipSize]) => {
    getComputerShipValidCoords(shipName, shipSize);
  });
  console.log("#".repeat(30));

  function getComputerShipValidCoords(shipName, shipSize) {
    const allCoords = computerPlayerGameBoard.board.map((row) => {
      return row.map((cell) => {
        return cell.coords;
      });
    });
    const randomValidIndex = Math.floor(Math.random() * allCoords.length);
    const randomCoords = allCoords[randomValidIndex][randomValidIndex];
    console.log(randomCoords);
    const [x, y] = randomCoords;
    // console.log("random coords", randomCoords);
    const allRightSideCoords = [
      [x, y],
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
      [x, y + 4],
    ].slice(0, shipSize);
    // // console.log("all right coords", allRightSideCoords);
    // // // checks if curr ship type coords are within the board :
    const isShipCoordsWithingBoard = allRightSideCoords.every(([x, y]) =>
      computerPlayerGameBoard.isWithinBounds(x, y)
    );
    console.log(isShipCoordsWithingBoard);
    if (!isShipCoordsWithingBoard) return;

    // if (!isShipCoordsWithingBoard) return;
    // if (isShipCoordsWithingBoard) {
    //   computerPlayer.setPlayerShipPosition(allRightSideCoords, "a", shipLength);
    //   // console.log(computerPlayerGameBoard.board);
    // }

    // console.log("isShipCoordsWithingBoard", isShipCoordsWithingBoard);
  }
  // getComputerShipValidCoords();

  // let copyBoard = computerPlayerGameBoard.board;
  // // copyBoard.splice(-5);
  // // console.log(copyBoard);
  // const allCoords = computerPlayerGameBoard.board.map((row) => {
  //   return row.map((cell) => {
  //     return cell.coords;
  //   });
  // });
  // console.log(allCoords.length);
  // console.log(allCoords);

  // allCoords.map((row) => {
  //   row.length = 5;
  // });

  // const randomValidIndex = Math.floor(Math.random() * allCoords.length);
  // const randomCoords = allCoords[randomValidIndex][randomValidIndex];
  // const [x, y] = randomCoords;

  // const allRightSideCoords = [
  //   [x, y],
  //   [x, y + 1],
  //   [x, y + 2],
  //   [x, y + 3],
  //   [x, y + 4],
  // ].slice(0, 5);
  // // checks if curr ship type coords are within the board :
  // const isShipCoordsWithingBoard = allRightSideCoords.every((coord) =>
  //   computerPlayerGameBoard.isWithinBounds(coord[0], coord[1])
  // );

  // console.log("res", isShipCoordsWithingBoard);

  // // computerPlayerGameBoard.isWithinBounds(randomCoords[0], randomCoords[1]);

  // console.log("random coords", randomCoords);
  // console.log("all right coords", allRightSideCoords);

  // const randomValidIndex = Math.floor(Math.random() * allCoords.length);
  // return allCoords[randomValidIndex][randomValidIndex];
  // const randomCoords = getComputerChoice();

  // const [x, y] = randomCoords;
  // const allRightSideCoords = [
  //   [x, y],
  //   [x, y + 1],
  //   [x, y + 2],
  //   [x, y + 3],
  //   [x, y + 4],
  // ].slice(0, 5);

  // console.log(allRightSideCoords);

  // console.log(
  //   computerPlayerGameBoard.isWithinBounds(randomCoords[0], randomCoords[1])
  // );
}
placeComputerShips();

// gets curr square coords :
// const currSquareCoords = [
//   Number(currSquare.getAttribute("data-x")),
//   Number(currSquare.getAttribute("data-y")),
// ];
// // gets all right ship coords :
// const [x, y] = currSquareCoords;
// const allRightSideCoords = [
//   [x, y],
//   [x, y + 1],
//   [x, y + 2],
//   [x, y + 3],
//   [x, y + 4],
// ].slice(0, currShipLength);
// // checks if curr ship type coords are within the board :
// const isShipCoordsWithingBoard = allRightSideCoords.every((coord) =>
//   this.isWithinBounds(coord[0], coord[1])
// );
// return isShipCoordsWithingBoard ? allRightSideCoords : null;

// working on placing random computer ships on the board !
// get player correct ship coords :
// getPlayerCurrValidCoords(currSquare, currShipLength) {
//   console.log(currSquare, currShipLength);
//   // gets curr square coords :
//   const currSquareCoords = [
//     Number(currSquare.getAttribute("data-x")),
//     Number(currSquare.getAttribute("data-y")),
//   ];
//   // gets all right ship coords :
//   const [x, y] = currSquareCoords;
//   const allRightSideCoords = [
//     [x, y],
//     [x, y + 1],
//     [x, y + 2],
//     [x, y + 3],
//     [x, y + 4],
//   ].slice(0, currShipLength);
//   // checks if curr ship type coords are within the board :
//   const isShipCoordsWithingBoard = allRightSideCoords.every((coord) =>
//     this.isWithinBounds(coord[0], coord[1])
//   );
//   return isShipCoordsWithingBoard ? allRightSideCoords : null;
// }

// begginButton.addEventListener("click", test);
// const test = () => {
// placeShipsCard.style.display = "none";
// };

// if (!shipGotPlaced) {
//   const currValidCoords = humnaPlayerGameBoard.getCurrValidCoords(
//     square,
//     shipLength
//   );
//   if (!currValidCoords) return;
//   const isShiptValid = humnaPlayerGameBoard.isShiptCoordsValid(
//     currValidCoords,
//     this.allPreviousShipCoords
//   );
//   if (!isShiptValid) return;
//   document.removeEventListener("mousemove", handleMouse);
//   this.allPreviousShipCoords.push(currValidCoords);
//   this.placeShipOnBoard(square, shipImage);
//   humanPlayer.setPlayerShipPosition(currValidCoords, shipName, shipLength);
//   shipGotPlaced = true;
// }

// computerPlayerGameBoard.getComputerValidCoords([0, 7], 5);
// const shipTest = {
//   name: "carrier-ship",
//   length: 5,
// };

// // console.log(computerPlayerGameBoard.board);
// computerPlayerGameBoard.board.map((row) => {
//   console.log(row);

//   row.splice(-5);
//   console.log(row);
// });

// console.log("#".repeat(30));
// console.log(computerPlayerGameBoard.board);

// console.log(shipTest.length);
