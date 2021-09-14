let boardArray = [];
let squares = document.querySelectorAll(".board div");
let playerTurn = 1;

//event listeners
Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
})

document.querySelector('.reset').addEventListener('click', reset);

function clickSquare() {
    let click = parseInt(this.dataset.id);
    currentClick = click;
    update();
    render();
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
    //sets to change to column in question in board array
    toChange = boardArray[columnClicked-1];
    //sets defaults bottom the the very bottom
    let bottom = 5;

    //checks for the bottom of the column in question and sets bottom to be the next free slot
    for(let i = toChange.length-1; i>0; i--) {
        if(toChange[i] === 1 || toChange[i] === 2) {
            bottom = i-1;
        }
    }
    //fills the free slot in question with 1 or 2 depending on whichs players turn it is and changes the turn
    if (playerTurn ===1) {
        boardArray[columnClicked-1][bottom] = 1;
        playerTurn*=-1;
    } else {
        boardArray[columnClicked-1][bottom] = 2;
        playerTurn*=-1;
    }
    console.log(boardArray);

}

//render the data structure on to the html using DOM
function render() {
    
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
    createBoard();
}

createBoard();