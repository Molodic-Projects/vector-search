import { Header } from "./layouts/Header/Header";
import { Main } from "./layouts/Main/Main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  );
}

export default App;
