import Keys from "./Components/Keys";
import Sounds from "./Components/Sound";
import { useState } from "react";
import "./App.css";

function App() {
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState("Press key!");

  return (
    <div className="App" id="drum-machine">
      <header className="App-header">
        <div>
          <h1>DRUM MACHINE</h1>
        </div>
      </header>
      <div className="Drum-Container">
        {Sounds.map((data) => (
          <Keys
            data={data}
            key={data.key}
            volume={volume}
            setPlaying={setPlaying}
          />
        ))}
      </div>

      <div className="display-container">
        <h4>Playing :</h4>
        <h4 id="display">{playing}</h4>
      </div>

      <div className="volume-container">
        <h4>Volume</h4>
        <input
          onChange={(e) => setVolume(e.target.value)}
          className="vol-range"
          type="range"
          step={0.01}
          value={volume}
          max={1}
          min={0}
        />
      </div>
      <footer>
        <p>Made with ❤️ in India</p>
      </footer>
    </div>
  );
}

export default App;
