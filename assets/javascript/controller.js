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
    this.updateView();
    view.displayMessage("success", "New Game", 1000);
  },

  newCountry: function(){
    model.newCountry();
    this.updateView();
    // console.log(this);
    view.displayMessage("success", "New Country", 1500);
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
  },

  processGuess: function(){
  var guess = this.getAttribute("data-letter");
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
    // TO DO
    console.log(model.userWin());
  } else {
    // 3A) If the letter is not Correct
     view.displayMessage("danger", "\'" + guess + "\'" + " was NOT found");
     // 3B) update the view of keyboard
    controller.updateView();
     // 3C) Check if Loser LOST
     // TO DO
  }

  },
};


/*
============================================================
Set up the event listener!!
============================================================
*/

// Event listeners for loading the page & for the skip button
window.addEventListener("load", controller.initializeGame.bind(controller));
document.querySelector(".skip").addEventListener("click", controller.newCountry.bind(controller));

// ** Add event listener for each button 
//1) first get all the buttons
var allButtons = document.querySelectorAll(".btn-default");

// 2) loop through each button and add the event listener
for (var i = 0; i < allButtons.length; i++){
  allButtons[i].addEventListener("click", controller.processGuess);
}

  // 2a) all the eventlistener indiviually
// document.querySelectorAll("button").addEventListener("click", processGuess);

// document.querySelector(".skip").addEventListener("click", test);

// document.querySelector(".btn").addEventListener("click", test);
// var allButtons = document.querySelectorAll(".btn");
// console.log(allButtons);
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


