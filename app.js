// JavaScript source code
let player = 1;
const board = [];
let player1Count = 3;
let player2Count = 3;

function makeGrid(size) {
    const grid = document.getElementById("grid");
    grid.innerHTML = '';

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        if (i % size == 0) {
            board[i / size] = [];
        }
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', tileClicked);

        const row = Math.floor(i / size);
        const col = i % size;

        tile.dataset.row = row;
        tile.dataset.col = col;
        const startCol = ((size - 1) / 2 - 1) <= col && col <= ((size - 1) / 2 + 1);
        if (row === 0 && startCol) {
            tile.classList.add('player2-territory');
        }
        else if (row === size - 1 && startCol) {
            tile.classList.add('player1-territory');
        }
        else if ((row + col) % 2 === 0) {
            tile.classList.add('odd');
        }
        else {
            tile.classList.add('even');
        }

        board[row][col] = tile;
        grid.appendChild(tile);
    }
}

function markTerritory(row, col, player) {
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            try {
                const tile = board[row + i][col + j];
                if (!isOwned(tile)) {
                    tile.classList.add(player + '-territory');
                    if (player === 'player1') {
                        player1Count += 1;
                    }
                    else {
                        player2Count += 1;
                    }
                }
            }
            catch { }
        }
    }
}

function tileClicked(event) {
    const tile = event.target;
    if (tile.classList.contains('player1') || tile.classList.contains('player2')) {
        return;
    }
    if (!tile.classList.contains('player' + (player*-0.5+1.5) + '-territory')) {
        return;
    }

    const row = parseInt(tile.dataset.row);
    const col = parseInt(tile.dataset.col);

    if (player === 1) {
        tile.classList.add('player1');
        player1Count -= 1;
        markTerritory(row, col, 'player1');
        if (tile.classList.contains('player2-territory')) {
            player2Count -= 1;
        }
    }
    else {
        tile.classList.add('player2');
        player2Count -= 1;
        markTerritory(row, col, 'player2');
        if (tile.classList.contains('player1-territory')) {
            player1Count -= 1;
        }
    }
    player *= -1;

    if (player1Count <= 0 || player2Count <= 0) {
        //gameOver)
    }
}

function isOwned(tile) {
    return tile.classList.contains('player1') || tile.classList.contains('player2');
}

//makeGrid(10);