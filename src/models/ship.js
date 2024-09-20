// ship class :
class Ship {
  constructor(shipName, shipLength) {
    this.isShip = true;
    this.shipName = shipName;
    this.shipLength = shipLength;
    this.numberOfHits = 0;
    this.isShipSunk = false;
  }
  // get ship same :
  getShipName() {
    return this.shipName;
  }
  // get ship length :
  getShipLength() {
    return this.shipLength;
  }
  // increases numbers of hits :
  hit() {
    return this.numberOfHits++;
  }
  // checks if the ship is sunk or not :
  isSunk() {
    return this.numberOfHits >= this.shipLength
      ? (this.isShipSunk = true)
      : this.isShipSunk;
  }
}
export default Ship;
