const nodeList = document.querySelectorAll(".drum");

var audio = new Audio("./sounds/tom-1.mp3");

for (let i = 0; i < nodeList.length; i++) {

  nodeList[i].addEventListener("click", function () {

    audio.play();

  });

}