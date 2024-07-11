// ship class :
class Ship {
  constructor() {
    this.shipLength = 0;
    this.numberOfHits = 0;
    this.isShipSunk = false;
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
