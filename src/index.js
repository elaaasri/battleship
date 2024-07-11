import "./style.css";

// const firstShip = new Ship();
// console.log(firstShip);
// console.log(firstShip.shipLength);
// console.log(firstShip.numberOfHits);
// console.log(firstShip.isShipSunk);

/**
 *  ########## FIRST ########## 
 *  placing the ships :
 * 1 - 10×10 grid.
 * 2 - each player secretly arranges their ships (horizontally or vertically) on their primary grid.
 *   - number of squares of each ship is determined by the type of    ship :	
  N | Class of ship |	Size
  1 |	Carrier	     |   5
  2 |	Battleship	 |   4
  3 |	Destroyer	   |   3
  4 |	Submarine	   |   3
  5 |	Patrol Boat  |   2

 *   - the ships can't lie over parts of one another ship (overlap).
 *
 *  ########## SECOND ##########
 *  after the ships have been positioned :
 * 1- make it round to round game.
 * 2- each round a player target a square in opponent grid to shot at.  
 * 3-  
 */

//   Gameboards should be able to report whether or not all of their ships have been sunk.
// Create a Player class/factory.
// There will be two types of players in the game, ‘real’ players and ‘computer’ players.
// Each player object should contain its own gameboard.
// Import your classes/factories into another file, and drive the game using event listeners to interact with your objects. Create a module that helps you manage actions that should happen in the DOM.
// At this point it is appropriate to begin crafting your User Interface.
// Set up a new game by creating Players. For now just populate each player’s Gameboard with predetermined coordinates. You are going to implement a system for allowing players to place their ships later.
// We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class/factory.
// You’ll need methods to render each player’s Gameboard, so put them in an appropriate module.
// Your event listeners should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function, step back and figure out which class or module that function should belong to.
// For attacks, let the user click on a coordinate in the enemy Gameboard. Send the user input to methods on your objects, and re-render the boards to display the new information.
// Players should take turns playing the game by attacking the enemy Gameboard. If you feel the need to keep track of the current player’s turn, it’s appropriate to manage that in this module, instead of another mentioned object.
// The game is played against the computer, so make the ‘computer’ players capable of making random plays. The computer does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).
// Create conditions so that the game ends once one player’s ships have all been sunk. This function is also appropriate for this module.
// Finish it up by implementing a
