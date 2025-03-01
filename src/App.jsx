import LetterHomePage from "./components/firstLetter/LetterHomePage";
import Header from "./components/header/Header";
import GoogleAnalytics from "./GoogleAnalytics";

function App() {
  GoogleAnalytics("G-ZB0KBY3QVK");
  return (
    <div>
      <LetterHomePage/>
    </div>
  );
}

export default App;
