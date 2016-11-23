/*
============================================================
Controller
============================================================
1.) will update the keyboard GUI
2.) send message to user
*/


// 1.) Get the letter the User entered: either through button or key



// 2.) Check if the letter is a valid guess

  //2a.) Entered a letter

  // 2b.) And that the letter was not already guessed


// 3.) Process the guess / check if the letter is in word

  // 3A.) If the letter is Correct

    // 1) add letter the correct letters array 

     // 2.) the userWord with the correct letter

  // 3B) If the letter is not Correct



/*
============================================================
Set up the event listener!!
============================================================
*/


/*
============================================================
TESTING !!!!
============================================================
*/
model.initializeGame();
// console.log(model.userWordArray);
// console.log(model.currentWordArray);
// view.displayWord(["C", " ", "N", " ", "//", "D"]);
view.displayWord(model.userWordArray);