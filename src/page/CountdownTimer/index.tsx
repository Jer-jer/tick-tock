// Components
import Countdown from "@/features/countdown/components/timer";

// Interfaces
import { CountdownTimerProps } from "@/features/countdown/interfaces/CountdownTimer";

// Styles
import "./index.scss";

function CountdownTimer({
	targetDate,
	countdownFontColor,
}: CountdownTimerProps) {
	return (
		<>
			<Countdown
				targetDate={targetDate}
				countdownFontColor={countdownFontColor}
			/>
		</>
	);
}

export default CountdownTimer;
