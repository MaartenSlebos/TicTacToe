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

  return {
    playMove: function(position) {
      Gameboard.placeMarker(position, currentPlayer.getSymbol());
      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    }
  };
})();



