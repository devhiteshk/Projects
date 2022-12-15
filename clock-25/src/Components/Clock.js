import React, { useEffect, useState } from "react";
import beep from "./beep.wav";
let timer = null;
let toggle = null;
let SessionBreakToggle = false;
let audio = new Audio(beep);
let resetFlag = false;
let sec = null;
let inBreak = false;

function Clock({
  clockVal,
  sessionval,
  breakval,
  setClock,
  setSessionval,
  setBreakval,
}) {
  const [session, setSession] = useState("Session");
  useEffect(() => {
    let iS = sessionval * 60;
    setSession("Session");
    inBreak = false;
    let in_ans = getStringify(iS);
    setClock(in_ans);
  }, [sessionval]);

  useEffect(() => {
    if (inBreak === true) {
      let iB = breakval * 60;
      setSession("Break");
      let iB_ans = getStringify(iB);
      setClock(iB_ans);
    }
  }, [breakval]);

  let initializeTimer = () => {
    let ini = sessionval * 60;
    sec = ini;
  };

  const handleReset = () => {
    inBreak = false;
    clearInterval(timer);
    setSessionval(25);
    setBreakval(5);
    audio.currentTime = 0;
    setClock("25:00");
    resetFlag = false;
  };

  const getStringify = (x) => {
    let Imin = Math.floor(x / 60);
    let Irem = Math.ceil(x % 60);

    let Ians = "";
    Imin = Imin.toString();
    Irem = Irem.toString();

    if (Imin.length < 2) {
      Imin = "0" + Imin;
    }
    if (Irem.length < 2) {
      Irem = "0" + Irem;
    }

    Ians = Imin + ":" + Irem;
    return Ians;
  };

  const handlePlayPause = (e) => {
    let classList = e.target.classList;

    if (classList.contains("fa-pause")) {
      e.target.classList.add("fa-play");
      e.target.classList.add("stop");
      e.target.classList.remove("fa-pause");
    } else {
      e.target.classList.add("fa-pause");
      e.target.classList.remove("fa-play");
      e.target.classList.remove("stop");
    }

    if (classList.contains("fa-pause")) {
      toggle = true;
    }
    if (classList.contains("fa-play")) {
      toggle = false;
    }

    if (toggle === true) {
      console.log("clock start");
      if (resetFlag === false) {
        initializeTimer();
        resetFlag = true;
      }
      let p_Element = document.getElementById("d-p");
      p_Element.classList.add("d-pointer");
      console.log(p_Element);
      timer = setInterval(displayTimer, 1000);
    } else {
      let p_Element = document.getElementById("d-p");
      p_Element.classList.remove("d-pointer");
      console.log("clock stop");
      clearInterval(timer);
    }
  };

  function displayTimer() {
    if ((sec <= 0) & (SessionBreakToggle === false)) {
      audio.currentTime = 0;
      audio.play();
      setSession("Break");
      console.log("break starts");
      SessionBreakToggle = true;
      sec = breakval * 60;
      inBreak = true;
    }

    if ((sec <= 0) & (SessionBreakToggle === true)) {
      audio.currentTime = 0;
      audio.play();
      setSession("Session");
      console.log("session starts");
      SessionBreakToggle = false;
      sec = sessionval * 60;
      inBreak = false;
    }

    sec -= 1;
    console.log(sec);

    let ansD = getStringify(sec);
    setClock(ansD);
  }

  return (
    <>
      <div className="clock">
        <p id="timer-label">{session}</p>
        <h3 id="time-left">{clockVal}</h3>
      </div>
      <div className="clock-button-container">
        <i
          id="start_stop"
          className="fa-solid fa-play"
          onClick={handlePlayPause}
        ></i>
        <i
          id="reset"
          className="fa-solid fa-arrows-rotate"
          onClick={handleReset}
        ></i>
        <audio id="beep" src={beep}></audio>
      </div>
    </>
  );
}

export default Clock;
