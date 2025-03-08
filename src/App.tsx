import { useState, useEffect } from "react";
import { Nullable } from "primereact/ts-helpers";

// Interfaces
import { IPexelsPhoto, IPixabayVideo } from "@/features/background/interfaces";

// Components
import Menu from "@/features/menu";
import Mute from "@/features/music/components/controls";
import UpdateTimerModal from "@/features/countdown/components/updateTimerModal";
import UpdateMusicModal from "@/features/music/components/updateMusicModal";
import UpdateBgModal from "@/features/background/components/updateBgModal";
import MusicPlayer from "@/features/music/components/player";

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
	const [backgroundQuery, setBackgroundQuery] = useState<string>("");
	const [backgroundMedia, setBackgroundMedia] = useState<string>("");
	const [images, setImages] = useState<IPexelsPhoto[]>([]);
	const [videos, setVideos] = useState<IPixabayVideo[]>([]);

	// Music States
	const [url, setUrl] = useState<string>("");
	const [playLink, setPlayLink] = useState<string | null>(null);
	const [mute, setMute] = useState(true);
	const [isPaused, setIsPaused] = useState<boolean>(false);

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
					? `url(${backgroundMedia}) center/cover no-repeat`
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
			<MusicPlayer
				playLink={playLink}
				mute={mute}
				setPlayLink={setPlayLink}
			/>
			{/* //TODO Add more music Functionalities */}
			<div className="flex justify-end items-center music-container">
				<div className="flex justify-center items-center cursor-pointer music-button">
					<span>
						<Mute
							isMuted={mute}
							handleMute={() => setMute(!mute)}
						/>
					</span>
				</div>
			</div>

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
				backgroundQuery={backgroundQuery}
				images={images}
				videos={videos}
				setBackgroundMedia={setBackgroundMedia}
				setShowChangeBgModal={setShowChangeBgModal}
				setBackgroundQuery={setBackgroundQuery}
				setImages={setImages}
				setVideos={setVideos}
				setCountdownFontColor={setCountdownFontColor}
			/>
		</div>
	);
}

export default App;
