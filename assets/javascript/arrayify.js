var name = "John Adams";
var nameArray = [];
var userArray = [];
var letter = undefined;
for (var i=0; i<name.length; i++){
  letter = name[i];
  if (letter==" "){
    nameArray.push("//");
    userArray.push("//");
  } else{
    // nameArray.push("");
    nameArray.push(letter.toUpperCase());
    userArray.push(" ");
  }
}

console.log(nameArray);
console.log(userArray);


// Part two 

currentWord = "John Adams".toUpperCase();
// console.log(currentWord);
var guess = "a".toUpperCase();
for(var j=0; j< currentWord.length; j++){
  if (guess  == nameArray[j]){
    console.log(j);
    userArray[j]=guess;
  }
}
console.log(userArray);