// ship class :
class Ship {
  constructor(shipName, shipLength) {
    this.isShip = true;
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
      console.log("sunk");
      return (this.isShipSunk = true);
    } else {
      console.log("not sunk");
      return (this.isShipSunk = false);
    }
  }
  // get ship same :
  getShipName() {
    return this.shipName;
  }
  // get ship length :
  getShipLength() {
    return this.shipLength;
  }
}
export default Ship;
