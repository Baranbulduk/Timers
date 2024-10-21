import Header from "../components/Header/Header.jsx";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      clearInterval(timer);
      alert("Timer slut!");
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  const startTimer = () => {
    setSecondsRemaining(minutes * 60);
    setIsRunning(true);
  };

  const handleIncrease = () => {
    setMinutes((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setMinutes((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <Header />
      {secondsRemaining === null ? (
        <motion.span
          id="minutesDisplay"
          animate={{ opacity: [0, 1], scale: [0.8, 1] }}
          transition={{ duration: 0.5 }}
        >
          {minutes}
        </motion.span>
      ) : (
        <motion.div
          id="countdownDisplay"
          animate={{ opacity: [0, 1], scale: [0.8, 1] }}
          transition={{ duration: 0.5 }}
        >
          {formatTime(secondsRemaining)}
        </motion.div>
      )}
      <button onClick={handleDecrease}>←</button>
      <button onClick={handleIncrease}>→</button>
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
}

export default Timer;
