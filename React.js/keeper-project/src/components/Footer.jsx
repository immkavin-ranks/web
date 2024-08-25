import "../styles/Footer.css";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright &copy; {currentYear}</p>
    </footer>
  );
}
