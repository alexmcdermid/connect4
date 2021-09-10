# connect4 webapp
## Pseudocode:
### Create datatype for what is in each slot
* 2d array in javascript would work quite well. 
* Each array could be a position with 3 items representing empty, p1 token, p2 token.
### Create the board grid
* since it is preset we can just hard code the css with a flexbox grid of 6x7 and have an empty board showing on refresh. 
### Logic to decide which players turn it is (just needs to alternate after a piece is placed)
* boolean stored in java that would change a player turn display on render.
### Event listener for grid elements
* this would listen for a click on the board which would result in adding a circle somewhere.
* we could grab which item is clicked then based on the turn could add either 1-2 in the correspdoning array.
* change the turn.
### Render the circles
* need to render the cirlces on to the board after the event listener updates the datastructure.
* based on the updated javascript datatype render the css circles in the corresponding grid.
### Create winning combination datatype
* probably just another 2d Array that contains combination of 4 positions that would result in a win.
* check board positions for both players after each turn against winning combination datatype.