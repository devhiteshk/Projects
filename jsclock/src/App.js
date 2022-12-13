import ClockAnalog from "./Components/Clock";
import ClockDigital from "./Components/ClockD";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="analog-clock">
        <ClockAnalog />
      </div>
      <div className="digital-clock">
        <ClockDigital />
      </div>
    </div>
  );
}

export default App;
