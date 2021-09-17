//variables
let boardArray = [];
let squares = document.querySelectorAll(".board div");
let upperEl = document.querySelectorAll('.upper div')
let playerTurnEl = document.querySelector("h1");
let messageEl = document.querySelector(".message");
let playerTurn = 1;
let lastChanged = null;
let won = false;

//event listeners
Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
    square.addEventListener('mouseover', hoverSquare)
})

//calls reset function when reset button is clicked
document.querySelector('.reset').addEventListener('click', reset);

//handle all the events that occur on mouse click, which inlcude most of the games state changes
function clickSquare() {
    let click = parseInt(this.id);
    currentClick = click;
    update();
    render();
    checkWin();
    hoverSquareClick();
}

//hightlight hover square with tile being placed
function hoverSquare(){
    let hover = parseInt(this.id);
        squares.forEach(function(e) {
            if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
                if(e.getAttribute('id') == hover) {
                    if (playerTurn === 1) {
                        e.classList.remove('square');
                        e.classList.add('p1hover');
                    }
                    if (playerTurn === -1) {
                        e.classList.remove('square');
                        e.classList.add('p2hover');
                    }
                }
                if(e.getAttribute('id') != hover) {
                    e.classList.remove('p1hover');
                    e.classList.remove('p2hover');
                    e.classList.add('square');
                }
            }
        });
      //deals with upper hover
      upperEl.forEach(function(f) {
        if (f.getAttribute('id') === hover.toString()[1]&&playerTurn===1) {
            f.classList.replace('square','p1hover')
        }
        if (f.getAttribute('id') === hover.toString()[1]&&playerTurn===-1) {
            f.classList.replace('square','p2hover')
        }
        if(f.getAttribute('id') != hover.toString()[1]) {
            f.classList.remove('p1hover');
            f.classList.remove('p2hover');
            f.classList.add('square');
        }
    })
}

//handle updating hover color on click when cursor doesn't move and doesn't trigger hover update
function hoverSquareClick(){
    let hover = currentClick;
    if (won === false) {
        squares.forEach(function(e) {
            if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
                if(e.getAttribute('id') == hover) {
                    if (playerTurn === 1) {
                        e.classList.remove('p1hover');
                        e.classList.remove('p2hover');
                        e.classList.remove('square');
                        e.classList.add('p1hover');
                    }
                    if (playerTurn === -1) {
                        e.classList.remove('p1hover');
                        e.classList.remove('p2hover');
                        e.classList.remove('square');
                        e.classList.add('p2hover');
                    }
                }
            }
        });
        upperEl.forEach(function(f) {
            if (f.getAttribute('id') === hover.toString()[1]&&playerTurn===1) {
                f.classList.remove('p1hover')
                f.classList.remove('p2hover')
                f.classList.remove('square')
                f.classList.add('p1hover')
            }
            if (f.getAttribute('id') === hover.toString()[1]&&playerTurn===-1) {
                f.classList.remove('p1hover')
                f.classList.remove('p2hover')
                f.classList.remove('square')
                f.classList.add('p2hover')            
            }
        })
    }
}

//creates board on page refresh
function createBoard() {
    //refactor for new data type
    //2d array 
    //outer array is 7 arrays; index indicates which column
    //inner array is 6 items; index indicates row and content is 0-2 indicating empty, red, yellow
    
    for (let i = 0; i < 7; i++) {
        let outerArray = [];
        for (let ii = 0; ii<6; ii++) {
            let innerArray = 0;
            outerArray.push(innerArray);
        }
        boardArray.push(outerArray);
    }
}

//update the data structure on click to represent what was clicked
function update() {
    //gets column clicked as single number/string
    let columnClicked = currentClick.toString()[1];
    //sets to change to column in question in board array
    let toChange = boardArray[columnClicked-1];
    //sets defaults bottom the the very bottom
    let bottom = 5;

    //check for no zeroes and return if none to avoid top slot bug
    if(toChange.lastIndexOf(0) === -1)
        return;
    //checks for the bottom of the column in question and sets bottom to be the next free slot
    //could rebuild using arr.lastindexof 0
    for(let i = toChange.length; i>0; i--) {
        
        if(toChange[i] === 1 || toChange[i] === -1) {
            bottom = i-1;
        }
    }

    //the last changed token slot DO NOT REMOVE USED FOR CHECK WIN LOGIC
    lastChanged = `${columnClicked}${bottom+1}`;
    //fills the free slot in question with 1 or 2 depending on whichs players turn it is and changes the turn
    if (won === false){
        if (playerTurn ===1) {
            toChange[bottom] = 1;
            playerTurn*=-1;
        } else {
            toChange[bottom] = -1;
            playerTurn*=-1;
        }
    }
}

//render the data structure on to the html using DOM
function render() {
   let toFill;
   let toFillCol;
   let toFillRow;
   if (won === true) return;
   boardArray.forEach(function(innerArray, index) {
       toFillCol = index+1;
        innerArray.forEach(function(innerArrayItem, index) {
            if (innerArrayItem === 1 ) {
                toFillRow = index+1;
                toFill = document.getElementById(`${toFillRow}${toFillCol}`);
                toFill.classList.replace('square','p1');
                toFill.classList.replace('p1hover', 'p1');
                toFill.classList.replace('p2hover', 'p1');
            } else  if (innerArrayItem === -1){
                toFillRow = index+1;
                toFill = document.getElementById(`${toFillRow}${toFillCol}`);
                toFill.classList.replace('square','p2');
                toFill.classList.replace('p1hover', 'p2');
                toFill.classList.replace('p2hover', 'p2');
            } 
        })   
   })
   if (playerTurn === 1)
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
   else 
    playerTurnEl.innerText = "Player Turn: "+2;

}

