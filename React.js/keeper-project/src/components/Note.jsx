import "../styles/Note.css";
export default function Note(props) {
  return (
    <div className="noteCard">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  );
}
