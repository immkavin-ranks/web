import React from "react";
import ReactDOM from "react-dom";

const fname = "Kavin";
const lname = "Manoharan";
const number = 8;
ReactDOM.render(
  <>
    <h1>Hello, {fname + " " + lname}!</h1>
    <p>Your lucky number is {number}</p>
  </>,

  document.getElementById("root")
);
