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

//creates board on refresh
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
    let columnClicked = currentClick.toString()[1];
    if (boardArray[columnClicked].includes(1) && boardArray[columnClicked].indexOf(1)!=0) {
        boardArray[columnClicked][boardArray[columnClicked].indexOf(1)-1] = 1;
    } else {
        boardArray[columnClicked][5] = 1;
    }
    console.log(boardArray);
}

//render the data structure on to the html using DOM
function render() {
    let columnClicked = currentClick.toString()[1];
    let rowToFill = boardArray[columnClicked].indexOf(1);
    squares.forEach(function(e) {
        if(e.getAttribute('data-id') == `${rowToFill}${columnClicked}`) {
            e.classList.add('p1');
        }
    });
}

function reset() {
    let l = boardArray.length;
    for (let i = 0; i<l;i++) {
        boardArray.pop();
    }
    squares.forEach(function(e) {
        e.classList.replace('p1','square');
    });
    createBoard();
}

createBoard();