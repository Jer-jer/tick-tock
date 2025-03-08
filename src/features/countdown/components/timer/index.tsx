import { useState, useEffect } from "react";
import * as Worker from "worker-timers";

// Interfaces
import { CountdownTimerProps } from "../../interfaces/CountdownTimer";

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

export default function CountdownTimer({
	targetDate,
	countdownFontColor,
}: CountdownTimerProps) {
	const [isTabActive, setIsTabActive] = useState<boolean>(true);
	const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

	/** TAB VISIBILITY HANDLER **/
	useEffect(() => {
		// Set the initial title when the component mounts
		document.title = "TickTock";

		// Listen for visibility changes
		const handleVisibilityChange = () => {
			setIsTabActive(!document.hidden);
		};

		// Update the title when the tab is inactive
		if (!isTabActive) {
			document.title =
				timeLeft.total > 0
					? `${timeLeft.days}:${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`
					: "TickTock";
		}

		// Attach event listener for visibility change
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange
			);
		};
	}, [timeLeft, isTabActive]);

	useEffect(() => {
		const timeLeft = localStorage.getItem("timeLeft");
		if (timeLeft) {
			setTimeLeft(JSON.parse(timeLeft));
		}
	}, []);

	/** MAIN COUNTDOWN TIMER **/
	useEffect(() => {
		const interval = Worker.setInterval(() => {
			const newTime = getTimeRemaining(targetDate);
			localStorage.setItem("timeLeft", JSON.stringify(newTime));
			setTimeLeft(newTime);

			if (timeLeft.total <= 0) {
				Worker.clearInterval(interval);
			}
		}, 10);

		return () => Worker.clearInterval(interval);
	}, [targetDate]);

	return (
		<div
			className={`mt-[4.8%] countdown-font`}
			style={{
				color: countdownFontColor,
			}}
		>
			{timeLeft.total > 0 ? (
				<div className="flex justify-center items-center w-fit transition-all duration-700 ease-in-out">
					<span className="w-[12ch] text-[9vw] md:text-[85px] timer">
						{timeLeft.days}:{timeLeft.hours}:
						{timeLeft.minutes}:{timeLeft.seconds}.
						{timeLeft.milliseconds}
					</span>
				</div>
			) : (
				<div className="flex justify-center items-center w-[13.6ch] transition-all duration-700 ease-in-out">
					<span className="text-[9vw] md:text-[85px]">
						000:00:00:00.000
					</span>
				</div>
			)}
		</div>
	);
}
