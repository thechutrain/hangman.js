/*
============================================================
View
============================================================
*/
var view ={
  // view - Properties, all are DOM variables
  mapBox: document.querySelector("#worldMap"),
  factBox: document.querySelector("#factBox"),
  // statsBox: document.querySelector("#statsBox"),
  guessesLeftWrapper: document.querySelector("#guessesLeftWrapper"),
  keyboardBox: document.querySelector("#keyboardBox"),
  messageBox: document.querySelector("#messageBox"),
  questionWrapper: document.querySelector("#questionBox"),
  wordWrapper: document.querySelector("#wordBox"),

  // View - methods
  displayMap: function(countryNameStr){
    // takes a country name string and updates view so that it will
    // highlight that country. If no string, displays no country
  },

  displayFact: function(factsArray){
    // takes an array of facts, and displays each one
    // as a bullet point 
    // 1.) clear previous HTML
    while(this.factBox.firstChild){
      this.factBox.removeChild(this.factBox.firstChild);
    }
    // 2.) create the update container
    var update = document.createElement("ul");
    // 3.) loop through each fact in the array
    for (var i=0; i< factsArray.length; i++){
      //3a.) create a new li element
      var li = document.createElement("li");
      //3b.) create a new text node for that li element
      //3c.) update that text to the li element
      li.innerHTML = factsArray[i];
      //3d.) append the whole li element to the ul
      update.appendChild(li);
    }
    // 4.) append new update
    this.factBox.appendChild(update);
  },

  displayGuessesLeft: function(guessLeftNumber){
    // takes a number and displays the guesses left
  },

  displayKeyboard: function(correctArray, incorrectArray){
    // takes in 2 arrays of correct letters & incorrect letters
    // if none in both, sets everything to default

  },

  displayMessage: function(messageString, warningBoolean){
    // will display either a success message or warning message
  },

  displayQuestion: function(questionString){
    // will display the question for the specific country

  },

  displayWord: function(wordString){
    // will display the the current word
  },


} // closes View object

// TESTING VIEW
// for (x in view){
//   console.log(view[x]);
//   console.log("--------");
// }

// TESTING VIEW
// view.displayFact(["awesome fact 1", "another awesome fact"]);







/*
============================================================
Model
============================================================
1.) keeps track of overall game stats
2.) keeps track of word
3.) keeps track of user guesses
4.) checks to see if guess is correct or not
*/



/*
============================================================
Controller
============================================================
1.) will update the keyboard GUI
2.) send message to user
*/

/*
============================================================
Set up the event listener!!
============================================================
*/





