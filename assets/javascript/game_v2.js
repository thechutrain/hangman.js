/*
============================================================
View
============================================================
1.) will update the keyboard GUI
2.) send message to user
*/
var view = {
  messageElement: document.getElementById("messages"),
  updateMessage: function(messageString){
   this.messageElement.innerHTML = messageString;
  }
}

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
  // totalWins: 1,
  // totalLoses: 0,
  incorrectGuesses: 0,
  guessesAllowed: 7,
  freezeGame: false,
  userWon: false,
  currentWord: "John Adams",
  currentWordArray: [],
  lettersGuessed: [],
  // incorrectLetters: ["b", "c"],
  // correctLetters: [],

  // METHODS
  // TO DO!!!!
  didUserWin: function(){
    // function returns true if user won
    return false;
  },
  isGameDone: function(){
    // returns true if User is out of guesses or if user has won
    // returns false if the game is not done (!^)
    if (this.guessesAllowed <= this.incorrectGuesses){
      this.freezeGame = true;
      return true;
    }
    else if (this.didUserWin()){
      this.freezeGame = true;
      this.userWon = true;
      return true;
    } else{
    // user still has guesses left and has not won yet!
      return false;
    }
  },

  isValidGuess: function(event){
    // return true if valid guess
    // returns false if guess is not valid
    // 1.) check that its a letter
    if (event.keyCode < 65 || event.keyCode > 90){
      view.updateMessage(event.key + " is not a letter");
      return false;
    } 
    // 2.) check that it has not been guessed yet
    else if (this.lettersGuessed.indexOf(event.key) >= 0){
      view.updateMessage(event.key + " was ALREADY guessed!");
      return false;
    }
    // assume its a valid guess otherwise
    return true;
  },

  // checks if the guess is in word or not
  processGuess: function(event){
    // all letter to the letters guessed

    // if letter is in word, return the letter

    // if letter is not in the word, return 

  },

}

/*
============================================================
Controller
============================================================
1.) will update the keyboard GUI
2.) send message to user
*/
var controller = {
  // This takes an keyup event
  keyupEventListener: function(event){
    // --- DEBUGGING ---
    // console.log(event.keyCode);
    console.log(event.key);

    //1.) check to see if the game is done / frozen (function will update! )
    if (model.isGameDone()){
      // if user won, update view
      if (model.userWon){
        view.updateMessage("You won, congrats");
      } else{
        view.updateMessage("Better luck next time!");
      }
    }

    //2.) check to see if the user input is valid
    if (!model.isValidGuess(event)){
      // don't continue!!
      console.log("that's not a valid letter");
      return false;
    }

    //3.) process the guess
  },
} //closes controller



/*
============================================================
Set up the event listener!!
============================================================
*/
document.addEventListener("keyup", controller.keyupEventListener);




