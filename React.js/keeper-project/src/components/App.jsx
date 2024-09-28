import Header from "./Header";
import Footer from "./Footer";
import notes from "../../assets/notes";
import Notes from "./Notes";

function App() {
  return (
    <>
      <Header />
      <Notes notes={notes} />
      <Footer />
    </>
  );
}
export default App;
