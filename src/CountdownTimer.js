import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Countdown from 'react-countdown';
import DoughnutChart from './DoughnutChart';
import DoughnutWithDynamicValues from './DoughnutWithDynamicValues';
import './App.css';
import cdiImage from './cdi.png';

const CountdownTimer = () => {
  const startDate = useMemo(() => new Date('2023-09-03T00:00:00+02:00'), []);
  const endDate = useMemo(() => new Date('2024-06-28T15:00:00+02:00'), []);
  const [completionRate, setCompletionRate] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const calculateCompletionRate = useCallback(() => {
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const completedDuration = now.getTime() - startDate.getTime();
    const rate = (completedDuration / totalDuration) * 100;
    console.log("Total Duration:", totalDuration);
    console.log("Completed Duration:", completedDuration);
    console.log("Completion Rate:", rate);
    return rate;
  }, [endDate, startDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = calculateCompletionRate();
      setCompletionRate(newRate);
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateCompletionRate]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>CDI has ended!</span>;
    } else {
      const totalHours = Math.floor((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((endDate.getTime() - new Date().getTime()) / (1000 * 60));
      const totalSeconds = Math.floor((endDate.getTime() - new Date().getTime()) / 1000);

      return (
        <div>
          <img src={cdiImage} alt="CDI" className="cdi-image" />
          <h1>CDI for September Intake will end in</h1>
          <div className="countdown">
            {days} days {hours} hours {minutes} minutes {seconds} seconds
          </div>
          <div className="additional-countdowns">
            <div>or about {totalHours} hours</div>
            <div>or about {totalMinutes} minutes</div>
            <div>or about {totalSeconds} seconds</div>
          </div>
          <div className="doughnut-container">
            <div className="doughnut-wrapper">
              <h2>Completion Rate</h2>
              <div className="completion-rate">
                {completionRate.toFixed(3)}%
              </div>
              <DoughnutChart completionRate={completionRate} />
            </div>
            <div className="doughnut-wrapper">
              <h2>Distribution of Days</h2>
              <DoughnutWithDynamicValues />
            </div>
            </div>
          <div className="footer">
                    <button
            className="info-button"
            onClick={() => setShowInfo(!showInfo)}
          >
            Info
          </button>
          </div>
          <div className={`info-message ${showInfo ? 'show' : ''}`}>
            This webpage has been created from scratch by GP with the help of GenAI to escape the tedious routines of MS Office
          </div>
          </div>
      );
    }
  };

  return (
    <Countdown date={endDate} renderer={renderer} />
  );
};

export default CountdownTimer;

