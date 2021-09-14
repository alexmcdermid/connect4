let boardArray = [];
let squares = document.querySelectorAll(".board div");
let playerTurnEl = document.querySelector("h1");
let playerTurn = 1;

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
    console.log(boardArray);
}

//update the data structure on click to represent what was clicked
function update() {
    //gets column clicked as single number/string
    let columnClicked = currentClick.toString()[1];
    console.log(columnClicked);
    //sets to change to column in question in board array
    let toChange = boardArray[columnClicked-1];
    //sets defaults bottom the the very bottom
    let bottom = 5;

    //check for no zeroes and return if none to avoid top slot bug
    if(toChange.lastIndexOf(0) === -1)
        return;
    //checks for the bottom of the column in question and sets bottom to be the next free slot
    for(let i = toChange.length; i>0; i--) {
        
        if(toChange[i] === 1 || toChange[i] === 2) {
            bottom = i-1;
        }

    //TODO rebuild using arr.lastindexof 0
        
    }
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
    //TODO check column
    //TODO check row

    //TODO check diag
}

function upperRight() {

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
    createBoard();
}

createBoard();