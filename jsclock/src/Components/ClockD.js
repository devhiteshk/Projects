import { useState, useEffect } from "react";
import "./ClockD.css";

function ClockDigital() {
  // component mounts
  const [date, setDate] = useState(new Date());

  // update function for clock
  function refreshClock() {
    setDate(new Date());
  }

  // component updates
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="Container-flex">
      <div className="digital_clock_container">
        <span id="time">{date.toLocaleTimeString()}</span>
        <span id="date">{date.toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default ClockDigital;
