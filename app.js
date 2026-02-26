// JavaScript source code
function makeGrid(size) {
    const grid = document.getElementById("grid");
    grid.innerHTML = '';

    grid.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    grid.style.gridTemplateRows = `repeat(${size}, 100px)`;

    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
    }
}

//makeGrid(10);