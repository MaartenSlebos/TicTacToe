// The gameboard (IIFE module pattern)

const Gameboard = (function() {

    const board = ['', '', '', '', '', '', '', '', '']

    return {
      placeMarker: function() {

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

// The Game Controller (IIFE module pattern)

const gameController = (function() {

    return {

    };
  })();


console.log(Gameboard.getBoard())
console.log(Gameboard.resetBoard())