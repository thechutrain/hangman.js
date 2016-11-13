// console.log("This is a test!");

/*
============================================================
Model
============================================================
1.) keeps track of overall game stats
2.) keeps track of word
3.) keeps track of user guesses
4.) checks to see if guess is correct or not
*/
var model = {
  // PROPERTIES
  wins: 1,
  loses: 0,

  totalGuesses: 0,
  guessesAllowed: 7,
  gameOver: false,


  currentWord: "John Adams",
  incorrectLetters: ["b", "c"],
  correctLetters: [],
  lettersGuessed: ["r"],

  // METHODS
  guessesLeft: function(){
    console.log(this.guessesAllowed - this.totalGuesses);
  },

  // checks to see if the game is over or not 
  isGameOver: function(){
    if ((this.guessesAllowed - this.totalGuesses) == 0){
      this.gameOver = true;
    }
  },

}

/*
============================================================
View
============================================================
1.) will update the keyboard
2.) send message to user
*/


/*
============================================================
Controller
============================================================
1.) Will contain the event listeners
2.) Will tell the model to update itself
3.) Will tell the view to update itself
*/

// Make an Event Listener that will wait  
// 2 ways to make an event listener
// document.onkeyup = function(event){
//   console.log(event.key);
// };

document.addEventListener("keyup", function(event){
  // Part1: Check to see if the game is not over
  model.isGameOver();
  if (model.gameOver){
    console.log("Game is over, play again?");
    return;
  }

  // TO DO: Play again?
  // write code if user presses enter, you reset game!

  // Part 2: GAME is not over, so lets check what the user guessed!
  // get the key that the user pressed
  // console.log(event.key);
  var userGuess = event.key;

  // CHECKS ON THE EVENT
  // 1.) check that its a letter
  if (event.keyCode < 65 || event.keyCode > 90){
    console.log("Sorry, " + event.key +" is not a valid letter");
    // TO DO: alert user to only pick letters :)
    return;
  } 
  // else{
  //   console.log(event.key + " is a letter!");
  // }

  // 2.) check that it has not been guessed yet
  if (model.lettersGuessed.indexOf(userGuess)!=-1){
    console.log(userGuess + " has already been guessed");
    return;
  };

  // 3.) check if it's correct
    // 3a.) if correct --> update view, & update game
  if (model.currentWord.indexOf(userGuess)!=-1){
    console.log(userGuess + " is in the currentWord: " + model.currentWord);
  } else{
    // 3b.) if its not correct --> update view
    console.log(userGuess + " is NOT in the currentWord: " + model.currentWord);
  };



  // check if the letter has been guessed already 
  // check to see if user's guess is correct

    // if guess is correct, add letters to board

    //}
    


})






