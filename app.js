// JavaScript source code
let player = 1;
function makeGrid(size) {
    const grid = document.getElementById("grid");
    grid.innerHTML = '';

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', tileClicked);

        const row = Math.floor(i / size);
        const col = i % size;


        if ((row + col) % 2 === 0) {
            tile.classList.add('odd');
        }
        else {
            tile.classList.add('even');
        }

        grid.appendChild(tile);
    }
}

function tileClicked(event) {
    const tile = event.target;
    if (player === 1) {
        tile.classList.add('player1');
    }
    else {
        tile.classList.add('player2');
    }
    player *= -1;
}

//makeGrid(10);