(function(){
  'use strict';


//what does it mean to have a card- have a value (also suit if you want)
const Card = function(){
  this.value = value;
  this.suit = suit;
}

Card.prototype.print = function(){
  const suits = [
    'spades',
    'diamonds',
    'clubs',
    'hearts',
  ];

  const values = [
    null, //null b/c do not have any values = to 0
    null, //null b/c do not have any values = to 1
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ]
  return `${values[this.value]} of ${suits[this.suit][0].toUpperCase()}${suits[this.suit].slice(1)}}`;
}


// defining what it means to be a deck- a deck has cards (52)
const Deck = function(){
  //need to figure out how to get 52 cards in a deck
  //this.cards = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4....];
  this.cards = [];
  // for(let i = 2; i <=14; i++){
  //   this.cards = [...this.cards, i, i, i, i]; //using spread operator
  // this.suits= ['hearts', 'clubs, diamonds, spades];

  for(let i = 0; i < 4; i++) { //getting 4 suits
    for (let j = 2; j = 14; j++){ //getting 13 cards per suit
      this.cards.push(new Card({suit: i, value: j}));
      // this.cards.push(new Card({this.suit[i], value: j}));
    }
  }
}
//to be a deck you have cards, 52 cards, to be a card you have a value and a suit.

// capital letter letting us know it's a constructor function
const Player = function({name} = {}){
  this.name = name;
  this.hand = [];
  this.cardCount = 0;
  this.draw = null;

}

const Game = function() {
  const player1 = prompt('Enter player one name');
  const player2 = prompt('Enter player two name');

//if the key is the same as the value, you can shorthand it. Instead of being a string, "player" will be an object, an instance of "player"
  // this.player1= new Player ({player1: player1});
  // this.player2= new Player ({player2}); //this is the same as above

//the above doesn't work because you need name on the object passed in, in order to deconstruct the object.
// start asking what it means to be a player- have a hand?. Create player constructor so each player would be it's own object so you could track name & hand
//constructors are cookie cutters- we use them to stamp out objects and pass them properties. We're defining what it maeans to be a player.
  this.player1= new Player ({name: player1});
  this.player2= new Player ({name: player2});
  this.deck = new Deck();
  this.pot = [];

}

//if you have 52 cards, i=52
//while(i--) is shorthand for:

// while(i){
//   i = i - 1;
//   // or  i -= 1;
// }

Game.prototype.shuffle = function(deck){
  let i = deck.length, j, temp; //j and temp are undefined

  while(i--){ //this is saying "as long as while is not 0"
    j = Math.floor(Math.random() * (i + 1)); //gets random # between 0-52, then rounds down
    temp = deck[i];
    deck[i] = deck [j];
    deck[j] = temp;
  }
}

//need a way to deal the shuffled deck:
// every individual 'game' (little g!) instance will access the same prototype. Then if you need to update it you can update it through the prototype
// going to deal to player- player has name na dhand
Game.prototype.deal = function(){
//to make deal method shuffle:
  this.shuffle(this.deck.cards); //game.shuffle would call the shuffle method that was created

  // this.player1.hand = this.deck.cards.filter((item, index) => !(index %2));
  // this.player2.hand = this.deck.cards.filter((item, index) => (index %2));

  //the value of "this" inside a constructor is the object.
  this.player1.hand = this.deck.cards.filter(function(item, index) {
    return !(index %2); //this is taking the index, dividing it by 2, & giving back remainder. If there's a remainder (some value other than 0) it will be true, and then depending on whether it's player 1 or 2 you flip it.
    // player 1 will get the 1st, 3rd, 5th... etc. player2 will get 2nd, 4th, 6th... etc.
  });

  this.player2.hand = this.deck.cards.filter(function(item, index) {
    return index %2;
  });
  //optional- adding this so that when you go through all of cards the first time, go through original 26, shuffle each personal deck-m adds more randomness to the game to avoid any possible loops.
  this.player1.cardCount = this.player1.hand.length;
  this.player2.cardCount = this.player2.hand.length;
}


//opposite of shift & push is unshift & pop. Shift takes 1st card, pop would take last card
Game.prototype.draw = function(){
  const player1Card = this.player1.hand.shift();
  const player2Card = this.player2.hand.shift();

  this.player1.cardCount -= 1;
  this.player2.cardCount -= 1;

    //if you go through all of cards and card count is at zero, you need to shuffle your deck
    //shuffling cards after we go through what we won/lost
    //return value of shift is the element that got removed from the array. The array got changed, put the return value of shift is the element that got shifted out.
          // Example:
          // const array1 = [1, 2, 3];
          // const firstElement = array1.shift();

  if(!this.player1.cardCount){
    this.shuffle(this.player1.hand);
  }

  if(!this.player1.cardCount){
    this.shuffle(this.player1.hand);
  }

  this.player1.draw = player1Card;
  this.player2.draw = player2Card;

  this.pot = [player1Card, player2Card, ...this.pot];
  console.log(`${this.player1.name} draws a ${player1Card.print()}.`);
  console.log(`${this.player2.name} draws a ${player2Card.print()}.`);

}

Game.prototype.play = function(){
  this.shuffle(this.deck.cards);
  this.deal();

  console.log(`Let's play WAR!`); //giving some feedback to user
  console.log(`\n`);

  game.draw();

}

const game = new Game();
game.play();


})();



