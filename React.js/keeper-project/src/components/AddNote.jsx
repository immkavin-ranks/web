import { useState } from "react";
import "../styles/AddNote.css";
import { PropTypes } from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

export default function AddNote({ toNotes }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [isTextAreaExpanded, setIsTextAreaExpanded] = useState(false);

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
      <form
        onSubmit={handleSubmit}
        className="create-note"
      >
        {isTextAreaExpanded && (
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
          />
        )}

        <textarea
          name="content"
          placeholder="Take a note..."
          value={note.content}
          onChange={handleChange}
          rows={isTextAreaExpanded ? 3 : 1}
          onClick={() => setIsTextAreaExpanded(true)}
        />

        <Zoom in={isTextAreaExpanded ? true : false}>
          <Fab id="add-button" type="submit" disableRipple variant="circular" onClick={() => setIsTextAreaExpanded(false)}>
            <AddIcon id="add-icon" />
          </Fab>
        </Zoom>
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
