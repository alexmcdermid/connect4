let boardArray = [];
let squares = document.querySelectorAll(".board div");
let playerTurnEl = document.querySelector("h1");
let messageEl = document.querySelector(".message");
let playerTurn = 1;
let lastChanged = null;
let won = false;

//event listeners
Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
})

document.querySelector('.reset').addEventListener('click', reset);

function clickSquare() {
    let click = parseInt(this.id);
    currentClick = click;
    update();
    render();
    checkWin();
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
    //TODO rebuild using arr.lastindexof 0
    for(let i = toChange.length; i>0; i--) {
        
        if(toChange[i] === 1 || toChange[i] === 2) {
            bottom = i-1;
        }
    }

    //the last changed token slot DO NOT REMOVE USED FOR CHECK WIN LOGIC
    lastChanged = `${columnClicked}${bottom+1}`;
    //fills the free slot in question with 1 or 2 depending on whichs players turn it is and changes the turn
    
        if (playerTurn ===1) {
            toChange[bottom] = 1;
            playerTurn*=-1;
        } else {
            toChange[bottom] = 2;
            playerTurn*=-1;
        }
    
    console.log(boardArray);

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
            } else  if (innerArrayItem === 2){
                toFillRow = index+1;
                toFill = document.getElementById(`${toFillRow}${toFillCol}`);
                toFill.classList.replace('square','p2');
            } 
        })   
   })
   if (playerTurn === 1)
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
   else 
    playerTurnEl.innerText = "Player Turn: "+2;

}

function checkWin() {
    checkColumn()
    checkRow()

    

    //TODO check diag
}

//checks columns for win condition 
function checkColumn() {
    console.log(lastChanged);
    let columnToCheck = lastChanged.toString()[0];
    let counter1 = 0;
    let counter2 = 0;
    //check to see if we have 1 or 2 in a row 4 times 

    //TODO: WE WANT TO CHECK UP FROM THE CLICK SPOT AND DOWN FROM THE CLICK SPOT AND ITERATE

    //NOTE THIS IS JUST CHECKING HOW MANY ARE IN THE ROW BUT IT WORKS
    for (let i = 1; i<boardArray[columnToCheck-1].length;i++) {
        if (boardArray[columnToCheck-1][i]===1) {
            counter1++;
        }
        if (boardArray[columnToCheck-1][i]===2) {
            counter2++;
        }
    }
    //print message and set won to true to stop updaetes
    if(won === true)
        return
    else if (counter1>3) {
        messageEl.innerText = "Congratulations Player 1! You win.";
        won = true;
    }
    else if (counter2>3) {
        messageEl.innerText = "Congratulations Player 2! You win.";
        won = true;
    }
}

function checkRow() {
    //checkright
    //checkleft
}

function upperRight() {

}

function upperLeft() {

}

function bottomRight() {

}

function bottomLeft() {

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
    });
    playerTurn = 1;
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
    messageEl.innerText = "";
    won = false;
    createBoard();
}

createBoard();