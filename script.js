let boardArray = [];
let board = document.querySelector(".board"); 
let squares = document.querySelectorAll(".board div");
let playerTurn = 1;
let playerTurnEl = document.querySelector("h1");
let currentClick = null;
let toFill = null;
let p1Array = [];
let p2Array = [];

//full disclosure i googled the winning combination list lol
let winningArray = [ 
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

//event listener 
Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
    square.addEventListener('mouseover', hoverSquare)
})

document.querySelector('.reset').addEventListener('click', createBoard);

function clickSquare() {
    let click = parseInt(this.dataset.id);
    currentClick = click;
    update();
    render();
    checkWin();
}

function hoverSquare(){
    let hover = parseInt(this.dataset.id);
    squares.forEach(function(e) {
        if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
            if(e.getAttribute('data-id') == hover) {
                e.classList.remove('square');
                e.classList.add('hover');
            }
            if(e.getAttribute('data-id') != hover) {
                e.classList.remove('hover');
                e.classList.add('square');
            }
        }
    });
}

// createBoard function fills boardArray with circle data all set to 0
function createBoard(){ 

    //reset board
    while(boardArray.length>1) {
        boardArray.pop(boardArray.length-1);
    }
    while(p1Array.length>1) {
        p1Array.pop(p1Array.length-1);
    }
    while(p2Array.length>1) {
        p2Array.pop(p2Array.length-1);
    }
    squares.forEach(function(e) {
        if (e.classList.contains("p1")||e.classList.contains("p2")) {
            e.classList.replace("p1","square");
            e.classList.replace("p2", "square");
        }
    });
    playerTurn = 1;
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
    console.log(boardArray);
    



    //create board
    for(let i=0;i<42;i++){ 
    //add item with num 0-2 to boardArray, 0empty, 1red, 2yellow to keep track of data in js
    let boardItem = [0];
    boardArray.push(boardItem);
    } 
    console.log(boardArray);
}

function checkWin() {
   winningArray.forEach(function(e) {
    let num1 = 0;
    let num2 = 0;
        e.forEach(function(i) {
           if (p1Array.includes(i)) {
            num1++;
            }
            if (num1 >= 4) {               
                alert("p1 win")
            }
            if (p2Array.includes(i)) {
                num2++;
            }
            if (num2 >= 4) {
                alert("p2 win")
            }
        
       });
       num1 = 0;
       num2 = 0;
   });
}

function render() {
    squares.forEach(function(e) {

        if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
            if(e.getAttribute('data-id') == toFill && playerTurn == 1) {
                e.classList.remove('square');
                e.classList.remove('hover');
                e.classList.add('p1');
                boardArray[toFill] = 1;
                playerTurn = 2;
            }
            else if(e.getAttribute('data-id') == toFill && playerTurn == 2) {
                e.classList.remove('square');
                e.classList.remove('hover');
                e.classList.add('p2');
                boardArray[toFill] = 2;
                playerTurn = 1;
            }
        }
    });
    playerTurnEl.innerText = "Player Turn: "+playerTurn;
}