///// For the draw:

//add while loop that says- as long as player 1 has cards & player 2 has cards, keep drawing and comparing. You only want this to happen if both players have cards to draw.
//let player 1 win if they have the higher card, let player 2 win if they have a higher card. Then come back and fiogure out what to do if they war- set it up initially so player 1 automatically wins war or player 2 automatically wins war, then go back and change it and figure out how to handle war so the same player isn't winning it every time.

// Functions should do 1 thing, and they should do 1 thing really well- makes it so they're easily called.

//make your functions reusable. 





// (function(){
//   'use strict';
//       ///
//       all of code goes in here
//       ///
//
// })();





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



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// let Card = (function(){
//       Card = function(deckIndex){
//         this.deckIndex = deckIndex; //0-51 index in deck
//         this.value = (deckIndex % 13)+1; //value of card 1-13
//       };
// //if J, Q, K, A:
//   Card.prototype = {
//     get number() {
//       switch(this.value) {
//         case 11:
//           return 'J';
//         case 12:
//           return 'Q';
//         case 13:
//           return 'K';
//         case 1:
//           return 'A';
//         default:
//           return this.value;
//       }
//       return this.value;
//     };
//
//   return Card;
// })();
//
// console.log(new Card(13));
//
// /////// To play game:
//
// let deck = Array.apply(null, Array(52)).map(function('', i){
//   return new Card(i);
// });
//
// for( var i = 0 ; i < 13 ; i++ ){
//   console.log(deck[i]);
// }
//
// // assign player decks
//
// let playerDeck1 = [], playerDeck2 = [],
//     drawIndex;
//
// // deal Cards
//
// while( deck.length > 0 ){
//   //player1 deck
//   drawIndex = Math.random() * deck.length;
//   playerDeck1.push( deck.splice(drawIndex, 1)[0] );
//
//   // Draw Card for CPU
//   drawIndex = Math.random() * deck.length;
//   playerDeck2.push( deck.splice(drawIndex.player2, 1)[0] );
//
// }
//
// ////// PLAY
// ///Player w/ high card adds both to deck, tie- play another card.
//
// let drawAndPlay = function(highCard){
//   if( highCard ){ console.log('High Card = ', highCard); }
//
//   if( playerDeck1.length === 0 || playerDeck2.length === 0 ){
//     // game over
//     if( playerDeck1.length > 0 ){
//       console.log('Player1 Wins');
//     } else {
//       console.log('Player2 Wins');
//     }
//     return false;
//   }
//
//   // each player draws
//
//   let playerCard1 = playerDeck1.shift();
//   let playerCard2 = playerDeck2.shift();
//   let highCard = highCard ? highCard : [];
//   let playerpoints1 = [];
//   let playerpoints2 = [];
//
//
//         if( playerCard1.value === playerCard2.value ){
//           console.log('tie', playerCard1, playerCard2);
//           // tie- play another card
//           highCard.push(playerCard1);
//           highCard.push(playerCard2);
//           return drawAndPlay(rewards);
//         } else if( playerCard1.value > playerCard2.value ){
//           console.log('Player 1 wins round', playerCard1, playerCard2);
//
//           /////////Need to figure out how to add points to score
//           // playerPoints1.push(highCard);
//
//           // assign card values to player 1 deck
//           playerDeck1.splice(playerDeck1.length, 0, playerCard1, playerCard2);
//           if( highCard.length > 0 ){
//             playerDeck1 = playerDeck1.concat(highCard);
//           }
//
//         } else {
//
//           console.log('Player 2 wins round', playerCard1, playerCard2);
//
//         ////// Need to figure out how to add points
//           //playerPoints2.push(highCard);
//
//           // assign card values to player 2 deck
//           playerDeck2.splice(playerDeck2.length, 0, playerCard2, playerCard1);
//           if( highCard.length > 0 ){
//             playerDeck2 = playerDeck2.concat(highCard);
//           }
//
//         }
//
//         console.log('Player 1: Cards left = '+playerDeck1.length, 'Player 2: Cards left = '+playerDeck2.length);
//         return true;
//       };



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


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
