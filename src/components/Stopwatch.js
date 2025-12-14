import { useState, useRef } from "react";
const Stopwatch = () => {
  const [timer, setTimer] = useState({
    sec: 0,
    mins: 0,
    hours: 0,
  });
  const [intervalId, setIntervalId] = useState();
  const running = useRef(false);

  function startStopwatch() {
    if (running.current) return;
    running.current = true;
    setIntervalId(
      setInterval(() => {
        setTimer((prev) => {
          let sec = prev.sec || 0;
          if (sec < 60) {
            sec += 1;
          }
          let min = prev.mins || 0;
          if (sec >= 60) {
            min += 1;
            sec = 0;
          }
          let hour = prev.hours || 0;
          if (min >= 60) {
            hour += 1;
            min = 0;
          }
          return { sec, mins: min, hours: hour };
        });
      }, 1000)
    );
  }
  function stopStopwatch() {
    if (intervalId) {
      running.current = false;
      clearInterval(intervalId);
    }
  }
  function resetHandler() {
    if (intervalId) {
      clearInterval(intervalId);
      running.current = false;
    }
    setTimer({ sec: 0, mins: 0, hours: 0 });
  }
  return (
    <div>
      StopWatch
      <p
        style={{ height: "30px" }}
      >{`${timer?.hours}:${timer?.mins}:${timer?.sec}`}</p>
      <button style={{ background: "green" }} onClick={startStopwatch}>
        Start
      </button>
      <button onClick={stopStopwatch}>Stop</button>
      <button style={{ background: "red" }} onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
