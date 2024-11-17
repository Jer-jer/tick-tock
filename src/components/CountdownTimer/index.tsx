import { useState, useEffect, useRef } from "react";

// Interfaces
import { CountdownTimerProps } from "../../interface/CountdownTimer";

// Styles
import "./index.scss";

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
	const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));
	const requestRef = useRef<number>();

	console.log("TARGETDATE", targetDate);

	const updateTimer = () => {
		const remainingTime = getTimeRemaining(targetDate);
		setTimeLeft(remainingTime);

		// If the countdown is complete, stop the animation frame
		if (remainingTime.total > 0) {
			requestRef.current = requestAnimationFrame(updateTimer);
		}
	};

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
