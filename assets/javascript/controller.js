/*
============================================================
Controller
============================================================
1.) will update the keyboard GUI
2.) send message to user
*/
var controller = {
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
  }
};


/*
============================================================
Set up the event listener!!
============================================================
*/

function processGuess(){

  // 1.) Get the letter the User entered: either through button or key
  var guess = "d".toUpperCase();

// 2.) Check if the letter is a valid guess
  //2a.) Get array from validGuess method
  var validatorResults = model.validGuess(guess);
  // 2b) check to see if it passed or not (first element will be success)
  if (validatorResults[0] != "success"){
    // if it didn't pass, display the error message
    view.displayMessage(validatorResults[0], validatorResults[1]);
    return false;
  }

// 3.) Process the guess / check if the letter is in word
  // console.log(model.checkGuess(guess));
  if (model.checkGuess(guess)){
  // 3A.) If the letter is Correct
      // display the success message
      view.displayMessage("success", "\'" + guess + "\'" + " was found");
      // update the view of the word

  // 3B.) Check if the user WON
  } else {
    // 3B) If the letter is not Correct
     view.displayMessage("danger", "\'" + guess + "\'" + " was NOT found");
     // 3B) Check if Loser LOST
  }


}
model.initializeGame();
controller.updateView();
processGuess();
controller.updateView();
// controller.showAnswer();

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