import "./ClockA.css";
import "./clock_an"

function ClockAnalog() {

  return (
    <>
      <div className="clock-wrapper">
        <div className="clock-base">
          <div className="clock-dial">
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
            <div className="clock-indicator"></div>
          </div>
          <div className="clock-hour"></div>
          <div className="clock-minute"></div>
          <div className="clock-second"></div>
          <div className="clock-center"></div>
        </div>
      </div>
    </>
  );
}

export default ClockAnalog;
