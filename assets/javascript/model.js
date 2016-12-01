/*
============================================================
DATA
============================================================
*/
var countryData = [
  {
    "countryName": "United States",
    "question": "What country was I born in?",
    "population": "324,118,787",
    "facts": ["fact 1 US", "fact 2 US"],
    "sourcesFact": ["source fact 1 us", "source fact 2 us"],
    "wiki_url": "https://en.wikipedia.org/wiki/United_States",
  },
  {
    "countryName": "Canada",
    "question": "What country is north of us?",
    "population": "36,286,378" ,
    "facts": ["fact 1 canada - canada is cool", "fact 2 canada"],
    "sourcesFact": ["source fact 1 canada", "source fact 2 canada"],
    "wiki_url": "https://en.wikipedia.org/wiki/Canada",
  },
  {
  "countryName": "Mexico",
  "question": "What country is south of us?",
  "population": "128,632,004  " ,
  "facts": ["fact 1 mexico", "fact 2 mexico"],
  "sourcesFact": ["source fact 1 mexico", "source fact 2 mexico"],
  "wiki_url": "https://en.wikipedia.org/wiki/mexico",
},
];


/*
============================================================
Model
============================================================
*/
var model = {
  // Properties Overall Game
  userWins: 0,
  // Properties of hangman round
  guessesAllowed: 7,
  totalPoints: 0,
  guessesLeft: 3,
  correctLettersArray: ["F"],
  incorrectLettersArray: ["B"],
  currentWord: "France",
  currentWordArray: ["F", "R", "A", "N", "C", "E"],
  userWordArray: ["", "", "//", ""],
  // Hold onto the current country object temporarily
  currentCountryObject: {},
  // TO DO: keep an array of indices of chosen countries etc .
  // indexChoices: [0,1,2],




  // METHODS
  /** this method starts a new game
  * @return NONE - does not return anything
  */
  initializeGame: function(){
    // this function creates the indexChoices, resets all the variables,
    // and also calls the new country function
    this.newCountry();

    console.log("GAME INITIALIZED!");
    console.log(model);
    console.log(" --- END of models.initializeGame --- ");

  },

  /** this method gets a new country
  * @param {array} wordArray - an array of the current word
  * @return NONE - does not return anything
  */
  newCountry: function(){
  // * Nested FUNCTION!
    /** this nested functions takes a word and converts it to an array 
    * of either letters or empty spaces in place of letters
    * @param {str} word - the word that you will turn into an array
    * @param {boolean} showLetter - if true, it'll return an array containing letter values
    * @return {array} arrayifiedWord - an array of the word that was in the arguments
    */
      function arrayifyWord(word, showLettersBool){
        var arrayifiedWord = [];
        // *) Loop through the word
        for (index in word){
          if(word[index]==" "){
            // console.log("//");
            arrayifiedWord.push("//");
          } else if (showLettersBool){
            // console.log(word[index]);
            arrayifiedWord.push(word[index].toUpperCase());
          } else{
            // console.log(word[index]);
            arrayifiedWord.push(" ");
          }
        }
        // console.log(arrayifiedWord);
        return arrayifiedWord;
      };

  // I.) RESET ALL PREVIOUS PROERTIES
    // 1.) reset the guesses left
      this.guessesLeft = this.guessesAllowed;
    // 2.) empty correctLetters & incorrectLetters arrays;
      this.correctLettersArray = [];
      this.incorrectLettersArray = [];
      // 3.) reset the currentCountry
      this.currentWord = "";
      this.currentWordArray = [];
      this.userWordArray = [];
      this.currentCountryObject = {};
    
  // II.) GET A NEW COUNTRY
  // 1.) Pop the last country from the array
  // * FUTURE / TO DO! --> get a random country
  // 1a) get a random index & remove it
    var index = Math.floor(Math.random() * countryData.length);
    // var index = Math.floor(Math.random() * this.indexChoices.length);
    // this.indexChoices.splice(index, 1);
    // console.log("Index chosen:" + index);
    // console.log(this.indexChoices);
    // console.log(index);

  // 2.) Make a copy of the country object inside model
    // this.currentCountryObject = countryData[index];
    // console.log(this.currentCountryObject);
    var country = countryData[index]; 
    for (key in country){
      this.currentCountryObject[key] = country[key];
    }

    // console.log(this.currentCountryObject);

  // 3.) get the country name
    this.currentWord = this.currentCountryObject["countryName"];
    // console.log(this.currentWord);

    //3a.) arrayfiy the country name
    this.currentWordArray = arrayifyWord(this.currentWord, true);
    this.userWordArray = arrayifyWord(this.currentWord, false);
  },

  // helper methods
  validGuess: function(guess){
    // checks if it is a valid letter to guess
    // returns an array ["messageType", "messageString"]
    var letter = guess.toUpperCase();
    // 1.) check if it is a letter
    var alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
    "W", "X", "Y", "Z"];
    if (alphabetArray.indexOf(letter)<0){
      return ["warning", "\"" + letter + "\"" + " is not a valid letter"];
    }

    // 2.) check to see if it is already in the 
    // incorrectLetters / correctLetters Array
    else if(this.correctLettersArray.indexOf(letter)>= 0 || 
      this.incorrectLettersArray.indexOf(letter)>=0){
      return ["warning", "\"" + letter + "\"" + " was already guessed"];
    } else{
    // else return success array
    return ["success", "Valid letter"];
    }
  },

  checkGuess: function(guess){
    // return trues if letter is in the word, false if its not
    // console.log(this.currentWord);
    var letter = guess.toUpperCase();
    // 1.) check to see if the letter is in the word
    if (this.currentWordArray.indexOf(letter)>=0){
      //1a.) if yes, loop through currentWord array 
      // & update userWordArray for whenenver the letter is that!
      for (var i =0; i < this.currentWordArray.length; i++){
        // check to see if the letter matches
        // console.log(this.currentWordArray[i]);
        if (this.currentWordArray[i]==letter){
          this.userWordArray[i] = letter;
        }
      }
      // 1b) add the correct letter to the correct letters array
      this.correctLettersArray.push(letter);
      // console.log(this.correctLettersArray);
      return true;
    } else{
    // 2.) letter is not in the word
      //2a) take 1 off of the guessesLeft
      this.guessesLeft --;
      // 2b) add the incorrect letter to the incorrect letters array
      this.incorrectLettersArray.push(letter);
      //2c) return false
      return false;
    }

  },

  userWin: function(){
    // this function checks to see if the user won
    // returns Boolean
    // 1) Loop through the array of the user word
    for (var i=0; i < this.currentWordArray.length; i++){
    // if a letter doesn't equal, return false
      if (this.userWordArray[i] != this.currentWordArray[i]){
        return false;
      }
    }
    // 2.) Assume the User did win!
    this.userWins ++;
    this.totalPoints += this.guessesLeft;
    return true;

  },

  userLost: function(){
    // this function checks to see if the user lost
    // returns Boolean
    if (this.guessesLeft <= 0){
      return true;
    }
    return false;
  },

}

// TESTING
// console.log(countryData.length); // prints 3
// console.log(countryData.pop());
// model.newCountry();
// model.initializeGame();

// var result = model.validGuess("/");
// var result = model.validGuess("C");
// console.log(result);
// view.displayMessage(result[0], result[1]);

// console.log(model.userWordArray);
// model.processGuess("b");
// console.log(model.userWordArray);


// TESTING MODEL
// for (x in model){
//   if (typeof(model[x])=="function"){
//     // console.log("--------");
//     // console.log("Calling function...." );
//     // model[x]();
//     // console.log("--------");
//   } else{
//     console.log(x + ": " + model[x]);
//     console.log("--------");
//   }
// }



