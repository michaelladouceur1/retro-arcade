const WINNING_PATTERNS = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]
const ROWS = 3;
const COLS = 3;
const COMBO = 3;
const SYMBOLS = ['X','O']


let currentSymbol = SYMBOLS[0]

function createGrid() {
    $('.game').css({
        'grid-template-columns': `repeat(${COLS},1fr)`,
        'grid-template-rows': `repeat(${ROWS},1fr)`
    })

    // ROWS LOOP
    for(let i=0; i<ROWS; i++) {
        // COLUMNS LOOP
        for(let j=0; j<COLS; j++) {
            let cell = `<div class="cell row-${i} col-${j}" id="c${i}${j}"></div>`
            $('.game').append(cell);
            $(`#c${i}${j}`).click(function() {
                setCell(this);
            })
        }
    }
}

$('.clear').click(clearText);

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
    console.log(takenCells);
    return takenCells;
}

function setText(elem) {
    $(elem).text(currentSymbol);
    currentSymbol = currentSymbol===SYMBOLS[0] ? SYMBOLS[1] : SYMBOLS[0];
}

function clearText() {
    $('.cell').text('');
    takenCells = resetTakenCells();
}

function setCell(elem) {
    let clickedRow = elem.id.slice(1,2);
    let clickedCol = elem.id.slice(2,3);
    if(!(SYMBOLS.includes(takenCells[clickedRow][clickedCol]))) {
        takenCells[clickedRow][clickedCol] = currentSymbol;
        setText(elem);
        checkWin();
    }
}

function checkWin() {
    // WINNING_PATTERNS.forEach((e) => {
    //     let arrTaken = [takenCells[e[0]], takenCells[e[1]], takenCells[e[2]]]
    //     if(arrTaken.every((v) => v === arrTaken[0])) {
    //         console.log(`Winner at ${e}`)
    //     }
    // })
    checkRows(takenCells);
    checkCols(takenCells);
}

function setWin() {
    console.log('WINNER');
    clearText();
}

function checkEquality(arr) {
    arr.forEach((a) => {
        if(a.every((e) => e === a[0])) {
            setWin();
        }
    })
}

function checkRows(arr) {
    checkEquality(arr);
}

function checkCols(arr) {
    let cols = arr[0].map((e, colIndex) => arr.map(e => e[colIndex]));
    checkEquality(cols);
}

function checkDiag(arr) {
    let leftShift = arr
}

createGrid();
let takenCells = resetTakenCells();








































const WINNING_PATTERNS = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]
let currentSymbol = 'X'

$('.cell').click(function() {
    setCell(this);
    console.log(takenCells);
})

$('.clear').click(clearText);

function resetTakenCells() {
    let takenCells = {}
    for(let i=1; i<10; i++) {
        takenCells[i] = i;
    }
    return takenCells;
}

function setText(elem) {
    $(elem).text(currentSymbol);
    currentSymbol = currentSymbol==='X' ? 'O' : 'X';
    console.log('Next Symbol: ', currentSymbol)
}

function clearText() {
    $('.cell').text('');
    takenCells = resetTakenCells();
}

function setCell(elem) {
    let clickedCell = elem.id.slice(1);
    if(takenCells[clickedCell] !== 'X' || takenCells[clickedCell] !== 'O') {
        takenCells[clickedCell] = currentSymbol;
        setText(elem);
        checkWin();
    }
}

function checkWin() {
    WINNING_PATTERNS.forEach((e) => {
        let arrTaken = [takenCells[e[0]], takenCells[e[1]], takenCells[e[2]]]
        if(arrTaken.every((v) => v === arrTaken[0])) {
            console.log(`Winner at ${e}`)
        }
    })
}

let takenCells = resetTakenCells();