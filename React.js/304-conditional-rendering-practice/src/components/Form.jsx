import React from "react";

function Form({ userStatus }) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {userStatus === false && (
        <input type="password" placeholder="Confirm Password" />
      )}
      <button type="submit">
        {userStatus === false ? "Register" : "Login"}
      </button>
    </form>
  );
}

export default Form;
