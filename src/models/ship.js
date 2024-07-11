// ship class :
class Ship {
  constructor() {
    this.shipLength = 0;
    this.numberOfHits = 0;
    this.isShipSunk = null;
  }
  // increases numbers of hits :
  hit() {
    return this.numberOfHits++;
  }
  // checks if the ship is sunk or not :
  isSunk() {
    if (this.numberOfHits >= this.shipLength) {
      return (this.isShipSunk = true);
    } else return (this.isShipSunk = false);
  }
}
export default Ship;

// place the ship in the correct coordinates :
// placeShip(row, column) {

//   // const ship = new Ship();
//   // this.board[row][column] = ship;
//   this.board[row] = this;

//   return this.board;
// }
