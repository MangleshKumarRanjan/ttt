const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');
let cells = document.querySelectorAll('.cell');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      statusElement.textContent = `Player ${board[a]} Wins!`;
      return;
    }
  }

  if (!board.includes('')) {
    isGameActive = false;
    statusElement.textContent = "It's a Draw!";
  }
}

function handleClick(event) {
  const index = event.target.getAttribute('data-index');

  if (board[index] === '' && isGameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isGameActive) {
      statusElement.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  statusElement.textContent = `Player X's Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
