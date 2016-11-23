/*
============================================================
Controller
============================================================
1.) will update the keyboard GUI
2.) send message to user
*/
var controller = {
  initializeGame: function(){
    model.initializeGame();
    view.displayMap();
    this.updateView();
    view.displayMessage("success", "New Game", 1000);
  },

  newCountry: function(){
    model.newCountry();
    this.updateView();
    view.displayMap();
    // console.log(this);
    view.displayMessage("success", "New Country", 3500);
  },

  updateView: function(){
  // takes the most up to date model properties, and invokes
  // 1) Update GuessesLeft
  view.displayGuessesLeft(model.guessesLeft);
  // 2.) update the keyboard
  view.displayKeyboard(model.correctLettersArray, model.incorrectLettersArray)
  // 3.) display current word
  view.displayWord(model.userWordArray);
  //4.) display the question
  view.displayQuestion(model.currentCountryObject["question"]);
  //5.) update wins
  view.displayTotalCorrect(model.userWins);
  },

  showAnswer: function(){
      // takes the most up to date model properties, and invokes
  // view methods to display current data
  // this.updateView();
  // 1) display map of country
  view.displayMap(model.currentCountryObject["countryName"]);
  // 2.) display all the facts
  view.displayFact(model.currentCountryObject["facts"]);
  // 3.) display the country
  view.displayWord(model.currentWordArray);
  //4.) update wins
  view.displayTotalCorrect(model.userWins);
  },

  processGuess: function(guess){
  // check to see if the button is the skip button!
  // if (this.getAttribute("data-letter")=="invalid"){
  //   console.log("Not a letter");
  //   return;
  // }

  // var guess = this.getAttribute("data-letter");

  var guess = guess.toUpperCase();
  // 1.) Check if the letter is a valid guess
  //1a.) Get array from validGuess method
  var validatorResults = model.validGuess(guess);
  // 1b) check to see if it passed or not (first element will be success)
  if (validatorResults[0] != "success"){
    // if it didn't pass, display the error message
    view.displayMessage(validatorResults[0], validatorResults[1]);
    return;
  }

// 2.) Process the guess / check if the letter is in word
  // console.log(model.checkGuess(guess));
  if (model.checkGuess(guess)){
  // 2A.) If the letter is Correct
      // display the success message
      view.displayMessage("success", "\'" + guess + "\'" + " was found");
      //2B) update the view of the word
      controller.updateView();
  // 2C.) Check if the user WON
    if (model.userWin()){
      // tell the user they won!
      console.log("YOU won!");
      view.displayMessage("success", "Congratulations, you got the country!");
      // display add the facts etc.
      controller.showAnswer();
      // freeze game - TO DO
    }
  } else {
    // 3A) If the letter is not Correct
     view.displayMessage("danger", "\'" + guess + "\'" + " was NOT found");
     // 3B) update the view of keyboard
    controller.updateView();
     // 3C) Check if Loser LOST
     if (model.userLost()){
      // tell the user they lost
      console.log("You lost!");
      view.displayMessage("danger", "You're out of guesses. Better luck next time!", 8000);
      // display facts 
      controller.showAnswer();
      // freeze game - TO DO
     }
    }
  },

  keyupEventListener: function(event){
    // console.log(event);
    if (event.keyCode < 65 || event.keyCode > 90){
      view.displayMessage("warning", "\"" + event.key + "\"" + " is not a letter");
      return false;
    } else {
      controller.processGuess(event.key);
    }
  },

  buttonEventListener: function(event){
    // console.log(event);
    var letter = event.toElement.childNodes[0].data;
    // console.log(typeof(letter));
    if (letter == "Skip"){
      controller.newCountry();
      console.log("New country");
      return false;
      // controller.newGame();
    } else {
      controller.processGuess(letter);
    }

  },

};


/*
============================================================
Set up the event listener!!
============================================================
*/

// Create an event listener for when the page loads, it initializes the game
window.addEventListener("load", controller.initializeGame.bind(controller));

// create an event listener for when the skip button is clicked
// document.querySelector(".skip").addEventListener("click", controller.newCountry.bind(controller));

// Create an event listener for when a keyboard button is pressed
document.addEventListener("keyup", controller.keyupEventListener);

// ** Add event listener for each button 
//1) first get all the buttons
var allButtons = document.querySelectorAll(".btn-default");
// 2) loop through each button and add the event listener
for (var i = 0; i < allButtons.length; i++){
  allButtons[i].addEventListener("click", controller.buttonEventListener);
}


/*
============================================================
TESTING !!!!
============================================================
*/
// model.initializeGame();
// console.log(model.userWordArray);
// console.log(model.currentWordArray);
// view.displayWord(["C", " ", "N", " ", "//", "D"]);
// view.displayWord(model.userWordArray);

// model.initializeGame();
// controller.updateView();
// processGuess();
// controller.updateView();
// controller.showAnswer();


