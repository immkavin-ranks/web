import { useState } from "react";
import "../styles/Note.css";
import PropTypes from "prop-types";

export default function Note(props) {
  const [onHover, setOnHover] = useState();
  return (
    <div
      className="noteCard"
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
    >
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      {/* <button
        style={onHover ? { display: "inline" } : { display: "none" }}
        onClick={() => props.onDelete(props.id)}
      >
        DELETE
      </button> */}
      {onHover ? <button onClick={() => props.onDelete(props.id)}>DELETE</button> : <button>&nbsp;</button>}
    </div>
  );
}
Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
