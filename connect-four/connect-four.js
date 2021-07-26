const ROWS = 6;
const COLS = 7;
const COMBO = 4;
const PLAYERS = ['1','2'];

let currentPlayer = PLAYERS[0]


// USER INPUT FUNCTIONS 

function columnClick(elem) {
    let col = getColumn(elem);
    checkColumn(col);
    styleGrid();
    checkWin();
    setPlayer();
}

$('.clear').click(clearGrid);
$('.new-game').click(newGame)

// RENDER SCREEN FNS ============

function createGrid() {
    $('.grid').css({
        'grid-template-columns': `repeat(${COLS},1fr)`,
        'grid-template-rows': `repeat(${ROWS},1fr)`
    })

    // ROWS LOOP
    for(let i=0; i<ROWS; i++) {
        // COLUMNS LOOP
        for(let j=0; j<COLS; j++) {
            let cell = `<div class="cell row-${i} col-${j}" id="c${i}${j}"></div>`
            $('.grid').append(cell);
        }
    }
}

function styleGrid() {
    for(let i=ROWS-1; i>=0; i--) {
        for(let j=0; j<COLS; j++) {
            let cellValue = takenCells[i][j]
            if(PLAYERS.includes(cellValue)) {
                styleCell(cellValue, i, j);
            } 
        }
    }
}

function clearGrid() {
    takenCells = resetTakenCells();
    $('.cell').removeClass('player-1').removeClass('player-2');
    currentPlayer = PLAYERS[0]
    setPlayerText();
}

function styleCell(value, row, col) {
    $(`#c${row}${col}`).addClass(`player-${value}`);
}

function createColumnButtons() {
    for(let i=0; i<COLS; i++) {
        let btn = `<button class="column-button" id="btn-${i}">&downarrow;</button>`;
        $('.column-button-container').append(btn);
        $(`#btn-${i}`).click(function() {
            columnClick(this);
        })
    }
}

function setPlayerText() {
    $('.player').text(`Player ${currentPlayer}`);
}

function winScreen() {
    $('.win-screen').css({
        'display': 'flex',
        'justify-content': 'space-around',
        'align-items': 'center',
        'flex-direction': 'column'
    })
}

function newGame() {
    $('.win-screen').css({
        'display': 'none'
    });
    clearGrid();
    currentPlayer = `Player ${PLAYERS[0]}`;
    $('.player').text(currentPlayer);
}

// CELL TRACKER FNS ==============

function resetTakenCells() {
    let takenCells = [];
    // ROWS LOOP
    for(let i=0; i<ROWS; i++) {
        takenCells[i] = []
        // COLUMNS LOOP
        for(let j=0; j<COLS; j++) {
            takenCells[i][j] = `c${i}${j}`;
        }
    }
    return takenCells;
}

// WIN VALIDATION FNS ============

function checkWin() {
    // checkHorizontal();
    // checkVertical();
    // leftShiftDiagonal();
    checkCell();
}

function checkArray(arr, loopEnd1, loopEnd2, offset) {
    for(let i=0; i<loopEnd1; i++) {
        for(let j=0; j<=(loopEnd2-offset); j++) {
            let set = arr[i].slice(j,(j+offset));
            if(checkSet(set)) {
                winScreen();
            }
        }
    }
}

function checkHorizontal() {
    checkArray(takenCells, ROWS, COLS, COMBO);
}

function checkVertical() {
    let colArray = transposeArray(takenCells)
    checkArray(colArray, COLS, ROWS, COMBO);
}

function leftShiftDiagonal() {
    let diagonalArrays = [];
    for(let i=0; i<=(ROWS-COMBO); i++) {
        let diagonalArray = [];
        for(let j=i; j<ROWS; j++) {
            diagonalArray.push(takenCells[j].slice((j-i),COLS))
        }
        diagonalArrays.push(diagonalArray);
    }
    let diagonalArrays2 = diagonalArrays.map((e) => transposeArray(e));
    diagonalArrays2 = cleanArray(diagonalArrays2);
    diagonalArrays2.forEach((e1) => {
        for(let i=0; i<5; i++) {
            for(let j=0; j<=(e1[i].length-COMBO); j++) {
                let set = e1[i].slice(j,(j+COMBO));
                if(checkSet(set)) {
                    winScreen();
                }
            }
        }
    });
}

let comboCount = 0;

function checkCell() {
    for(let i=ROWS-1; i>=0; i--) {
        for(let j=0; j<COLS; j++) {
            console.log('checkCell called');
            let cell = takenCells[i][j];
            if(PLAYERS.includes(cell)) {
                comboCount = 1;
                checkNeighbor(cell,i,j);
            }
        }
    }
}


function checkNeighbor(value,row,col) {
    if(checkNeighborInner(row,col,'UL',value) || checkNeighborInner(row,col,'U',value) || checkNeighborInner(row,col,'UR',value) || checkNeighborInner(row,col,'R',value)){
        console.log('WINNER');
        winScreen();
    }
}

function checkBoundary(row,col) {
    return (row<0 || col<0 || row>(ROWS-1) || col>(COLS-1)) ? false : true
}


function checkNeighborInner(row,col,neighbor,baseValue) {
    let cNR = 0;
    let cNC = 0;
    if(neighbor==='UL') {
        cNR = row-1;
        cNC = col-1;
    } else if(neighbor==='U') {
        cNR = row-1;
        cNC = col;
    } else if(neighbor==='UR') {
        cNR = row-1;
        cNC = col+1;
    } else if(neighbor==='R') {
        cNR = row;
        cNC = col+1;
    } else {
        console.log('Invalid Neighbor')
    }
    // console.log(`${cNR}   ${cNC}`)
    if(checkBoundary(cNR,cNC)) {
        let cellNeighbor = takenCells[cNR][cNC];
        if(baseValue === cellNeighbor) {
            comboCount++;
            if(comboCount < COMBO) {
                return checkNeighborInner(cNR,cNC,neighbor,baseValue);
            } else {
                return true
            }
        }
        comboCount = 1;
        return false
    }
    comboCount = 1;
    return false
}


function checkSet(arr) {
    return arr.every((e) => e === arr[0])
}

// HELPER FNS ====================

function getColumn(elem) {
    return elem.id[elem.id.length - 1];
}

function checkColumn(col) {
    for(let i=0; i<takenCells.length - 1; i++) {
        if(PLAYERS.includes(takenCells[i+1][col])) {
            takenCells[i][col] = currentPlayer;
            return
        }
    }
    takenCells[takenCells.length - 1][col] = currentPlayer;
}

function setPlayer() {
    currentPlayer = currentPlayer===PLAYERS[0] ? PLAYERS[1] : PLAYERS[0];
    setPlayerText();
}

let takenCells = resetTakenCells();
createColumnButtons();
createGrid();
setPlayerText();