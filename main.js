(function(){
  'use strict';


//what does it mean to have a card- have a value (also suit if you want)
const Card = function({value, suit} = {}){
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
  return `${values[this.value]} of ${suits[this.suit]}`;
}


// defining what it means to be a deck- a deck has cards (52)
const Deck = function(){
  this.cards = [];

  for(let i = 0; i < 4; i++) { //getting 4 suits
    for (let j = 2; j <= 14; j++){ //getting 13 cards per suit
      this.cards.push(new Card({suit: i, value: j}));
      // this.cards.push(new Card({this.suit[i], value: j}));
    }
  }
}
//to be a deck you have cards, 52 cards, to be a card you have a value and a suit.


const Player = function({name} = {}){
  this.name = name;
  this.hand = [];
  this.cardCount = 0;
  this.draw = null;
}

const Game = function() {
  const player1 = prompt('Enter player one name');
  const player2 = prompt('Enter player two name');

  this.player1= new Player ({name: player1});
  this.player2= new Player ({name: player2});
  this.deck = new Deck();
  this.pot = [];
}


Game.prototype.shuffle = function(deck){
  let i = deck.length, j, temp; //j and temp are undefined

  while(i--){ //this is saying "as long as while is not 0"
    j = Math.floor(Math.random() * (i + 1)); //gets random # between 0-52, then rounds down
    temp = deck[i]; //sets temp to value of deck[i]
    deck[i] = deck [j]; //changes the value of deck[i] to a random number
    deck[j] = temp; //moves the original value of deck[i] to temp
  }
}

// going to deal to player- player has name and hand

Game.prototype.deal = function(){
//to make deal method shuffle:
  this.shuffle(this.deck.cards); //game.shuffle would call the shuffle method that was created

  this.player1.hand = this.deck.cards.filter((item, index) => !(index %2));
  this.player2.hand = this.deck.cards.filter((item, index) => index %2);
    //this is taking the index, dividing it by 2, & giving back remainder. If there's a remainder (some value other than 0) it will be true, and then depending on whether it's player 1 or 2 you flip it.
    // player 1 will get the 1st, 3rd, 5th... etc. player2 will get 2nd, 4th, 6th... etc.

  this.player1.cardCount = this.player1.hand.length;
  this.player2.cardCount = this.player2.hand.length;
}


Game.prototype.draw = function(){
  const player1Card = this.player1.hand.shift();
  const player2Card = this.player2.hand.shift();

  this.player1.cardCount -= 1;
  this.player2.cardCount -= 1;

    //if you go through all of cards and card count is at zero, you need to shuffle your deck
    //shuffling cards after we go through what we won/lost

  if(!this.player1.cardCount){
    this.shuffle(this.player1.hand);
  }

  if(!this.player2.cardCount){
    this.shuffle(this.player2.hand);
  }

  this.player1.draw = player1Card;
  this.player2.draw = player2Card;

  this.pot = [player1Card, player2Card, ...this.pot];
  console.log(`${this.player1.name} draws a ${player1Card.print()}.`);
  console.log(`${this.player2.name} draws a ${player2Card.print()}.`);

  this.compare(player1Card, player2Card);
}

Game.prototype.compare = function(player1Card, player2Card){
  console.log('player 1 card value: ', player1Card.value);
  console.log('player 2 card value: ', player2Card.value);
  if(player1Card.value > player2Card.value) {
    console.log(`${this.player1.name} won the round!`)
    this.player1.hand.push(player1Card, player2Card)
    console.log('player 1 hand: ', this.player1.hand)
    console.log(`${this.player1.name} has ${this.player1.hand.length} cards. ${this.player2.name} has ${this.player2.hand.length} cards.`);
    console.log('player 2 hand: ', this.player2.hand)
  } else if (player1Card.value < player2Card.value) {
    console.log(`${this.player2.name} won the round!`)
    this.player2.hand.push(player1Card, player2Card)
    console.log('player 1 hand: ', this.player1.hand)
    console.log(`${this.player2.name} has ${this.player2.hand.length} cards. ${this.player1.name} has ${this.player1.hand.length} cards.`);
    console.log('player 2 hand: ', this.player2.hand)
  } else //if (player1Card.value === player2Card.value)
  {
    console.log(`It's WAR!`)

  }
}

Game.prototype.play = function(){
  this.shuffle(this.deck.cards); //shuffles cards in deck
  this.deal(); //deals shuffled cards

  console.log(`Let's play WAR!`); //giving some feedback to user
  console.log(`\n`);

  game.draw();
  game.compare();

}

const game = new Game();
game.play();


})();



///// For the draw:

//add while loop that says- as long as player 1 has cards & player 2 has cards, keep drawing and comparing. You only want this to happen if both players have cards to draw.
//let player 1 win if they have the higher card, let player 2 win if they have a higher card. Then come back and fiogure out what to do if they war- set it up initially so player 1 automatically wins war or player 2 automatically wins war, then go back and change it and figure out how to handle war so the same player isn't winning it every time.

// Functions should do 1 thing, and they should do 1 thing really well- makes it so they're easily called.

//make your functions reusable.
