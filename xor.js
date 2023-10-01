document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      const index = cell.dataset.index;
      if (gameBoard[index] === "" && !checkWinner() && currentPlayer === "X") {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = "O";
        if (checkWinner()) {
          alert("Player X wins!");
        } else {
          playAI();
        }
      }
    });
  });

  function playAI() {
    const bestMove = getBestMove();
    if (bestMove !== undefined) {
      gameBoard[bestMove] = currentPlayer;
      cells[bestMove].textContent = currentPlayer;
      currentPlayer = "X";
      if (checkWinner()) {
        alert("Player O wins!");
      }
    }
  }

  function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === "") {
        gameBoard[i] = "O";
        const score = minimax(gameBoard, 0, false);
        gameBoard[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  function minimax(board, depth, isMaximizing) {
    const scores = {
      X: -1,
      O: 1,
      tie: 0
    };

    const winner = checkWinner();
    if (winner !== null) {
      return scores[winner];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    return gameBoard.includes("") ? null : "tie";
  }
});
