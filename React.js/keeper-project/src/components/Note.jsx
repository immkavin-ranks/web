import { useState } from "react";
import "../styles/Note.css";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";

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
      {onHover ? <button onClick={() => props.onDelete(props.id)}><DeleteIcon /></button> : <button>&nbsp;</button>}
    </div>
  );
}
Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
