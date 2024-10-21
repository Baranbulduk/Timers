import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header/Header.jsx";
import "./App.css";

function Digital() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Återställ tid och status från localStorage när komponenten laddas
  useEffect(() => {
    const storedTime = localStorage.getItem("timerTime");
    const storedIsRunning = localStorage.getItem("timerIsRunning") === "true";

    if (storedTime) {
      setTime(Number(storedTime));
    }
    setIsRunning(storedIsRunning);
  }, []);

  // Uppdatera localStorage varje gång time eller isRunning ändras
  useEffect(() => {
    localStorage.setItem("timerTime", time);
    localStorage.setItem("timerIsRunning", isRunning);
  }, [time, isRunning]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <Header />
      <motion.div
        className="digital-display"
        animate={{ scale: [0.9, 1.1, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {formatTime(time)}
      </motion.div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Digital;
