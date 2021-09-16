# connect4 webapp
## Description:
### Connect-Four is a tic-tac-toe-like two-player game in which players alternately place pieces on a vertical board 7 columns across and 6 rows high. Each player uses pieces of a particular color (commonly black and red, or sometimes yellow and red), and the object is to be the first to obtain four pieces in a horizontal, vertical, or diagonal line. Because the board is vertical, pieces inserted in a given column always drop to the lowest unoccupied row of that column. As soon as a column contains 6 pieces, it is full and no other piece can be placed in the column.
# TODO ADD SCREENSHOTS HERES
## Technologies Used:
### HTML, CSS, JS
## Getting Started:
### Game Link: https://alexmcdermid.github.io/connect4/
### Github Repo Link: https://github.com/alexmcdermid/connect4
### Please note that player one always starts first and there is no computer AI so please play with a friend! Please also note that the repo contains the original project (old.html, old.js) and the current live project with a new and improved datatype! (index.html and refactor.js) Both projects utilize the same css file. 
## Pseudocode:
## Next Steps:
### Since a lot of the working time this week was dedicated from refactoring the original attempt at the projects datatype from an array (single array with numbers) to a nested array (array containing an array of numbers) to allow for self checking iterative win logic. It would make sense to make use of this. Because we did this, we could now add options for game board size allowing for a larger or smaller board and the win logic would still work as it always just checks if there are four of either token placed in a row (vertically, horizontally or diagonaly).
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