function update() {
     //check that class position is empty
     //far left column logic
     if (currentClick === 0 ||currentClick === 7||currentClick===14||currentClick===21||currentClick===28||currentClick===35) {
         if (boardArray[35] == 0) {
             toFill = 35;
         } else if (boardArray[35] != 0 && boardArray[28] == 0) {
             toFill = 28;
         } else if (boardArray[28] != 0 && boardArray[21] == 0) {
             toFill = 21;
         } else if (boardArray[21] != 0 && boardArray[14] == 0) {
             toFill = 14;
         } else if (boardArray[14] != 0 && boardArray[7] == 0) {
             toFill = 7;
         } else if (boardArray[7] != 0 && boardArray[0] == 0) {
             toFill = 0;
         }
     }
     //column 01 logic
      if (currentClick === 1||currentClick === 8||currentClick===15||currentClick===22||currentClick===29||currentClick===36) {
         if (boardArray[36] == 0) {
             toFill = 36;
         } else if (boardArray[36] != 0 && boardArray[29] == 0) {
             toFill = 29;
         } else if (boardArray[29] != 0 && boardArray[22] == 0) {
             toFill = 22;
         } else if (boardArray[22] != 0 && boardArray[15] == 0) {
             toFill = 15;
         } else if (boardArray[15] != 0 && boardArray[8] == 0) {
             toFill = 8;
         } else if (boardArray[8] != 0 && boardArray[1] == 0) {
             toFill = 1;
         }
     }
    //column 02 logic
    if (currentClick === 2||currentClick === 9||currentClick===16||currentClick===23||currentClick===30||currentClick===37) {
        if (boardArray[37] == 0) {
            toFill = 37;
        } else if (boardArray[37] != 0 && boardArray[30] == 0) {
            toFill = 30;
        } else if (boardArray[30] != 0 && boardArray[23] == 0) {
            toFill = 23;
        } else if (boardArray[23] != 0 && boardArray[16] == 0) {
            toFill = 16;
        } else if (boardArray[16] != 0 && boardArray[9] == 0) {
            toFill = 9;
        } else if (boardArray[9] != 0 && boardArray[2] == 0) {
            toFill = 2;
        }
    }
    //column 03 logic
    if (currentClick === 3||currentClick === 10||currentClick===17||currentClick===24||currentClick===31||currentClick===38) {
        if (boardArray[38] == 0) {
            toFill = 38;
        } else if (boardArray[38] != 0 && boardArray[31] == 0) {
            toFill = 31;
        } else if (boardArray[31] != 0 && boardArray[24] == 0) {
            toFill = 24;
        } else if (boardArray[24] != 0 && boardArray[17] == 0) {
            toFill = 17;
        } else if (boardArray[17] != 0 && boardArray[10] == 0) {
            toFill = 10;
        } else if (boardArray[10] != 0 && boardArray[3] == 0) {
            toFill = 3;
        }
    }
     //column 04 logic
     if (currentClick === 4||currentClick === 11||currentClick===18||currentClick===25||currentClick===32||currentClick===39) {
        if (boardArray[39] == 0) {
            toFill = 39;
        } else if (boardArray[39] != 0 && boardArray[32] == 0) {
            toFill = 32;
        } else if (boardArray[32] != 0 && boardArray[25] == 0) {
            toFill = 25;
        } else if (boardArray[25] != 0 && boardArray[18] == 0) {
            toFill = 18;
        } else if (boardArray[18] != 0 && boardArray[11] == 0) {
            toFill = 11;
        } else if (boardArray[11] != 0 && boardArray[4] == 0) {
            toFill = 4;
        }
    }
      //column 05 logic
      if (currentClick === 5||currentClick === 12||currentClick===19||currentClick===26||currentClick===33||currentClick===40) {
        if (boardArray[40] == 0) {
            toFill = 40;
        } else if (boardArray[40] != 0 && boardArray[33] == 0) {
            toFill = 33;
        } else if (boardArray[33] != 0 && boardArray[26] == 0) {
            toFill = 26;
        } else if (boardArray[26] != 0 && boardArray[19] == 0) {
            toFill = 19;
        } else if (boardArray[19] != 0 && boardArray[12] == 0) {
            toFill = 12;
        } else if (boardArray[12] != 0 && boardArray[5] == 0) {
            toFill = 5;
        }
    }
     //far right column logic
     if (currentClick === 6||currentClick === 13||currentClick===20||currentClick===27||currentClick===34||currentClick===41) {
        if (boardArray[41] == 0) {
            toFill = 41;
        } else if (boardArray[41] != 0 && boardArray[34] == 0) {
            toFill = 34;
        } else if (boardArray[34] != 0 && boardArray[27] == 0) {
            toFill = 27;
        } else if (boardArray[27] != 0 && boardArray[20] == 0) {
            toFill = 20;
        } else if (boardArray[20] != 0 && boardArray[13] == 0) {
            toFill = 13;
        } else if (boardArray[13] != 0 && boardArray[6] == 0) {
            toFill = 6;
        }
    }

    //adding filled items to winning array for each player
    if (playerTurn == 1) {
        p1Array.push(toFill);
    } else if (playerTurn == 2) {
        p2Array.push(toFill);
    }

    
}



createBoard();
