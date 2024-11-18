import { useState, useEffect, useRef } from "react";

// Interfaces
import { CountdownTimerProps } from "../../interface/CountdownTimer";

// Styles
import "./index.scss";

//! CAREFUL ON MAKING CHANGES HERE, ITS PRETTY LAGGY
/*
  ? Function to calculate the remaining time
  @param {string --- ISO Date String} targetDate - The target date to countdown to
  @returns {object} - The remaining time in days, hours, minutes, seconds, and milliseconds
  */
const getTimeRemaining = (targetDate: string) => {
    const now = new Date();
    const total = Date.parse(targetDate) - Date.parse(now.toISOString());

    const days = Math.floor(total / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((total / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor((total / 1000) % 60)
        .toString()
        .padStart(2, "0");
    const milliseconds = (total % 1000).toString().padStart(3, "0");

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
    const [isTabActive, setIsTabActive] = useState<boolean>(true);
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));
    const requestRef = useRef<number>();

    const updateTimer = () => {
        const remainingTime = getTimeRemaining(targetDate);
        setTimeLeft(remainingTime);

        // If the countdown is complete, stop the animation frame
        if (remainingTime.total > 0) {
            requestRef.current = requestAnimationFrame(updateTimer);
        }
    };

    // Update the title when the tab is active/inactive
    useEffect(() => {
        // Set the initial title when the component mounts
        document.title = "TickTock";

        // Listen for visibility changes
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsTabActive(false);
            } else {
                setIsTabActive(true);
                document.title = `${timeLeft.days}:${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`;
            }
        };

        // Attach event listener for visibility change
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [timeLeft]);

    // Update the title when the countdown is running, but only if the tab is inactive
    useEffect(() => {
        // Update the title when the countdown is running, but only if the tab is inactive
        if (!isTabActive) {
            document.title = `${timeLeft.days}:${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`;
        }
    }, [timeLeft, isTabActive]);

    // Update the countdown timer
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateTimer);

        // Clear the animation frame when the component is unmounted
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [targetDate]);

    return (
        <div className="mt-[4.8%] countdown-font">
            {timeLeft.total > 0 ? (
                <div className="inline-block w-[12ch] text-[9vw] md:text-[85px] transition-all duration-700 ease-in-out">
                    {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
                    {timeLeft.seconds}.{timeLeft.milliseconds}
                </div>
            ) : (
                <div className="inline-block w-[13.6ch] text-[9vw] md:text-[85px] transition-all duration-700 ease-in-out">
                    000:00:00:00.000
                </div>
            )}
        </div>
    );
}
