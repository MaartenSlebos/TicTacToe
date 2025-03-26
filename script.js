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
        return [...board]
      },
      resetBoard: function() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
      }
    };
  })();

// Player objects (Factory function) 
const playerFactory = function (name, symbol) {
  return {
    getName: function() {
      return name; 
    },
    getSymbol: function() {
      return symbol;
    }
  };
}

// The Game Controller (IIFE module pattern)
const GameController = (function() {
  let player1 = playerFactory('Maarten', 'X');
  let player2 = playerFactory('Pieter', 'O');
  let currentPlayer = player1;
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
  }

  const checkTie = function () {
    const board = Gameboard.getBoard(); 
    let boardFilled = true; 

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        boardFilled = false; 
        break; 
      } 
    }

    if (boardFilled && !checkWin()) {
      return true
    }
    return false; 
  };

  return {
    playMove: function(position) {
      if (gameOver) return; // Stop if game’s over
      Gameboard.placeMarker(position, currentPlayer.getSymbol());
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
    },
    resetGame: function () {
      Gameboard.resetBoard();
      currentPlayer = player1; 
      gameOver = false; 
    },
    getCurrentPlayer: function () {
      return currentPlayer; 
    },
    isGameOver: function () {
      return gameOver; 
    }
  };
})();

const DisplayController = (function() {
  

  return {
    render: function() {
      
    }
  };
})();
