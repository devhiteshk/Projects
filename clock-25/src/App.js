import BreakLength from "./Components/breakLength";
import Clock from "./Components/Clock";
import SessionLength from "./Components/sessionLength";
import "./App.css";
import { useState } from "react";

function App() {
  const [clockVal, setClock] = useState("25:00");
  const [breakval, setBreakval] = useState(5); //5
  const [sessionval, setSessionval] = useState(25); //25

  return (
    <div className="App">
      <header className="App-header">
        <h2>Blue Pill 💊 Clock 🔥</h2>
      </header>
      <div id="d-p" className="length-main-container">
        <BreakLength breakval={breakval} setBreakval={setBreakval} />
        <SessionLength sessionval={sessionval} setSessionval={setSessionval} />
      </div>
      <div className="clock-container">
        <Clock
          clockVal={clockVal}
          breakval={breakval}
          setClock={setClock}
          sessionval={sessionval}
          setBreakval={setBreakval}
          setSessionval={setSessionval}
        />
      </div>
      <footer>
        <p>Made with ❤️ in India</p>
        <a href="https://github.com/devhiteshk/Projects" target="_blank">
          view on GitHub!
        </a>
      </footer>
    </div>
  );
}

export default App;
