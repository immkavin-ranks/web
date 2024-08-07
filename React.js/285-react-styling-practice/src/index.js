//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

const time = new Date().getHours();
var greet = "Morning";
const text = {
  color: "red",
};
if (time >= 12 && time < 18) {
  greet = "Afternoon";
  text.color = "green";
} else if (time >= 18 && time < 24) {
  greet = "Evening";
  text.color = "blue";
}

ReactDOM.render(
  <h1 style={text} className={"heading"}>
    Good {greet}
  </h1>,
  document.getElementById("root")
);
