/*
============================================================
View
============================================================
1.) will update the keyboard GUI
2.) send message to user
*/
var view = {
  //Properties
  messageElement: document.getElementById("messages"),
  // Methods
  updateMessage: function(messageString){
    this.messageElement.innerHTML = messageString;
    // have the message disappear after 5 seconds!
    // setTimeout(function(){}, 5000);
    // console.log("Hi");
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
  currentWordArray: ["j", "o", "h", "n", "=", "a", "d","a","m", "s"],
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
    // return an array:
    // [boolean of whether is was valid or not, "Error Message"]
    // 1.) check that its a letter
    if (event.keyCode < 65 || event.keyCode > 90){
      view.updateMessage(event.key + " is not a letter");
      return [false, "Not a letter"];
    } 
    // 2.) check that it has not been guessed yet
    else if (this.lettersGuessed.indexOf(event.key) >= 0){
      view.updateMessage(event.key + " was ALREADY guessed!");
      return [false, "Already Guessed"];
    }
    // assume its a valid guess otherwise
    return [true, "Valid Guess"];
  },

  // checks if the guess is in word or not
  processGuess: function(userGuess){
    // returns the letter(str) if its found, else undefined
    // console.log("Inside model.processGuess: " + userGuess);
    // 1.) add letter to the letters guessed
    this.lettersGuessed.push(userGuess);
    // 2.) if letter is in word, return the letter
    if (this.currentWordArray.indexOf(userGuess) >= 0){
      return true; // this will be a string
    }
    // 3.) if letter is not in the word, return flase
    return false; 
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
    // get the user's input!!
    var userGuess = event.key;

    //1.) check to see if the game is done / frozen (function will update! )
    if (model.isGameDone()){
      // if user won, update view
      if (model.userWon){
        console.log("You won, congrats");
        view.updateMessage("You won, congrats");
      } else{
        console.log("Better luck next time kiddo!");
        view.updateMessage("Better luck next time!");
      }
      // Do Not Proceed!
      return;
    }

    //2.) check to see if the user input is valid
    var validResults = model.isValidGuess(event);
    // console.log(validResults); // array[boolean if valid, error message]
    if (!validResults[0]){
      view.updateMessage(validResults[1]);
      // Do Not Proceed!
      return;
    }

    //3.) process the guess
    if(model.processGuess(userGuess)){
      // the user had a correct vote!
      view.updateMessage(userGuess + " is a correct guess!");
    } else{
      view.updateMessage("Sorry, no " + userGuess);
    }

  },
} //closes controller



/*
============================================================
Set up the event listener!!
============================================================
*/
document.addEventListener("keyup", controller.keyupEventListener);




