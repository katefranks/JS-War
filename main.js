
function Player(name) {
    this.name = name;
    this.hand = [];
}

function Game({player1, player2}) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
}
const player1Name = prompt('What is your name Player 1?');
const player2Name = prompt('What is your name Player 2?');
const game = new Game({player1Name, player2Name});
console.log(game.player1.name);
console.log(game.player2.name);
console.log(game.player1.hand);
console.log(game.player2.hand);





////////////// Practicing Conditionals ///////////////////

// // const name = prompt("What is your name?");
// // const message = "Hello " + name + ", let's play War!";
// // console.log(message);
//
//
// /*
//   1. Store correct answers
//    - When quiz begins, no answers are correct
// */
//
// let correct = 0;
// // let correct = 0;
//
// // // 2. Store the rank of a player
// //
//
// let rank = '';
// // let rank = '';
//
//
// // // 3. Select the <main> HTML element
// //
// const body = document.querySelector('body');
//
// /*
//   4. Ask at least 5 questions
//    - Store each answer in a variable
//    - Keep track of the number of correct answers
// */
// const question1 = prompt("What color is the sky?");
//   if (question1.toUpperCase() === 'BLUE') {
//     correct += 1;
//     alert(`You're correct! You're score is ${correct}`);
//   } else {
//     alert("Sorry, that's wrong");
//   }
//
// const question2 = prompt("What color is a stop sign?");
//   if (question2.toUpperCase() === 'RED') {
//     correct += 1;
//     alert(`You're correct! You're score is ${correct}`);
//   } else {
//     alert("Sorry, that's wrong");
//   }
// //
// const question3 = prompt("What color is a duck?");
//   if (question3.toUpperCase() === 'YELLOW') {
//     correct += 1;
//     alert(`You're correct! You're score is ${correct}`);
//   } else {
//     alert("Sorry, that's wrong");
//   }
// //
// //
//  const question4 = prompt("What color is the ocean?");
//   if (question4.toUpperCase() === 'BLUE') {
//     correct += 1;
//     alert(`You're correct! You're score is ${correct}`);
//   } else {
//     alert("Sorry, that's wrong");
//   }
// //
// //
// const question5 = prompt("What color is an alligator?");
//   if (question5.toUpperCase() === 'GREEN') {
//     correct += 1;
//     alert(`You're correct! You're score is ${correct}`);
//   } else {
//     alert("Sorry, that's wrong");
//   }
// /*
//   5. Rank player based on number of correct answers
//    - 5 correct = Gold
//    - 3-4 correct = Silver
//    - 1-2 correct = Bronze
//    - 0 correct = No crown
// */
//
//
// if (correct === 5) {
//   rank = "gold";
// } else if (correct >= 3) {
//   rank = "silver";
// } else if (correct >= 2) {
//   rank = 'Bronze';
// } else {
//   rank = 'No Crown';
// }
//
//
//
// body.innerHTML=`<h2>You got ${correct} out of 5 questions correct!</h2>
// <p>Crown Earned: <strong>${rank}</strong></p>`;
