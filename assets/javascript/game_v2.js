/*
============================================================
View
============================================================
*/
var view ={
  // Properties - DOM variables
  mapBox: document.querySelector("#worldMap"),
  factBox: document.querySelector("#factBox"),
  // statsBox: document.querySelector("#statsBox"),
  guessesLeftWrapper: document.querySelector("#guessesLeftWrapper"),
  keyboardBox: document.querySelector("#keyboardBox"),
  messageBox: document.querySelector("#messageBox"),
  questionWrapper: document.querySelector("#questionBox"),
  wordWrapper: document.querySelector("#wordBox"),


}

// testing view
for (x in view){
  console.log(view[x]);
  console.log("--------");
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





