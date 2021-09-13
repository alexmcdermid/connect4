//variables
let boardArray = [];
let board = document.querySelector(".board"); 
let squares = document.querySelectorAll(".board div");
let playerTurnEl = document.querySelector("h1");
let messageEl = document.querySelector(".message");
let playerTurn = 1;
let currentClick = null;
let toFill = null;
let p1Array = [];
let p2Array = [];
let won = false;
let tie = false;

//constant values
const winningArray = [ 
    [0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10], 
    [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], 
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], 
    [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], 
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], 
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], 
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], 
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], 
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], 
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], 
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], 
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], 
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], 
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], 
    [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
    [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], 
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], 
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], 
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], 
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], 
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] 
    ]; 

//event listeners
Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
    square.addEventListener('mouseover', hoverSquare)
})

document.querySelector('.reset').addEventListener('click', createBoard);

//functions
//main function, controls update flow of most things based on clicks
function clickSquare() {
    let click = parseInt(this.dataset.id);
    currentClick = click;
    update();
    render();
    hoverSquareClick();
    checkWin();
}

//handle updating hover color on click when cursor doesn't move and doesn't trigger hover update
function hoverSquareClick(){
    let hover = currentClick;
    squares.forEach(function(e) {
        if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
            if(e.getAttribute('data-id') == hover) {
                if (playerTurn === 1) {
                    e.classList.remove('p1hover');
                    e.classList.remove('p2hover');
                    e.classList.remove('square');
                    e.classList.add('p1hover');
                }
                if (playerTurn === 2) {
                    e.classList.remove('p1hover');
                    e.classList.remove('p2hover');
                    e.classList.remove('square');
                    e.classList.add('p2hover');
                }
            }
        }
    });
}

//hightlight hover square with tile being placed
function hoverSquare(){
    let hover = parseInt(this.dataset.id);
        squares.forEach(function(e) {
            if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
                if(e.getAttribute('data-id') == hover) {
                    if (playerTurn === 1) {
                        e.classList.remove('square');
                        e.classList.add('p1hover');
                    }
                    if (playerTurn === 2) {
                        e.classList.remove('square');
                        e.classList.add('p2hover');
                    }
                }
                if(e.getAttribute('data-id') != hover) {
                    e.classList.remove('p1hover');
                    e.classList.remove('p2hover');
                    e.classList.add('square');
                }
            }
        });
}

// createBoard function fills boardArray with circle data all set to 0
// this function also resets an already created board to starting values
function createBoard(){ 

    //reset board
    while(boardArray.length>0) {
        boardArray.pop();
    }
    while(p1Array.length>0) {
        p1Array.pop();
    }
    while(p2Array.length>0) {
        p2Array.pop();
    }

    squares.forEach(function(e) {
        if (e.classList.contains("p1")||e.classList.contains("p2")) {
            e.classList.replace("p1","square");
            e.classList.replace("p2", "square");
        }
    });
    playerTurn = 1;
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
    messageEl.innerText = "";
    won = false;
    tie = false;
    messageEl.classList.remove('p1message');
    messageEl.classList.remove('p2message');

    //populate board data structure 
    for(let i=0;i<42;i++){ 
    //add item with num 0-2 to boardArray, 0empty, 1red, 2yellow to keep track of data in js
    let boardItem = [0];
    boardArray.push(boardItem);
    } 
}

//win logic, checks each winning array possibility against the numbers in each players array
function checkWin() {
    let tieNum = 0;
    for (let i = 0; i<boardArray.length; i++) {
        if (boardArray[i] != 0) {
            tieNum++;
        }
    }
    if (tieNum === 42) {
        messageEl.innerText = "Tie game!";
        tie = true;
    }
    console.log(tieNum);
    winningArray.forEach(function(e) {
    let num1 = 0;
    let num2 = 0;
    for (let i = 0;i<winningArray.length; i++) {
        if (e.includes(p1Array[i])) {
            num1++
        }
        if (num1 >= 4 && won === false) {      
            messageEl.innerText = "Congratulations Player 1! You win.";
            messageEl.classList.add('p1message');
            won = true;
            }
        if (e.includes(p2Array[i])) {
            num2++
        }
        if (num2 >= 4 && won === false) {      
        messageEl.innerText = "Congratulations Player 2! You win.";
        messageEl.classList.add('p2message');
        won = true;
        }
    }
       num1 = 0;
       num2 = 0;
   });
}

//function to render the discs into the html as well as update text
function render() {
    squares.forEach(function(e) {
        if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
            if(e.getAttribute('data-id') == toFill && playerTurn == 1) {
                e.classList.remove('square');
                e.classList.remove('p1hover');
                e.classList.remove('p2hover');
                e.classList.add('p1');
                boardArray[toFill] = 1;
                playerTurn = 2;
            }
            else if(e.getAttribute('data-id') == toFill && playerTurn == 2) {
                e.classList.remove('square');
                e.classList.remove('p1hover');
                e.classList.remove('p2hover');
                e.classList.add('p2');
                boardArray[toFill] = 2;
                playerTurn = 1;
            }
        }
    });
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
}

// logic to deal with filling the correct item based on which column is pressed
// makes sure that it is placing the disc at the top of the stack
function update() {

    for (let i = 0; i<=6; i++) {
        if (currentClick === i || currentClick % 7 === i) {
            if (boardArray[i+35] == 0) {
                toFill = i+35;
            } else if (boardArray[i+35] != 0 && boardArray[i+28] == 0) {
                toFill = i+28;
            } else if (boardArray[i+28] != 0 && boardArray[i+21] == 0) {
                toFill = i+21;
            } else if (boardArray[i+21] != 0 && boardArray[i+14] == 0) {
                toFill = i+14;
            } else if (boardArray[i+14] != 0 && boardArray[i+7] == 0) {
                toFill = i+7;
            } else if (boardArray[i+7] != 0 && boardArray[i] == 0) {
                toFill = i;
            }
        }
    }

    //adding filled items to winning array for each player
    if (playerTurn == 1&&!p1Array.includes(toFill)) {
        p1Array.push(toFill);
    } else if (playerTurn == 2&&!p2Array.includes(toFill)) {
        p2Array.push(toFill);
    }

    
}


//called once on refresh to populate the board array in js
createBoard();