// console.log("This is a test!");

/*
hangman Model
====================
1.) keeps track of overall game stats
2.) keeps track of word
3.) keeps track of user guesses
4.) checks to see if guess is correct or not
*/
var model = {
  // PROPERTIES
  wins: 1,
  loses: 0,

  userGuesses: 0,
  guessesAllowed: 7,
  gameOver: false,


  currentWord: "John Adams",
  incorrectLetters: ["b", "c"],
  correctLetters: [],

  // METHODS
  guessesLeft: function(){
    console.log(this.guessesAllowed - this.userGuesses);
  },

  // checks to see if the game is over or not 
  isGameOver: function(){
    if ((this.guessesAllowed - this.userGuesses) == 0){
      this.gameOver = true;
      console.log("Game over!");
    } else{
      console.log("GAME IS NOT OVER!");
    }
  }

}

/*
Hangman View
====================
1.) will update the keyboard
2.) send message to user
*/


/*
Code snippets:
*/

// Make an Event Listener that will wait  
document.addEventListener("keyup", function(event){
  // Check if the user is

  // get the user's guess
  console.log(event);
  // 


})






