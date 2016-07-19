;(function () {
  angular.module('dwarfMatch')
    .component('gameComponent', {
      controller: GameController,
      templateUrl: 'app/components/game/game.html'
    })

  function GameController ($timeout, GameService) {
    var gc = this;

    // This is a freebie we are using the GameService to help keep our controller clean. The GameService will be in charge of creating and shuffling the deck.
    gc.deck = GameService.getDeck();

    // Create two card variables. These will be responsible
    // for keeping track of our selections as we click cards.
    var card1;
    var card2;

    // Next we need to initate a few more variables on gc for later use
    // Let's add variables for tracking the number of guesses (pairs flipped),
    // for the total number of correct guesses (pairs matched) and finally a
    // victory boolean to let our controller know if we've won. Refer to the index.html
    // for variable names
    gc.attempts = 0;
    gc.pairs = 0;
    gc.victory = false;

    // Next write a selectCard function on gc that accepts a card object on click and
    // let's make it set card.show to true (boolean). Give it a test!
    // After you complete this refer back to readme.md
    gc.selectCard = function(card){
      if (card.show == true || card1 && card2) {
        return;
      }
      card.show = true;
        if (!card1) {
          card1 = card;
          return;
        } else if (!card2) {
          card2 = card;

          if (!isMatch(card1, card2)) {
            $timeout(function(){
              card1.show = false;
              card2.show = false;            
              resetCards();
            }, 1000);
          } else {
            checkVictory();
            resetCards();
          }
        }
    }

    // Write a local resetCards function that will empty our card variables
    // and increase the number of attempts
    function resetCards() {
      card1 = null;
      card2 = null;
      gc.attempts += 1;
    }

    // Next write a local isMatch function that accepts our two cards and if the card titles 
    // match, increases our totalMatches and returns true else returns false. After this refer 
    // back to readme.md
    function isMatch(){
      if (card1.title == card2.title) {
        console.log('match');
        gc.pairs += 1;
        return true;
      }
      console.log('no match');
      return false;
    }

    // Finally, write a local checkVictory function that will set gc.victory = true if the totalMatches 
    // is half the length of the deck. Tip: the game deck array is available at gc.deck. When you're done
    // refer back to readme.md
    function checkVictory(){
      if (gc.pairs == gc.deck.length/2){
        gc.victory = true;
      }
    }

    // Bonus Challenge: Write a function on gc that can reset the game and add a button that calls it
    gc.resetGame = function(){
        gc.deck = GameService.getDeck();
        gc.victory = false;
        gc.attempts = 0;
        gc.pairs = 0;
  }

  }
}())
