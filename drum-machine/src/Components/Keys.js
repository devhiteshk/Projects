import React, { useEffect, useState } from "react";

function Keys({ data, volume, setPlaying }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    if (e.keyCode === data.keyCode) {
      setPlaying(data.key);
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(data.keyPressed);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    setPlaying(data.key);
    audioTag.play();
  };

  return (
    <div className="button-container">
      <div
        onClick={playSound}
        id={data.key}
        className={`btn buttons drum-pad ${active && "playing"}`}
      >
        {data.keyPressed}
        <audio src={data.url} className="clip" id={data.keyPressed}></audio>
      </div>
    </div>
  );
}

export default Keys;
