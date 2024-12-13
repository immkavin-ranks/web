import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddNote from "./AddNote";
import { useState } from "react";
import "../styles/App.css";
import notess from "../../assets/notes";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, { id: Date.now(), ...newNote }]);
  };


  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <>
      <Header />
      <AddNote toNotes={addNote} />
      <div id="notes-container">
        {notess.map(({ key, title, content }) => (
          <Note
            key={key}
            id={key}
            title={title}
            content={content}
            onDelete={deleteNote}
          />
        ))}
        {notes.map(({ id, title, content }) => (
          <Note
            key={id}
            id={id}
            title={title}
            content={content}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
