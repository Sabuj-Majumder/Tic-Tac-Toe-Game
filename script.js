const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 200);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== null)) {
        setTimeout(() => alert('Draw!'), 200);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
