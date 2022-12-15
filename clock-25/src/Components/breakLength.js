import React from "react";

function BreakLength({ breakval, setBreakval }) {
  const handleClickUP = () => {
    if (breakval < 60) {
      setBreakval(breakval + 1);
    }
  };
  const handleClickDN = () => {
    if (breakval > 1) {
      setBreakval(breakval - 1);
    }
  };
  return (
    <div className="Length-container">
      <h4 id="break-label">Break Length</h4>
      <div className="button-container">
        <i
          id="break-increment"
          className="fa fa-arrow-up"
          aria-hidden="true"
          onClick={handleClickUP}
        ></i>
        <h4 id="break-length">{breakval}</h4>
        <i
          id="break-decrement"
          className="fa fa-arrow-down"
          aria-hidden="true"
          onClick={handleClickDN}
        ></i>
      </div>
    </div>
  );
}

export default BreakLength;
