import React from "react";
import ReactDOM from "react-dom";
import PI, { doublePi, triplePi } from "./math.js";

ReactDOM.render(
  <ul>
    <li>1. {PI}</li>
    <li>2. {doublePi()}</li>
    <li>3. {triplePi()}</li>
  </ul>,
  document.getElementById("root")
);
