import { useState } from "react";
import Keys from "./Components/Keys";
import Padkeys from "./Components/Padkeys";
import "./App.css";

function App() {
  const [currentVal, setCurrentVal] = useState("0");
  const [calculatedValue, setCalculatedVal] = useState("0");

  return (
    <div className="App">
      <header className="App-header">
        <h2>My Calculator</h2>
      </header>
      <div className="calculator">
        <div className="calculator-body">
          <div className="calculation-panel">{calculatedValue}</div>
          <div id="display" className="current-panel">
            {currentVal}
          </div>
          <div className="keypad-container">
            {Keys.map((data) => (
              <Padkeys
                data={data}
                key={data.id}
                setCurrentVal={setCurrentVal}
                currentVal={currentVal}
                setCalculatedVal={setCalculatedVal}
              />
            ))}
          </div>
        </div>
      </div>

      <footer>
        <p>Made with ❤️ in India</p>
        <br />
        <a href="https://github.com/devhiteshk/Projects"> See on GitHub :) </a>
      </footer>
    </div>
  );
}

export default App;
