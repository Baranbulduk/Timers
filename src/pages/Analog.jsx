import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header/Header.jsx";
import "./App.css";

function Analog({ minutes, seconds }) {
  const [currentMinutes, setCurrentMinutes] = useState(minutes);
  const [currentSeconds, setCurrentSeconds] = useState(seconds);

  const calculateDegrees = (totalSeconds) => {
    const minuteDegree = ((currentMinutes + currentSeconds / 60) % 60) * 6;
    const secondDegree = (currentSeconds % 60) * 6;
    return { minuteDegree, secondDegree };
  };

  const resetTimer = () => {
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  };

  const { minuteDegree, secondDegree } = calculateDegrees(currentSeconds);

  /*Start timer*/
  const [isTicking, setIsTicking] = useState(false);
   
  React.useEffect(() => {
    let timer;
    if (isTicking) {
      timer = setInterval(() => {
        setCurrentSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setCurrentMinutes(prevMinutes => (prevMinutes + 1) % 60);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else if (!isTicking && timer) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTicking]);
  

  return (
    <div>
      <Header />
      <div className="analogClock" onClick={() => setIsTicking(!isTicking)}>
        <motion.div
          className="analogClock__minute"
          animate={{ rotate: minuteDegree }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.div
          className="analogClock__second"
          animate={{ rotate: secondDegree }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      <button onClick={resetTimer}>Återställ Timer</button>
    </div>
  );
}

export default Analog;
