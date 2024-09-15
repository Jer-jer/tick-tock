// Components
import Countdown from "../../components/CountdownTimer";

// Interfaces
import { CountdownTimerProps } from "../../interface/CountdownTimer";

// Styles
import "./index.scss";

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  return (
    <>
      <Countdown targetDate={targetDate} />
    </>
  );
}

export default CountdownTimer;
