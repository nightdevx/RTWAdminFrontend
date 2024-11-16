import  { useState, useEffect } from "react";

const Timer = ({ initialTime, title, start, next, reset }) => {
  const [time, setTime] = useState(initialTime);
  const [hasCalledNext, setHasCalledNext] = useState(false);

  useEffect(() => {
    setTime(initialTime);
    setHasCalledNext(false);
  }, [initialTime, reset]);

  useEffect(() => {
    let timerId;
    if (start && time > 0) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && next && !hasCalledNext) {
      next();
      setHasCalledNext(true);
    }

    return () => clearInterval(timerId);
  }, [start, time, next, hasCalledNext]);

  return (
    <div>
      <h1 className="font-bold" style={{ display: "inline" }}>
        {title}:
      </h1>
      <span style={{ display: "inline", marginLeft: "10px" }}>
        {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}{" "}
      </span>
    </div>
  );
};

export default Timer;
