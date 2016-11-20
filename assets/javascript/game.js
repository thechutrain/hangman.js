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
  updateMessage: function(messageString, warningFlag){
    if(!warningFlag){
      this.messageElement.innerHTML = messageString;
    }
    else {
      // remove the hidden tag from the div
      var container = document.querySelector("#warning-message-container");
      container.className = "";
      document.querySelector("#warning-message").innerHTML = "Warning: " + messageString;
      // update the warning message & dissappear after 3seconds ..
      setTimeout(function(){
        // add the hidden tag!
          container.className = "hidden";
      }, 2500);

    }
    // console.log("Updating message ...");
    // setTimeout(function(){console.log("Done!");}, 3000);

    // have the message disappear after 5 seconds!
    // setTimeout(function(){}, 5000);
    // console.log("Hi");
  },

  updateKeyboard: function(correctLettersArray, wrongLettersArray){
  /*this function takes in an array of correct letters, and wrong
  letters and updates the keyboard to look that way. */
  var correctLettersArray = correctLettersArray;
  var wrongLettersArray = wrongLettersArray;
  
  // loop through all the keyboard-letter elements
  var alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
  "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
  "W", "X", "Y", "Z"];

  for (var i=0; i < alphabetArray.length; i++){
    // console.log(alphabetArray[i]);
    // get the keyboard-letter element's id
    var letter = alphabetArray[i];
    if (correctLettersArray.indexOf(letter) >= 0){
      // if the id is in correctLettersArray
      // add the correct-letter classs
      var element = document.querySelector("#" + letter);
      element.className += " correct-letter";
    } else if (wrongLettersArray.indexOf(letter) >= 0){
       // else if the id is in the wrongLettersArray
      // add the wrong-letter class
      var element = document.querySelector("#" + letter);
      element.className += " wrong-letter";
    }
  };
  },

  resetKeyboard: function(){
    /* this function reset the view of the keyboard so
    that previous classes are removed*/
    var alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
  "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
  "W", "X", "Y", "Z"];
    for (var i=0; i < alphabetArray.length; i++){
      document.querySelector("#" + alphabetArray[i]).className = "keyboard-letter";
    }

  },

  updateStats: function(statsArray){
    //this function with accept an array of stats and update the
    // view with those stats
    // Update the guesses left
    var guessesLeft = document.querySelector("#guessesLeft");
    guessesLeft.innerHTML = statsArray[0];
  },

  resetStats: function(){
    var guessesLeft = document.querySelector("#guessesLeft");
    guessesLeft.innerHTML = model.guessesAllowed; // ??? should I let the view access the model?
  },

  updateWord: function(wordArray){
    // this function will be given the length of the word &
    // an array of the word to display
    // ex.) __ __ __   __ __ __ __ __
    // 1) get the parent node
    var container = document.getElementById("wordBody");

    // 2.) get the child node
    var oldWrapper = document.getElementById("wordWrapper");

    // 3.) make a new child node that will replace the original
    // make sure it has same attributes
    var newWrapper = document.createElement("div"); 
    newWrapper.setAttribute("id", "wordWrapper");
    // newWrapper.setAttribute("class", "v4");

    // 3a.) make cookie cutter of letter or space nested element
    var makeBox = function(id_num, letter_bool, optional_letter){
      var text, childClass, parentClass;
      // console.log(optional_letter);
      // debugger
      if(letter_bool){
        text = " ";
        childClass = "letter";
        parentClass = "letter-wrapper";
      } else{
        text = "//";
        childClass = "space";
        parentClass = "no-letter-wrapper";
      }
      // Now make it!
       // create grandchild
        // * make element, set attributes, make text node, append text node
        var grandChild = document.createElement("p");
        grandChild.setAttribute("id", id_num.toString());
        // check to see if there's a letter:
        if(optional_letter){
          var letterText = document.createTextNode(optional_letter);
        } else{
          var letterText = document.createTextNode(text);
        }
        grandChild.appendChild(letterText);

        // create child
        // * make the child element, set class, and append child to it
        var child = document.createElement("div");
        child.setAttribute("class", childClass);
        child.appendChild(grandChild);

        // create parent
        var parent = document.createElement("div");
        parent.setAttribute("class", parentClass);
        parent.appendChild(child);

        // return the box!
        return parent;
    };

    // 3c.) loop through the length of the array, and if its not a "//" (space)
    // make a letter element box
      for (var i=0; i < wordArray.length; i++){ 
        var element;
        // check to see if index is a value in spaces(array)
        if (wordArray[i]=="//"){
          // should be a space
          element = makeBox(i, false);
        } else if(wordArray[i]==" "){
          // should be empty letter
          element = makeBox(i, true);
        } else {
          // display the letter
          element = makeBox(i, true, wordArray[i]);
        }
        // In both cases, I'll append the newely made element into wrapper element
        newWrapper.appendChild(element);
      }
    // 4.) replace the old child with new child
    container.replaceChild(newWrapper, oldWrapper);
  },
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
  // create 
  // gameData: {
  //   totalWins: 0,
  //   totalLoses: 0,
  //   totalRounds: 0,
  //   famousPeople: ["Albert Einstein", "John F Kennedy"],

  // },
  // wordLibrary array will contain random names that will
  // include many presidents and will choose one for the game!
  wordLibrary: ["Bill Clinton", "George Washington", "John F Kennedy", 
  "John Adams", "Thomas Jefferson", "Ronald Reagan", "Lyndon B Johnson",
  "Richard Nixon", "George W Bush", "Barrack Obama", "Andrew Jackson",
  "Harry Truman", "Dwight D Eisenhower", "Grover Cleveland"],
  incorrectGuesses: 0,
  guessesAllowed: 7,
  guessesLeft: 7,
  freezeGame: false,
  userWon: false,
  currentWord: "",
  currentWordArray: [],
  userWordArray: [],
  lettersGuessed: [],
  // ADDED TWO MORE PROPERTIES
  correctLettersArray: [],
  wrongLettersArray: [],


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
        this.userWordArray.push("//");
      } else{
        // nameArray.push("");
        this.currentWordArray.push(letter.toUpperCase());
        this.userWordArray.push(" ");
      }
    }
  },

  getRandomWord: function(){
    var arrayLength = this.wordLibrary.length;
    var randomIndex = Math.floor(Math.random()* arrayLength);
    // console.log(this.wordLibrary[randomIndex]);
    // debugger
    return this.wordLibrary[randomIndex];
  },

  newGame: function(){
    this.currentWord = this.getRandomWord();
    console.log("Loading a new game!!");
    // this function resets the model, and calls a function to get a random word
    this.currentWordArray = [];
    this.userWordArray = [];
    this.correctLettersArray = [];
    this.wrongLettersArray = [];
    this.arrayifyWord();
    // Reset incorrect guesses & letters guessed duhhhh
    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
    this.userWon = false;
  },

  didUserWin: function(){
    // function returns true if user won
    var array = this.userWordArray;
    for (var i=0; i < array.length; i++){
      if(array[i] == " "){
        return false;
      }
    }
    return true;
  },

  guessesLeft: function(){
    return this.guessesAllowed - this.incorrectGuesses;
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
      view.updateMessage(event.key + " is not a letter", true);
      return [false, "Not a letter"];
    } 
    // 2.) check that it has not been guessed yet
    else if (this.lettersGuessed.indexOf(event.key.toUpperCase()) >= 0){
      view.updateMessage(event.key + " was ALREADY guessed!", true);
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
      // Add the correct letter to array:
      this.correctLettersArray.push(userGuessUpper);
      // console.log(userGuessUpper + " was found!");
      // console.log(this.correctLettersArray);
      // debugger;
      

      var arrayKey = this.currentWordArray;
      var arrayUser = this.userWordArray
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
    this.wrongLettersArray.push(userGuessUpper);
    // console.log(this.wrongLettersArray);
    // debugger
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
  initializeGame: function(){
    model.newGame();
    view.updateWord(model.userWordArray);
  },

  // this function checks to see if you should continue or not
  continue: function(){
    //1.) check to see if the game is done / frozen (function will update! )
    if (model.isGameDone()){
      // if user won, update view
      if (model.userWon){
        console.log("You won, congrats");
        view.updateMessage("You won, congrats", false);
      } else{
        console.log("Better luck next time kiddo!");
        view.updateMessage("Better luck next time!", false);
      }
      // DO NOT PROCEED because the game is done
      return false;
    }
    return true;
  },

  newWord: function(){
    // console.log("Event listener succesfully calls controller method!");
    // 1.) Tell the model to start a new game
    model.newGame();
    // 1a.) also tell the user that there's been a new word:
    view.updateMessage("New Game - button was pressed!!", true);
    // 2.) Update the view, specifically the word container / display
    view.updateWord(model.userWordArray);
    // DEBUGGING
    // console.log("The new game button was pressed");
        // resets keyboard
    // 3.) Reset the keyboard & stats!
    view.resetKeyboard();
    view.resetStats();

  },

  // This takes a keyup event, and will process the key input
  keyupEventListener: function(event){
    // debugging purposes
    // console.log("Inside keyupEvent Listener!");
    // get the user's input!!

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
      view.updateMessage(validResults[1], true);
      // Do Not Proceed!
      return;
    }

    //3.) process the guess
    var userGuess = event.key;
    if(model.processGuess(userGuess)){
      // the user had a correct vote!
      view.updateMessage(userGuess + " is a correct guess!", false);
      view.updateWord(model.userWordArray);
    } else{
      view.updateMessage("Sorry, no " + userGuess, false);
    }

    // 4.) Update the view of the keyboard!
    var correctLetters = model.correctLettersArray;
    var incorrectLetters = model.wrongLettersArray;
    view.updateKeyboard(correctLetters, incorrectLetters);

    //5.) Update the view of the stats!
    // get the array of data
    var statsData = [
    model.guessesLeft(),
    ];
    view.updateStats(statsData);





    // MAKE INTO A FUNCTION
    if (this.continue() == false){
      return;
    }

    /* 
    TESTING CODE HERE within the eventListener
    */


  },
} //closes controller



/*
============================================================
Set up the event listener!!
============================================================
*/
window.addEventListener("load", controller.initializeGame.bind(controller));
document.getElementById("newGame").addEventListener("click", controller.newWord);
document.addEventListener("keyup", controller.keyupEventListener.bind(controller));




