// console.log("This is a test!");

/*
Hangman game
*/
var hangmanGame = {
  wins: 1,
  loses: 0,
  userGuesses: 0,
  guessesAllowed: 7,
  currentWord: "John Adams",
  incorrectLetters: ["b", "c"],
  correctLetters: [],

  guessesLeft: function(){
    console.log(this.guessesAllowed - this.userGuesses);
  }

}