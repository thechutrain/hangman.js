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
    // this.factBox.innerHTML = update;
    this.factBox.appendChild(update);
  },

  displayGuessesLeft: function(guessLeftNumber){
    // takes a number and displays the guesses left
    this.guessesLeftWrapper.innerHTML = guessLeftNumber;
  },

  displayKeyboard: function(correctArray, incorrectArray){
    // takes in 2 arrays of correct letters & incorrect letters
    // if none in both, sets everything to default

    // 1.) Loop through add the buttons 
    var lettersArray = this.keyboardBox.children;
    // console.log(letters);
    for (var i = 0; i < lettersArray.length; i++){
      // console.log(lettersArray[i].getAttribute("data-letter"));
      var button = lettersArray[i];
      var letter = lettersArray[i].getAttribute("data-letter");
      // console.log(button);
      // console.log(letter);

      // debugger;
      // I.) check to see if button is a correct letter
      if (correctArray.indexOf(letter)>=0){
        //Ia.) add class btn btn-success
        button.className = "btn btn-success";
        //Ib.) add attribute disabled
        button.setAttribute("disabled", "disabled");
      } else if (incorrectArray.indexOf(letter)>=0){
      // II.) Check to see if the button is incorrect letter
        //IIa.) add class btn btn-danger
        button.className = "btn btn-danger";
        //IIb.) add addtribute disabled
        button.setAttribute("disabled", "disabled");
      } else {
      // III.) set the button to default class
      button.className = "btn btn-default";
      }
    } // closes for loop

// ////////////////////////
  },

  displayMessage: function(messageString, messageType, setTimer){
    // will display either a success message or warning message
    // 1) create new div element, and set the class to alert
    var update = document.createElement("div");
    // 2.) Switch statement on message type, add the appropriate class name
    switch (messageType){
      case "success":
        update.className += "alert alert-success";
      break;
      case "info":
        update.className += "alert alert-info";
      break;
      case "warning":
        update.className += "alert alert-warning";
      break;
      case "danger":
        update.className += "alert alert-danger";
      break;
    }
    // 3.) update the message
    update.innerHTML = messageString;
    // 4.) update the message console
    this.messageBox.appendChild(update);
    // 5.) set timer to remove message
    // 5a.) see if there is a specific time, if not set default
    if (setTimer == undefined){
        var setTimer = 3000;
    }
    // 5b.) Run the timer and remove messages with loop
    setTimeout(function(){
      while(this.messageBox.firstChild){
        this.messageBox.removeChild(this.messageBox.firstChild);
      }
    }, setTimer);
  },

  displayQuestion: function(questionString){
    // will display the question for the specific country
    this.questionWrapper.innerHTML = questionString;

  },

  displayWord: function(wordString){
    // will display the the current word
    this.wordWrapper.innerHTML = wordString;
  },


} // closes View object

// TESTING VIEW
// for (x in view){
//   console.log(view[x]);
//   console.log("--------");
// }

// TESTING VIEW
// view.displayFact(["awesome fact 1", "another awesome fact"]);
// view.displayGuessesLeft(3);
// view.displayQuestion("Which country has the largest number of timezones?");
// view.displayWord("Un_t_d Stat_s of Am_r_ca");
// view.displayMessage("testing", "info", 5000);
// view.displayMessage("you did something wrong!", "warning");
// view.displayMessage("BAD, you lost!", "danger");
// view.displayKeyboard(["A", "B"], ["C"]);
