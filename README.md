# connect4 webapp
## Pseudocode:
### Create datatype for what is in each slot
* 2d array in javascript would work quite well. 
* Each array could be a position with 3 items representing empty, p1 token, p2 token.
### Create the board grid in HTML/CSS
* For HTML we could just use a collection of divs encapsulated by div marked as "board" with class. 
* Since it is preset we can just hard code the board css with a flexbox grid of 6x7 and have an empty board showing on refresh. 
### Logic to decide which players turn it is (just needs to alternate after a piece is placed)
* boolean stored in java that would change a player turn display on render.
### Event listener/function call for grid element clicked
* this would listen for a click on the board which would result in adding a circle somewhere in our JS datatype.
* we could grab which item is clicked then based on the turn could add either 1-2 in the correspdoning array.
* change the turn.
* call render
### Render the circles
* need to render the cirlces on to the board after the event listener updates the datastructure.
* based on the updated javascript datatype render the css circles in the corresponding grid.
* would do this by checking js datatype and updating divs to have class "emopty", "p1", "p2"
* have preset CSS for each class 
### Create winning combination datatype and check function
* probably just another 2d Array that contains combination of 4 positions that would result in a win.
* check board positions for both players after each turn against winning combination datatype.