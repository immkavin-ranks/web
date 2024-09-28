import Note from "./Note";
import "../styles/Notes.css";

export default function Notes({ notes }) {
  const cards = notes.map((note) => (
    <Note key={note.key} title={note.title} content={note.content} />
  ));

  return <div className="notes-container">{cards}</div>;
}
