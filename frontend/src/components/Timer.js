import React, { useState, useEffect } from 'react';
import './Timer.css'; // Import your CSS

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const isLowTime = timeLeft < 30; // Adjust threshold as needed

  return (
    <div className={`timer-container ${isLowTime ? 'low-time' : ''}`}>
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default Timer;
