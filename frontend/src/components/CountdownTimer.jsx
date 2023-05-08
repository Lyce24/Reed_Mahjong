import React, { useState, useEffect } from "react";

function CountdownTimer(props) {
  const { time, eventHandler } = props;
  // Set the initial state of seconds to the value of the time prop
  const [seconds, setSeconds] = useState(time);
  const intervalRef = React.useRef(null);

  // Use the useEffect hook to start and stop the timer
  useEffect(() => {
    // Set an interval that decrements seconds every second
    intervalRef.current = setInterval(() => {
      // Decrement seconds
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    // Return a function that clears the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    // Clear the interval when seconds reaches 0
    if (seconds === 0) {
      clearInterval(intervalRef.current);
      eventHandler();
    }
  }, [seconds, eventHandler]);

  return (
    <div>
      <h1>Countdown Timer: {seconds}</h1>
    </div>
  );
}

export default CountdownTimer;
