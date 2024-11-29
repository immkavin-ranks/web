import React, { useState } from "react";

function App() {
  const [isMouseOver, setIsMouseOver] = useState();
  const [name, setName] = useState("");
  function handleMouseOver() {
    setIsMouseOver(true);
  }

  function handleMouseOut() {
    setIsMouseOver(false);
  }

  function handleClick(e) {
    e.preventDefault();
    const input = document.getElementById("name");
    const nameInput = input.value;
    input.value = "";
    setName(nameInput);
  }

  return (
    <div className="container">
      <h1>Hello {name}</h1>
      <form action="">
        <input
          type="text"
          placeholder="What's your name?"
          name="name"
          id="name"
        />
        <button
          style={{ backgroundColor: isMouseOver ? "black" : "white" }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
