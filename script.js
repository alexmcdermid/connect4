let boardArray = [];
let board = document.querySelector(".board"); 
let squares = document.querySelectorAll(".board div");
let playerTurn = 1;
let playerTurnEl = document.querySelector("h1");
let currentClick = null;
let toFill = null;

Array.from(squares).forEach(square=> {
    square.addEventListener('click', clickSquare)
})

//event listener which tracks square clicks and then calls render 
function clickSquare() {
    let click = parseInt(this.dataset.id);
    currentClick = click;
    update();
    render();

}

// createBoard function fills boardArray with circle data all set to 0
function createBoard(){ 
    for(let i=0;i<42;i++){ 
    //add item with num 0-2 to boardArray, 0empty, 1red, 2yellow to keep track of data in js
    let boardItem = [0];
    boardArray.push(boardItem);
    } 
}

function render() {
    squares.forEach(function(e) {

        if (!e.classList.contains('p1')&&!e.classList.contains('p2')) {
            if(e.getAttribute('data-id') == toFill && playerTurn == 1) {
                e.classList.remove('square');
                e.classList.add('p1');
                boardArray[toFill] = 1;
                playerTurn = 2;
            }
            else if(e.getAttribute('data-id') == toFill && playerTurn == 2) {
                e.classList.remove('square');
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
     console.log(currentClick);
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
}



createBoard();
