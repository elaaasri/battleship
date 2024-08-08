// ship class :
class Ship {
  constructor(shipName, shipLength) {
    this.shipName = shipName;
    this.shipLength = shipLength;
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
  // get ship Name :
  getShipName() {
    return this.shipName;
  }
  // get ship Length :
  getShipLength() {
    return this.shipLength;
  }
}
export default Ship;
