/*
============================================================
View
============================================================
*/
var view = {
  // view - Properties, all are DOM variables
  mapBox: document.querySelector("#worldMap"),
  factBox: document.querySelector("#factBox"),
  keyboardBox: document.querySelector("#keyboardBox"),
  messageBox: document.querySelector("#messageBox"),
  questionWrapper: document.querySelector("#questionBox"),
  wordWrapper: document.querySelector("#wordBox"),
  // STATS related
  // statsBox: document.querySelector("#statsBox"),
  guessesLeftWrapper: document.querySelector("#guessesLeftWrapper"),
  totalCorrectWrapper: document.querySelector("#totalCorrectWrapper"),

  // View - methods
  /** this function will display the google map of the country
  * @param {str} country - the country that will be highlighted
  * @return - does not return anything
  */
  displayMap: function(country){
    // takes a country name string and updates view so that it will
    // highlight that country. If no string, displays no country

    google.charts.load('upcoming', {'packages':['geochart']});
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {

      if (country == undefined){
        var data = google.visualization.arrayToDataTable([
        ["Country"],
        ]);   
      } else {
        var data = google.visualization.arrayToDataTable([
          ["Country"],
          [country],
        ]);
      }

      var options = {enableRegionInteractivity: false};

      var chart = new google.visualization.GeoChart(document.getElementById('worldMap'));

      chart.draw(data, options);
    }

  },
  /** this function will display the facts & sources on facts of the country
  * @param {array} factsArray - an array of facts
  * @param {array} sourcesArray - an array of the sources associated with the facts
  * @return - does not return anything
  */
  displayFact: function(factsArray, sourcesArray){
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
      //3b.) create the source text
      var source = " <a href='" + sourcesArray[i] + "' alt='link to source' target='_blank'>[source]</a>";
      //3c.) update that text to the li element
      li.innerHTML = factsArray[i] + source;

      //3d.) append the whole li element to the ul
      update.appendChild(li);
    }
    // 4.) append new update
    // this.factBox.innerHTML = update;
    this.factBox.appendChild(update);
  },

  /** this function will display guesses left to the user
  * @param {number} guessesLeft- the number of guesses left
  * @return - does not return anything
  */
  displayGuessesLeft: function(guessesLeft){
    // takes a number and displays the guesses left
    // if the number is 0, set the color to red too!
    // 1.) Check to see if the number is zero
    if (guessesLeft <= 0){
      this.guessesLeftWrapper.className = "red-text";
    } else {
      this.guessesLeftWrapper.className = "";
    }
    // 2.) 
    this.guessesLeftWrapper.innerHTML = guessesLeft;
  },

  /** this function will display a message to User
  * @param {str} messageType - an array of facts
  * @param {str} messageString - an array of the sources associated with the facts
  * @oara {number} setTimer
  * @return NONE - does not return anything
  */
////////////////////////// TO DO!!!! // ////////////////////////
// display only one message at a time
  displayMessage: function(messageType, messageString, setTimer){
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
    // console.log(update);
    // 4.) update the message console
    this.messageBox.appendChild(update);
    // 5.) set timer to remove message
    // 5a.) see if there is a specific time, if not set default
    if (setTimer == undefined){
        var setTimer = 2000;
    }
    // 5b.) Run the timer and remove messages with loop
    setTimeout(function(){
      this.messageBox.firstChild.nextElementSibling.remove();
    }, setTimer);
  },

  /** this function will display question for the word
  * @param {str} questionString - a string that contains the question for the specific country
  * @return NONE - does not return anything
  */
  displayQuestion: function(questionString){
    // will display the question for the specific country
    this.questionWrapper.innerHTML = questionString;
  },

  /** this function will display the word, and will be called to update the display
  * @param {array} wordArray - an array of the current word
  * @return NONE - does not return anything
  */
  displayWord: function(wordArray){
    // will display the the current word
    var wordString = "";
    for (var i=0; i < wordArray.length; i++){
      switch(wordArray[i]){
        case " ":
        wordString+="_&nbsp;";
        // console.log("underscore");
        break;
        case "//":
        wordString+="&nbsp;&nbsp;&nbsp;";
        // console.log("//");
        break;
        default:
        wordString+= (wordArray[i].toUpperCase() + "&nbsp;");
        // console.log("letter");
        break;
      }
    }
        this.wordWrapper.innerHTML = wordString;
  },

  /** this function will display the total points of the user
  * @param {number} points - the total points the user has
  * @return NONE - does not return anything
  */
  displayTotalCorrect: function(points){
    this.totalCorrectWrapper.innerHTML = points;
  },

} // closes View object



// ---------------- TESTING ---------------------
// TESTING VIEW
// for (x in view){
//   console.log(view[x]);
//   console.log("--------");
// }

// TESTING VIEW
// view.displayTotalCorrect(4);
// view.displayFact(["awesome fact 1", "another awesome fact"]);
// view.displayGuessesLeft(3);
// view.displayGuessesLeft(1);
// view.displayGuessesLeft(2);
// view.displayQuestion("Which country has the largest number of timezones?");
// view.displayWord("Un_t_d Stat_s of Am_r_ca");
// view.displayWord(["a", "", "A", "//", "A", "A"]);
// view.displayMessage("testing", "info", 5000);
// view.displayMessage("you did something wrong!", "warning");
// view.displayMessage("BAD, you lost!", "danger");
// view.displayKeyboard(["A", "B"], ["C"]);
// view.displayMap("France");
// console.log("France");
// view.displayMap();
