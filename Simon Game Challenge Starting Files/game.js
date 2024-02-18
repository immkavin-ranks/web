var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var randomChosenColor = buttonColors[nextSequence()];

gamePattern.push(randomChosenColor);

function nextSequence() {
  
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

$("#"+randomChosenColor).fadeOut(100).fadeIn(100);