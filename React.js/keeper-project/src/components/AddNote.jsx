import { useState } from "react";
import "../styles/AddNote.css";
import { PropTypes } from "prop-types";

export default function AddNote({ toNotes }) {
  const [note, setNote] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toNotes(note);
    setNote({ title: "", content: "" });
  };

  return (
    <div id="add-note">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Take a note..."
          value={note.content}
          onChange={handleChange}
        />

        <input id="add-button" type="submit" value="+" />
      </form>
    </div>
  );
}

AddNote.propTypes = {
  toNotes: PropTypes.func.isRequired,
};
AddNote.propTypes = {
  toNotes: PropTypes.func.isRequired,
};
