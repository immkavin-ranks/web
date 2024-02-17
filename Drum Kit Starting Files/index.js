const nodeList = document.querySelectorAll(".drum");

var tom1 = new Audio("./sounds/tom-1.mp3");
var tom2 = new Audio("./sounds/tom-2.mp3");
var tom3 = new Audio("./sounds/tom-3.mp3");
var tom4 = new Audio("./sounds/tom-4.mp3");
var snare = new Audio("./sounds/snare.mp3");
var crash = new Audio("./sounds/crash.mp3");
var kick = new Audio("./sounds/kick-bass.mp3");

for (let i = 0; i < nodeList.length; i++) {
  nodeList[i].addEventListener("click", function () {
    var clickedButton = this.innerHTML;

    makeSound(clickedButton);
    makeAnimation(clickedButton);
  });
}

document.addEventListener("keydown", function(event) {
  makeSound(event.key);
  makeAnimation(event.key);
});

function makeSound(eventKey) {
  
  switch (eventKey) {
    case "w":
      tom1.play();
      break;
    case "a":
      tom2.play();
      break;
    case "s":
      tom3.play();
      break;
    case "d":
      tom4.play();
      break;
    case "j":
      snare.play();
      break;
    case "k":
      crash.play();
      break;
    case "l":
      kick.play();
      break;
    default:
      console.log(eventKey);
  }
}

function makeAnimation(eventKey) {
  var pressedButton = document.querySelector("." + eventKey);
  pressedButton.classList.add("pressed");

  setTimeout(function () {
    pressedButton.classList.remove("pressed");
  }, 100);
}