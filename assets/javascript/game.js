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
  totalWins: 1,
  totalLoses: 0,

  totalGuesses: 0,
  guessesAllowed: 7,
  freezeGame: false,
  userWon: false,


  currentWord: "John Adams",
  incorrectLetters: ["b", "c"],
  correctLetters: [],
  lettersGuessed: [],

  // METHODS
  guessesLeft: function(){
    console.log(this.guessesAllowed - this.totalGuesses);
  },

  // checks to see if the game is over or not 
  isGameDone: function(){
    if ((this.guessesAllowed - this.totalGuesses) == 0){
      this.freezeGame = true;
    };
    // TO DO: check if user won game or not
    if (false){
      this.freezeGame = true;
      this.userWon = true;
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
  // Part 0: get what the user pressed!
  // get the key that the user pressed
  // console.log(event.key);
  var userGuess = event.key;

  // Part1: Check to see if the game is over
  // TO DO: FUNCTIONALIZE THIS later!!
  model.isGameDone();
  if (model.freezeGame){
    // User already won?
    if (model.userWon){
        console.log("You won! Play again?");
      // TO DO: Play again?
      // write code if user presses enter, you reset game!
      return;
    } else{
      console.log("Game is over, try again?");
      // TO DO: Play again?
      // write code if user presses enter, you reset game!
      return;
    }
  }



// Part 2: GAME is not over, so lets check what the user guessed!
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
    // update user total guesses, only for incorrect guesses!
    model.totalGuesses +=1;
  };
  // *Always excute below code, since we have been given 
  // a valide new guess!
  (function(){
    // update user guesses to model
    model.lettersGuessed.push(userGuess);
    // console.log(model.lettersGuessed);
    // console.log(model.totalGuesses);
    // And update the guess count
    console.log("You have: " + (model.guessesAllowed - model.totalGuesses) + " guesses left.");
  })();



  // Part 3 or Part 1 AGAIN: Check to see if the game is over
  // TO DO: FUNCTIONALIZE THIS!!
  model.isGameDone();
  if (model.freezeGame){
    // User already won?
    if (model.userWon){
        console.log("You won! Play again?");
      return;
    } else{
      console.log("Game is over, try again?");
      return;
    }
  }
    


})






