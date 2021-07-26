const WINNING_PATTERNS = [
    ['00','01','02'],
    ['10','11','12'],
    ['20','21','22'],
    ['00','10','20'],
    ['01','11','21'],
    ['02','12','22'],
    ['00','11','22'],
    ['02','11','20']
]
const ROWS = 3;
const COLS = 3;
const COMBO = 3;
const SYMBOLS = ['X','O'];
const PLAYERS = ['Player 1', 'Player 2'];

let currentSymbol = SYMBOLS[0];
let currentPlayer = PLAYERS[0];


$('.cell').click(function() {
    setCell(this);
    console.log(takenCells);
})

$('.clear').click(clearText);
$('.new-game').click(newGame);

function createGrid() {
    $('.game').css({
        'grid-template-columns': `repeat(${COLS},1fr)`,
        'grid-template-rows': `repeat(${ROWS},1fr)`
    })

    $('.player').text(currentPlayer);

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

function resetTakenCells() {
    let takenCells = {}
    // ROWS LOOP
    for(let i=0; i<ROWS; i++) {
        // COLUMNS LOOP
        for(let j=0; j<COLS; j++) {
            takenCells[`${i}${j}`] = `${i}${j}`;
        }
    }
    return takenCells;
}

function setPlayer() {
    currentPlayer = currentPlayer===PLAYERS[0] ? PLAYERS[1] : PLAYERS[0];
    $('.player').text(currentPlayer);
}

function setText(elem) {
    $(elem).text(currentSymbol);
    currentSymbol = currentSymbol===SYMBOLS[0] ? SYMBOLS[1] : SYMBOLS[0];
    setPlayer();
    console.log('Taken Cells: ', takenCells);
}

function clearText() {
    $('.cell').text('');
    takenCells = resetTakenCells();
}

function setCell(elem) {
    let clickedCell = elem.id.slice(1);
    if(!(SYMBOLS.includes(takenCells[clickedCell]))) {
        takenCells[clickedCell] = currentSymbol;
        setText(elem);
        checkWin();
    }
}

function winScreen() {
    $('.win-screen').css({
        'display': 'flex',
        'justify-content': 'space-around',
        'align-items': 'center',
        'flex-direction': 'column'
    })
}

function checkWin() {
    WINNING_PATTERNS.forEach((e) => {
        let arrTaken = [takenCells[e[0]], takenCells[e[1]], takenCells[e[2]]]
        if(arrTaken.every((v) => v === arrTaken[0])) {
            winScreen();
        }
    })
}

function newGame() {
    $('.win-screen').css({
        'display': 'none'
    });
    clearText();
    currentPlayer = PLAYERS[0];
    $('.player').text(currentPlayer);
}

createGrid();
let takenCells = resetTakenCells();
