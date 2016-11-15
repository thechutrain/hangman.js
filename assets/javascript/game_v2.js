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
  },
  createWordBoard: function(length, spaces){
    // this function will be given the length of the word &
    // an array containing the indexes of where there are spaces
    // ex.) __ __ __   __ __ __ __ __
    console.log("view.createWordBoard was called!");
    // 1) get the parent node
    var container = document.getElementById("wordBody");

    // 2.) get the child node
    var oldWrapper = document.getElementById("wordWrapper");

    // 3.) make a new child node that will replace the original
    // make sure it has same attributes
    var newWrapper = document.createElement("div"); 
    newWrapper.setAttribute("id", "wordWrapper");
    newWrapper.setAttribute("class", "v2");
      // 3a.) make cookie cutter of letter-wrapper

      // 3b.) make cookie cutter of no-letter-wrapper

      // 3c.) loop through the length of the array

        // check to see if index is a value in spaces(array)

            //i.) if yes, then append a no-letter-wrapper

            //ii.) if no, then append a letter-wrapper

          // either way set attribute id = index
    // 4.) replace the old child with new child
    debugger
    container.replaceChild(newWrapper, oldWrapper);



  },
  updateWordBoard: function(letter, array_of_hits){
    // this function will be given a letter and array containing
    // the indexes of where those letters go and highlight them
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
  userViewCurrentWordArray: [],
  lettersGuessed: [],


  // METHODS
  arrayifyWord: function(){
    // takes the current word, and creates two arrays
    // for userView and currentWordArray
    // console.log(this); // returns model!
    var word = this.currentWord;
    // console.log(this.currentWord);
    var letter;
    for (var i=0; i< word.length; i++){
      letter = word[i];
      if (letter==" "){
        this.currentWordArray.push("//");
        this.userViewCurrentWordArray.push("//");
      } else{
        // nameArray.push("");
        this.currentWordArray.push(letter.toUpperCase());
        this.userViewCurrentWordArray.push(" ");
      }
    }
  },

  newGame: function(){
    console.log("Loading a new game!!");
    // this function resets the model, and calls a function to get a random word
    this.currentWordArray = [];
    this.userViewCurrentWordArray = [];
    this.arrayifyWord();
    // Reset incorrect guesses & letters guessed duhhhh
    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
  },

  didUserWin: function(){
    // function returns true if user won
    var array = this.userViewCurrentWordArray;
    for (var i=0; i < array.length; i++){
      if(array[i] == " "){
        return false;
      }
    }
    return true;
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
    }
    // user still has guesses left and has not won yet!
    return false;
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
    else if (this.lettersGuessed.indexOf(event.key.toUpperCase()) >= 0){
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
    var userGuessUpper = userGuess.toUpperCase();
    this.lettersGuessed.push(userGuessUpper);
    // 2.) if letter is in word, return the letter
    if (this.currentWordArray.indexOf(userGuessUpper) >= 0){
      console.log(userGuessUpper + " was found!");
      // Comment to self: maybe I should simplify names ot 
      // arrayKey and arrayUser ...
      // Since indexOf only finds the first occurance, loop
      // through arrayKey and find all matches of the correct guesses
      // and set those index hits to arrayUser
      var arrayKey = this.currentWordArray;
      var arrayUser = this.userViewCurrentWordArray
      for (var i = 0; i < arrayKey.length; i++){
        if(arrayKey[i]==userGuessUpper){
          arrayUser[i]=userGuessUpper;
        }
      }
      return true; // this will be a string
    }
    else{
    // 3.) if letter is not in the word, +=1 incorrect guess, and return false
    this.incorrectGuesses +=1;
    return false; 
    }
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
  // this function checks to see if you should continue or not
  continue: function(){
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
      // DO NOT PROCEED because the game is done
      return false;
    }
    return true;
  },

  test: function(){
    // TO DO!!!
    // console.log("Event listener succesfully calls controller method!");
    // 1.) Tell the model to start a new game
    model.newGame();
    // 1a.) also tell the user that there's been a new word:
    view.updateMessage("New Game - button was pressed!!");
    // 2.) Update the view, specifically the word container / display
    view.createWordBoard(5, []);
    // DEBUGGING
    // console.log("The new game button was pressed");

  },

  // This takes a keyup event, and will process the key input
  keyupEventListener: function(event){
    // debugging purposes
    // console.log("Inside keyupEvent Listener!");
    // get the user's input!!
    var userGuess = event.key;

    // MAKE INTO A FUNCTION
    //1.) check to see if the game is done / frozen (function will update! )
    if (this.continue() == false){
      return;
    }

    //2.) check to see if the user input is valid
    var validResults = model.isValidGuess(event);
    // console.log(validResults);
    // debugger
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


    // MAKE INTO A FUNCTION
    if (this.continue() == false){
      return;
    }

  },
} //closes controller



/*
============================================================
Set up the event listener!!
============================================================
*/
window.addEventListener("load", model.newGame.bind(model));
document.getElementById("newGame").addEventListener("click", controller.test);
document.addEventListener("keyup", controller.keyupEventListener.bind(controller));




