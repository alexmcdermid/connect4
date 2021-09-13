let boardArray = [];
let squares = document.querySelectorAll(".board div");

//event listeners
Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
})

function clickSquare() {
    let click = parseInt(this.dataset.id);
    currentClick = click;
    update();
    render();
}

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

//todo update the data structure on click to represent what was clicked
//
//results: this works! it updates the main data structure with 1 where clicked
function update() {
    let columnClicked = currentClick%7;
       
    console.log(boardArray[columnClicked]);
    if (boardArray[columnClicked].includes(1) && boardArray[columnClicked].indexOf(1)!=0) {
        boardArray[columnClicked][boardArray[columnClicked].indexOf(1)-1] = 1;
    } else {
        boardArray[columnClicked][5] = 1;
    }

}

//todo render the data structure on to the html using DOM

//we FUCKING DID IT BOYS REFACTOR BASICS COMPLETE
function render() {
    let columnClicked = currentClick%7;
    let toFill = boardArray[columnClicked].indexOf(1);
    squares.forEach(function(e) {
        if(e.getAttribute('data-id') == `${toFill}${columnClicked}`) {
            e.classList.add('p1');
        }
    });
}

createBoard();