let boardArray = [];
let board = document.querySelector(".board"); 
let squares = document.querySelectorAll(".board div");
let playerTurn = 1;

Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
})


//event listener
// createBoard function fills boardArray with circle data all set to 0
function createBoard(){ 
    for(let i=0;i<42;i++){ 
    //add item with num 0-2 to boardArray, 0empty, 1red, 2yellow to keep track of data in js
    let boardItem = [0];
    boardArray.push(boardItem);
    } 
}

function render() {
    
}

//event listener which tracks square clicks and then handles updating the boardArray, it then calls render
function clickSquare() {
    let click = parseInt(this.dataset.id);
    if (playerTurn ==1) {
        boardArray[click] = 1;
        console.log(boardArray[click]);
    }
    console.log(click);
    render();
}
createBoard();
