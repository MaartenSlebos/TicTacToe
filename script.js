// The gameboard (IIFE module pattern)
const Gameboard = (function() {
  const board = ['', '', '', '', '', '', '', '', ''];

  return {
      placeMarker: function(position, symbol) {
          if (position >= 0 && position < board.length && board[position] === '') {
              board[position] = symbol;
              return true;
          } else {
              return false;
          }
      },
      getBoard: function() {
          return [...board];
      },
      resetBoard: function() {
          for (let i = 0; i < board.length; i++) {
              board[i] = '';
          }
      }
  };
})();

// Player objects (Factory function)
const playerFactory = function(name, symbol) {
  return {
      getName: function() {
          return name;
      },
      getSymbol: function() {
          return symbol;
      }
  };
};

// The Game Controller (IIFE module pattern)
const GameController = (function() {
  let player1;
  let player2;
  let currentPlayer;
  let gameOver = false;

  const checkWin = function() {
      const board = Gameboard.getBoard();
      if (board[0] !== '' && board[0] === board[1] && board[1] === board[2]) {
          return true; // Top row win
      } else if (board[3] !== '' && board[3] === board[4] && board[4] === board[5]) {
          return true; // Middle row win
      } else if (board[6] !== '' && board[6] === board[7] && board[7] === board[8]) {
          return true; // Bottom row win
      } else if (board[0] !== '' && board[0] === board[3] && board[3] === board[6]) {
          return true; // Left column win
      } else if (board[1] !== '' && board[1] === board[4] && board[4] === board[7]) {
          return true; // Middle column win
      } else if (board[2] !== '' && board[2] === board[5] && board[5] === board[8]) {
          return true; // Right column win
      } else if (board[0] !== '' && board[0] === board[4] && board[4] === board[8]) {
          return true; // Diagonal (top left to bottom right) win
      } else if (board[2] !== '' && board[2] === board[4] && board[4] === board[6]) {
          return true; // Diagonal (top right to bottom left) win
      } else {
          return false;
      }
  };

  const checkTie = function() {
      const board = Gameboard.getBoard();
      let boardFilled = true;

      for (let i = 0; i < board.length; i++) {
          if (board[i] === '') {
              boardFilled = false;
              break;
          }
      }

      if (boardFilled && !checkWin()) {
          return true;
      }
      return false;
  };

  const controller = {
        playMove: function(position) {
          if (gameOver || !player1 || !player2) return;
          const moveMade = Gameboard.placeMarker(position, currentPlayer.getSymbol());
          if (moveMade) { // Only continue if the move was successful
              if (checkWin()) {
                  gameOver = true;
                  console.log(currentPlayer.getName() + " wins!");
              } else if (checkTie()) {
                  gameOver = true;
                  console.log("It’s a tie!");
              } else {
                  if (currentPlayer === player1) {
                      currentPlayer = player2;
                  } else {
                      currentPlayer = player1;
                  }
              }
          }
      },
      resetGame: function() {
          Gameboard.resetBoard();
          currentPlayer = player1;
          gameOver = false;
      },
      getCurrentPlayer: function() {
          return currentPlayer;
      },
      isGameOver: function() {
          return gameOver;
      },
      setPlayers: function(name1, name2) {
          if (!name1 || !name2) return; // Don’t set if either name is empty
          player1 = playerFactory(name1, 'X');
          player2 = playerFactory(name2, 'O');
          currentPlayer = player1;
          gameOver = false;
          Gameboard.resetBoard();
      },
      getWinner: function() {
          return checkWin() ? currentPlayer : null;
      }
  };

  return controller; // No initial setPlayers call
})();

// The Display Controller (IIFE module pattern)
const DisplayController = (function() {
  return {
      render: function() {
          const cells = document.querySelectorAll('.cell');
          const board = Gameboard.getBoard();
          for (let i = 0; i < cells.length; i++) {
              cells[i].textContent = board[i];
          }
      },
      init: function() {
          const cells = document.querySelectorAll('.cell');
          cells.forEach(cell => {
              cell.addEventListener('click', () => {
                  const index = parseInt(cell.dataset.index);
                  GameController.playMove(index);
                  DisplayController.render();
                  DisplayController.updateResult();
              });
          });
          DisplayController.updateResult(); // Initial display
      },
      startGame: function() {
          const p1Name = document.getElementById('player1-name').value.trim();
          const p2Name = document.getElementById('player2-name').value.trim();
          if (p1Name && p2Name) {
              GameController.setPlayers(p1Name, p2Name);
              DisplayController.render();
              DisplayController.updateResult();
          } else {
              document.getElementById('result').textContent = "Please enter both player names!";
          }
      },
      updateResult: function() {
          const result = document.getElementById('result');
          if (!GameController.getCurrentPlayer()) {
              result.textContent = "Please enter names and click Start to begin!";
          } else if (GameController.isGameOver()) {
              const winner = GameController.getWinner();
              result.textContent = winner ? winner.getName() + " wins!" : "It’s a tie!";
          } else {
              result.textContent = GameController.getCurrentPlayer().getName() + "’s turn";
          }
      }
  };
})();

DisplayController.init();
document.getElementById('start').addEventListener('click', DisplayController.startGame);