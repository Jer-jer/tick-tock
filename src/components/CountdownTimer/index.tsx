import { useState, useEffect } from "react";

// Interfaces
import { CountdownTimerProps } from "../../interface/CountdownTimer";

/*
  ? Function to calculate the remaining time
  @param {string --- ISO Date String} targetDate - The target date to countdown to
  @returns {object} - The remaining time in days, hours, minutes, seconds, and milliseconds
  */
const getTimeRemaining = (targetDate: string) => {
  const now = new Date();
  const total = Date.parse(targetDate) - Date.parse(now.toISOString());

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  const milliseconds = total % 1000;

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    // Update every 100 milliseconds
    const interval = setInterval(() => {
      const remainingTime = getTimeRemaining(targetDate);
      setTimeLeft(remainingTime);

      // If the countdown is complete, clear the interval
      if (remainingTime.total <= 0) {
        clearInterval(interval);
      }
    }, 100); // Update every 100 milliseconds

    // Clear interval when the component is unmounted
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      {timeLeft.total > 0 ? (
        <div className="text-[9vw] md:text-[85px] transition-all duration-700 ease-in-out">
          {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          .{timeLeft.milliseconds}
        </div>
      ) : (
        <div className="text-[9vw] md:text-[85px] transition-all duration-700 ease-in-out">
          000:00:00:00.000
        </div>
      )}
    </>
  );
}
