const nodeList = document.querySelectorAll(".drum");
for (let i = 0; i < nodeList.length; i++) {
  nodeList[i].addEventListener("click", function () {
    alert("Oii");
  });
}