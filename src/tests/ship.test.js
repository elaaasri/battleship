import Ship from "../models/ship.js";

const ship = new Ship();
test("ship hits", () => {
  ship.hit();
  expect(ship.numberOfHits).toBeGreaterThan(0);
});

test("ship sunk", () => {
  const ship = new Ship();
  if (ship.isSunk()) {
    expect(ship.isShipSunk).toBeTruthy();
  } else expect(ship.isShipSunk).toBeFalsy();
});
