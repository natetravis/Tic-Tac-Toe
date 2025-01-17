let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    X: 0,
    O: 0
};

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Initialize the game board
function initializeGame() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    updateScoreDisplay();
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#8B4513' : '#654321';

    if (checkWin()) {
        scores[currentPlayer]++;
        updateScoreDisplay();
        document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        animateWin();
        return;
    }

    if (checkDraw()) {
        document.getElementById('status').textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

// Check for win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

// Check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
}

// Reset game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });
    
    document.getElementById('status').textContent = "Player X's turn";
}

// Reset scores
function resetScores() {
    scores.X = 0;
    scores.O = 0;
    updateScoreDisplay();
    resetGame();
}

// Animate winning cells
function animateWin() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => gameBoard[index] === currentPlayer)) {
            combination.forEach(index => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.style.backgroundColor = '#90EE90';
                cell.style.transform = 'scale(1.1)';
            });
        }
    });
}

// Event listeners
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('resetScores').addEventListener('click', resetScores);

// Initialize the game when the page loads
initializeGame();
