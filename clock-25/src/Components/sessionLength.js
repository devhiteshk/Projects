import React from "react";

function SessionLength({ sessionval, setSessionval }) {
  const handleClickUP = () => {
    if (sessionval < 60) {
      setSessionval(sessionval + 1);
    }
  };
  const handleClickDN = () => {
    if (sessionval > 1) {
      setSessionval(sessionval - 1);
    }
  };
  return (
    <div className="Length-container">
      <h4 id="session-label">Session Length</h4>
      <div className="button-container">
        <i
          className="fa fa-arrow-up"
          id="session-increment"
          aria-hidden="true"
          onClick={handleClickUP}
        ></i>
        <h4 id="session-length">{sessionval}</h4>
        <i
          id="session-decrement"
          className="fa fa-arrow-down"
          aria-hidden="true"
          onClick={handleClickDN}
        ></i>
      </div>
    </div>
  );
}

export default SessionLength;