function checkWin() {
    checkTie()
    checkRow()
    checkColumn()
    checkDiag()
}

//a function to check if given coords are in bound returns false if not and true if inbounds and item given === player turn
//DO NOT DELETE ALL CHECKWIN FUNCTIONS RELY ON THIS
function check(x,y) {
    if (x<1) return false;
    if (x > boardArray.length) return false
    if (y<1) return false;
    if (y>boardArray[0].length) return false;
    
    if (boardArray[x-1][y-1] == playerTurn*-1) return true;
}

function checkTie() {
    let count = 0;
    boardArray.forEach(function(f) {
        if (f.lastIndexOf(0)===-1)
            count++;
    });
    if (count >=7 && won === false) {
        messageEl.innerText = "It's a tie! Click reset to play again.";
        won = true;
    }
}

function checkRow(){
    right();
    left();
}

function right(){
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck+1,rowToCheck)) counter1++;
        if(check(columnToCheck+2,rowToCheck)) counter1++;
        if(check(columnToCheck+3,rowToCheck)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck+1,rowToCheck)) counter2++;
        if(check(columnToCheck+2,rowToCheck)) counter2++;
        if(check(columnToCheck+3,rowToCheck)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}

function left(){
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck-1,rowToCheck)) counter1++;
        if(check(columnToCheck-2,rowToCheck)) counter1++;
        if(check(columnToCheck-3,rowToCheck)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck-1,rowToCheck)) counter2++;
        if(check(columnToCheck-2,rowToCheck)) counter2++;
        if(check(columnToCheck-3,rowToCheck)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}

function checkColumn(){
    up();
    down();
}

function up() {
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck,rowToCheck-1)) counter1++;
        if(check(columnToCheck,rowToCheck-2)) counter1++;
        if(check(columnToCheck,rowToCheck-3)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck,rowToCheck-1)) counter2++;
        if(check(columnToCheck,rowToCheck-2)) counter2++;
        if(check(columnToCheck,rowToCheck-3)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}

function down() {
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck,rowToCheck+1)) counter1++;
        if(check(columnToCheck,rowToCheck+2)) counter1++;
        if(check(columnToCheck,rowToCheck+3)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck,rowToCheck+1)) counter2++;
        if(check(columnToCheck,rowToCheck+2)) counter2++;
        if(check(columnToCheck,rowToCheck+3)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}

function checkDiag() {
    upperRight();
    upperLeft();
    bottomRight();
    bottomLeft();
}

function upperRight() {
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck+1,rowToCheck-1)) counter1++;
        if(check(columnToCheck+2,rowToCheck-2)) counter1++;
        if(check(columnToCheck+3,rowToCheck-3)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck+1,rowToCheck-1)) counter2++;
        if(check(columnToCheck+2,rowToCheck-2)) counter2++;
        if(check(columnToCheck+3,rowToCheck-3)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}

function upperLeft() {
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck-1,rowToCheck-1)) counter1++;
        if(check(columnToCheck-2,rowToCheck-2)) counter1++;
        if(check(columnToCheck-3,rowToCheck-3)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck-1,rowToCheck-1)) counter2++;
        if(check(columnToCheck-2,rowToCheck-2)) counter2++;
        if(check(columnToCheck-3,rowToCheck-3)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}


function bottomRight() {
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck+1,rowToCheck+1)) counter1++;
        if(check(columnToCheck+2,rowToCheck+2)) counter1++;
        if(check(columnToCheck+3,rowToCheck+3)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck+1,rowToCheck+1)) counter2++;
        if(check(columnToCheck+2,rowToCheck+2)) counter2++;
        if(check(columnToCheck+3,rowToCheck+3)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}

function bottomLeft() {
    let columnToCheck = parseInt(lastChanged.toString()[0]);
    let rowToCheck = parseInt(lastChanged.toString()[1]);
    let counter1 = 0;
    let counter2 = 0;
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===1) {
        counter1++;
        if(check(columnToCheck-1,rowToCheck+1)) counter1++;
        if(check(columnToCheck-2,rowToCheck+2)) counter1++;
        if(check(columnToCheck-3,rowToCheck+3)) counter1++;

    }
    if (check(columnToCheck,rowToCheck)&&boardArray[columnToCheck-1][rowToCheck-1]===-1) {
        counter2++;
        if(check(columnToCheck-1,rowToCheck+1)) counter2++;
        if(check(columnToCheck-2,rowToCheck+2)) counter2++;
        if(check(columnToCheck-3,rowToCheck+3)) counter2++;

    }
    if (counter1>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        messageEl.classList.add('p1message');
        won = true;    }
    if (counter2>=4 && won === false) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;    }
}

//resets the board to the starting board and sets player turn to 1
function reset() {
    let l = boardArray.length;
    for (let i = 0; i<l;i++) {
        boardArray.pop();
    }
    squares.forEach(function(e) {
        e.classList.replace('p1','square');
        e.classList.replace('p2','square');
        e.classList.replace('p1hover','square')
        e.classList.replace('p2hover','square')
    });
    upperEl.forEach(function(f) {
        f.classList.replace('p1hover','square')
        f.classList.replace('p2hover','square')
    })
    playerTurn = 1;
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
    messageEl.innerText = "";
    won = false;
    messageEl.classList.remove('p1message');
    messageEl.classList.remove('p2message');
    createBoard();
}

createBoard();