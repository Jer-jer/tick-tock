import { useState, useEffect } from "react";
import { Nullable } from "primereact/ts-helpers";

// Interfaces
import { IPixabayVideo } from "@/features/background/interfaces";

// Components
import MusicFloatingActionButton from "@/features/countdown/components/musicButton";
import Menu from "@/features/menu";
import UpdateTimerModal from "@/features/countdown/components/updateTimerModal";
import UpdateMusicModal from "@/features/music/components/updateMusicModal";
import UpdateBgModal from "@/features/background/components/updateBgModal";

// Pages
import CountdownTimer from "./page/CountdownTimer";

//Assets
import "primeicons/primeicons.css";

// Styles
import "./App.scss";

function App() {
	const [hiddenNavbar, setHiddenNavbar] = useState(false);
	const [browserWidth, setBrowserWidth] = useState<number>(
		window.innerWidth
	);

	/** MODAL RELATED STATES **/
	// Modal States
	const [showUpdateTimerModal, setShowUpdateTimerModal] = useState(false);
	const [showChangeBgModal, setShowChangeBgModal] = useState(false);
	const [showUpdateMusicModal, setShowUpdateMusicModal] = useState(false);

	// Time States
	const [switchCalendar, setSwitchCalendar] = useState(false);
	const [month, setMonth] = useState<Nullable<Date>>(null);
	const [year, setYear] = useState<Nullable<Date>>(null);
	const [day, setDay] = useState<string>("");
	const [time, setTime] = useState<Nullable<Date>>(null);
	const [datetime24h, setDateTime24h] = useState<Nullable<Date>>(null);
	const [countdown, setCountdown] = useState<string>(
		new Date().toISOString()
	);
	const [countdownFontColor, setCountdownFontColor] =
		useState<string>("#000000");

	// Background States
	const [backgroundMedia, setBackgroundMedia] = useState<string>("");
	const [videos, setVideos] = useState<IPixabayVideo[]>([]);

	// Music States
	const [url, setUrl] = useState<string>("");
	const [, setPlayLink] = useState<string | null>(null);

	useEffect(() => {
		const storedCountdown = localStorage.getItem("countdown");
		const background = localStorage.getItem("background");
		const countdownColor = localStorage.getItem("countdownColor");

		if (storedCountdown) {
			const date = new Date(storedCountdown);
			setCountdown(storedCountdown);
			setYear(date);
			setMonth(date);
			setDay(date.getDate().toString().padStart(2, "0"));
			setTime(date);
			setDateTime24h(date);
		}

		if (background) {
			setBackgroundMedia(background);
		}

		if (countdownColor) {
			setCountdownFontColor(countdownColor);
		}

		const handleResize = () => {
			setBrowserWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleNavbarDisplay = () => setHiddenNavbar(!hiddenNavbar);

	return (
		<div
			className="app-container"
			style={{
				background: backgroundMedia
					? backgroundMedia.startsWith("https")
						? `url(${backgroundMedia}) center/cover no-repeat`
						: backgroundMedia
					: undefined,
			}}
		>
			<div
				className={`${
					browserWidth > 960 &&
					hiddenNavbar &&
					"top-[2%] -translate-y-full"
				} navbar-container absolute h-[64px] w-full transition-transform duration-500 ease-in-out`}
			>
				<Menu
					hiddenNavbar={hiddenNavbar}
					handleNavbarDisplay={handleNavbarDisplay}
					browserWidth={browserWidth}
					setShowUpdateTimerModal={setShowUpdateTimerModal}
					setShowChangeBgModal={setShowChangeBgModal}
					setShowUpdateMusicModal={setShowUpdateMusicModal}
					countdownFontColor={countdownFontColor}
				/>
			</div>

			<div className="flex justify-center items-center min-h-[90vh]">
				<CountdownTimer
					targetDate={countdown}
					countdownFontColor={countdownFontColor}
				/>
			</div>

			{/* <BackgroundMusicPlayer /> */}
			<MusicFloatingActionButton />

			{/* Update Countdown Modal */}
			<UpdateTimerModal
				showUpdateTimerModal={showUpdateTimerModal}
				setShowUpdateTimerModal={setShowUpdateTimerModal}
				switchCalendar={switchCalendar}
				setSwitchCalendar={setSwitchCalendar}
				month={month}
				setMonth={setMonth}
				year={year}
				setYear={setYear}
				day={day}
				setDay={setDay}
				time={time}
				setTime={setTime}
				datetime24h={datetime24h}
				setDateTime24h={setDateTime24h}
				setCountdown={setCountdown}
			/>

			{/* Change Music Modal */}
			<UpdateMusicModal
				showUpdateMusicModal={showUpdateMusicModal}
				setShowUpdateMusicModal={setShowUpdateMusicModal}
				url={url}
				setUrl={setUrl}
				setPlayLink={setPlayLink}
			/>

			<UpdateBgModal
				showChangeBgModal={showChangeBgModal}
				videos={videos}
				setBackgroundMedia={setBackgroundMedia}
				setShowChangeBgModal={setShowChangeBgModal}
				setVideos={setVideos}
				setCountdownFontColor={setCountdownFontColor}
			/>
		</div>
	);
}

export default App;
