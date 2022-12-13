import sound_65 from "./sounds/clap.wav";
import sound_83 from "./sounds/hihat.wav";
import sound_68 from "./sounds/kick.wav";
import sound_70 from "./sounds/openhat.wav";
import sound_71 from "./sounds/boom.wav";
import sound_72 from "./sounds/ride.wav";
import sound_74 from "./sounds/snare.wav";
import sound_75 from "./sounds/tom.wav";
import sound_76 from "./sounds/tink.wav";
import "./App.css";

function App() {
  function removeTransition(key) {
    key.classList.remove("playing");
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
    setTimeout(function () {
      removeTransition(key);
    }, 100);
  }

  window.addEventListener("keydown", playSound);

  return (
    <div className="keys">
      <div data-key="65" className="key">
        <kbd>A</kbd>
        <span className="sound">clap</span>
      </div>
      <div data-key="83" className="key">
        <kbd>S</kbd>
        <span className="sound">hihat</span>
      </div>
      <div data-key="68" className="key">
        <kbd>D</kbd>
        <span className="sound">kick</span>
      </div>
      <div data-key="70" className="key">
        <kbd>F</kbd>
        <span className="sound">openhat</span>
      </div>
      <div data-key="71" className="key">
        <kbd>G</kbd>
        <span className="sound">boom</span>
      </div>
      <div data-key="72" className="key">
        <kbd>H</kbd>
        <span className="sound">ride</span>
      </div>
      <div data-key="74" className="key">
        <kbd>J</kbd>
        <span className="sound">snare</span>
      </div>
      <div data-key="75" className="key">
        <kbd>K</kbd>
        <span className="sound">tom</span>
      </div>
      <div data-key="76" className="key">
        <kbd>L</kbd>
        <span className="sound">tink</span>
      </div>

      <audio id="65" data-key="65" src={sound_65}></audio>
      <audio id="83" data-key="83" src={sound_83}></audio>
      <audio id="68" data-key="68" src={sound_68}></audio>
      <audio id="70" data-key="70" src={sound_70}></audio>
      <audio id="71" data-key="71" src={sound_71}></audio>
      <audio id="72" data-key="72" src={sound_72}></audio>
      <audio id="74" data-key="74" src={sound_74}></audio>
      <audio id="75" data-key="75" src={sound_75}></audio>
      <audio id="76" data-key="76" src={sound_76}></audio>
    </div>
  );
}

export default App;
