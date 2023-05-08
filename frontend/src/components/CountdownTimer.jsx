import React, { useState, useEffect } from "react";

function CountdownTimer(props) {
  /*   
  This is a React component that renders a countdown timer. 
  The component takes two props, time and eventHandler.
  The time prop is the number of seconds to count down from.
  The eventHandler prop is a function that is called when the timer reaches 0.
  */

  const { time, eventHandler } = props;
  // Set the initial state of seconds to the value of the time prop
  const [seconds, setSeconds] = useState(time);

  // A reference to store the interval ID
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
