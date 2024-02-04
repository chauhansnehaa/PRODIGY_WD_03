 // Game state
 let currentPlayer = 'X';
 let gameBoard = ['', '', '', '', '', '', '', '', ''];
 let gameActive = true;

 // DOM Elements
 const boardElement = document.getElementById('board');
 const statusElement = document.getElementById('status');

 // Create cells in the board
 for (let i = 0; i < 9; i++) {
     const cell = document.createElement('div');
     cell.className = 'cell';
     cell.setAttribute('data-index', i);
     cell.addEventListener('click', handleCellClick);
     boardElement.appendChild(cell);
 }

 // Event handler for cell clicks
 function handleCellClick(event) {
     const index = event.target.getAttribute('data-index');

     // Check if the cell is empty and the game is still active
     if (gameBoard[index] === '' && gameActive) {
         // Update the game board and the UI
         gameBoard[index] = currentPlayer;
         event.target.textContent = currentPlayer;

         // Check for a winner
         if (checkWinner()) {
             statusElement.textContent = `Player ${currentPlayer} wins!`;
             gameActive = false;
         } else if (isBoardFull()) {
             // Check for a tie
             statusElement.textContent = 'It\'s a tie!';
             gameActive = false;
         } else {
             // Switch player
             currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
             statusElement.textContent = `Player ${currentPlayer}'s turn`;
         }
     }
 }

 // Function to check for a winner
 function checkWinner() {
     const winPatterns = [
         [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
         [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
         [0, 4, 8], [2, 4, 6]             // Diagonals
     ];

     for (const pattern of winPatterns) {
         const [a, b, c] = pattern;
         if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
             return true;
         }
     }

     return false;
 }

 // Function to check if the board is full (tie)
 function isBoardFull() {
     return gameBoard.every(cell => cell !== '');
 }