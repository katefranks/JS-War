let Card = (function(){
      Card = function(deckIndex){
        this.deckIndex = deckIndex; //0-51 index in deck
        this.value = (deckIndex % 13)+1; //value of card 1-13
      };
//if J, Q, K, A:
  Card.prototype = {
    get number() {
      switch(this.value) {
        case 11:
          return 'J';
        case 12:
          return 'Q';
        case 13:
          return 'K';
        case 1:
          return 'A';
        default:
          return this.value;
      }
      return this.value;
    };

  return Card;
})();

console.log(new Card(13));

/////// To play game:

let deck = Array.apply(null, Array(52)).map(function('', i){
  return new Card(i);
});

for( var i = 0 ; i < 13 ; i++ ){
  console.log(deck[i]);
}

// assign player decks

let playerDeck1 = [], playerDeck2 = [],
    drawIndex;

// deal Cards

while( deck.length > 0 ){
  //player1 deck
  drawIndex = Math.random() * deck.length;
  playerDeck1.push( deck.splice(drawIndex, 1)[0] );

  // Draw Card for CPU
  drawIndex = Math.random() * deck.length;
  playerDeck2.push( deck.splice(drawIndex.player2, 1)[0] );

}

////// PLAY
///Player w/ high card adds both to deck, tie- play another card.

let drawAndPlay = function(highCard){
  if( highCard ){ console.log('High Card = ', highCard); }

  if( playerDeck1.length === 0 || playerDeck2.length === 0 ){
    // game over
    if( playerDeck1.length > 0 ){
      console.log('Player1 Wins');
    } else {
      console.log('Player2 Wins');
    }
    return false;
  }

  // each player draws

  let playerCard1 = playerDeck1.shift();
  let playerCard2 = playerDeck2.shift();
  let highCard = highCard ? highCard : [];
  let playerpoints1 = [];
  let playerpoints2 = [];


        if( playerCard1.value === playerCard2.value ){
          console.log('tie', playerCard1, playerCard2);
          // tie- play another card
          highCard.push(playerCard1);
          highCard.push(playerCard2);
          return drawAndPlay(rewards);
        } else if( playerCard1.value > playerCard2.value ){
          console.log('Player 1 wins round', playerCard1, playerCard2);

          /////////Need to figure out how to add points to score
          // playerPoints1.push(highCard);

          // assign card values to player 1 deck
          playerDeck1.splice(playerDeck1.length, 0, playerCard1, playerCard2);
          if( highCard.length > 0 ){
            playerDeck1 = playerDeck1.concat(highCard);
          }

        } else {

          console.log('Player 2 wins round', playerCard1, playerCard2);

        ////// Need to figure out how to add points
          //playerPoints2.push(highCard);

          // assign card values to player 2 deck
          playerDeck2.splice(playerDeck2.length, 0, playerCard2, playerCard1);
          if( highCard.length > 0 ){
            playerDeck2 = playerDeck2.concat(highCard);
          }

        }

        console.log('Player 1: Cards left = '+playerDeck1.length, 'Player 2: Cards left = '+playerDeck2.length);
        return true;
      };




////////////////////


// function Player(name) {
//     this.name = name;
//     this.hand = [];
// }
//
// function Game({player1, player2}) {
//     this.player1 = new Player(player1Name);
//     this.player2 = new Player(player2Name);
// }
// const player1Name = prompt('What is your name Player 1?');
// const player2Name = prompt('What is your name Player 2?');
// const game = new Game({player1Name, player2Name});
// console.log(game.player1.name);
// console.log(game.player2.name);
// console.log(game.player1.hand);
// console.log(game.player2.hand);
