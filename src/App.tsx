import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import Mute from "./components/Mute";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// Pages
import CountdownTimer from "./page/CountdownTimer";

//Assets
import "primeicons/primeicons.css";

// Styles
import "./App.scss";

function App() {
	const [hiddenNavbar, setHiddenNavbar] = useState(false);
	const [mute, setMute] = useState(false);
	const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth);

	/** MODAL RELATED STATES **/
	// Modal States
	const [showUpdateTimerModal, setShowUpdateTimerModal] = useState(false);
	const [showChangeBgModal, setShowChangeBgModal] = useState(false);
	const [showUpdateMusicModal, setShowUpdateMusicModal] = useState(false);

	// Time States
	const [month, setMonth] = useState<Nullable<Date>>(null);
	const [year, setYear] = useState<Nullable<Date>>(null);
	const [day, setDay] = useState<string>("0");
	const days: Array<{ name: string; code: string }> = [
		{ name: "01", code: "01" },
		{ name: "02", code: "02" },
		{ name: "03", code: "03" },
		{ name: "04", code: "04" },
		{ name: "05", code: "05" },
		{ name: "06", code: "06" },
		{ name: "07", code: "07" },
		{ name: "08", code: "08" },
		{ name: "09", code: "09" },
		{ name: "10", code: "10" },
		{ name: "11", code: "11" },
		{ name: "12", code: "12" },
		{ name: "13", code: "13" },
		{ name: "14", code: "14" },
		{ name: "15", code: "15" },
		{ name: "16", code: "16" },
		{ name: "17", code: "17" },
		{ name: "18", code: "18" },
		{ name: "19", code: "19" },
		{ name: "20", code: "20" },
		{ name: "21", code: "21" },
		{ name: "22", code: "22" },
		{ name: "23", code: "23" },
		{ name: "24", code: "24" },
		{ name: "25", code: "25" },
		{ name: "26", code: "26" },
		{ name: "27", code: "27" },
		{ name: "28", code: "28" },
		{ name: "29", code: "29" },
		{ name: "30", code: "30" },
		{ name: "31", code: "31" },
	];
	const [countdown, setCountdown] = useState<string>(
		new Date().toISOString()
	);

	useEffect(() => {
		const handleResize = () => {
			setBrowserWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const formatTargetDate = (
		newMonth: string,
		newYear: string,
		newDay: string
	) => {
		const monthsList = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const formattedMonth = monthsList.indexOf(newMonth) + 1;
		const formattedDay = Number(newDay) + 1;

		return `${newYear}-${formattedMonth}-${formattedDay.toString()}T00:00:00.000Z`;
	};

	const handleNavbarDisplay = () => setHiddenNavbar(!hiddenNavbar);
	const handleMute = () => setMute(!mute);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const year = formData.get("year") as string;
		const month = formData.get("month") as string;
		const day = formData.get("day") as string;

		const newCountdown = formatTargetDate(month, year, day);
		setCountdown(newCountdown);
		//TODO Find a way to save new countdown to local storage
		//TODO Find a way to retrieve old countdown from local storage
		//TODO Old countdown must still be used unless updated
	};

	return (
		<>
			<div
				className={`${
					browserWidth > 960 &&
					hiddenNavbar &&
					"top-[2%] -translate-y-full"
				} navbar-container absolute h-[64px] w-full transition-transform duration-500 ease-in-out`}
			>
				<Navbar
					hiddenNavbar={hiddenNavbar}
					handleNavbarDisplay={handleNavbarDisplay}
					browserWidth={browserWidth}
					setShowUpdateTimerModal={setShowUpdateTimerModal}
					setShowChangeBgModal={setShowChangeBgModal}
					setShowUpdateMusicModal={setShowUpdateMusicModal}
				/>
			</div>
			<div className="flex justify-center items-center min-h-[90vh]">
				<CountdownTimer targetDate={countdown} />
			</div>

			<div className="flex justify-end items-center music-container">
				<div className="flex justify-center items-center cursor-pointer music-button">
					<span>
						<Mute isMuted={mute} handleMute={handleMute} />
					</span>
				</div>
			</div>

			<Dialog
				className="w-fit"
				header="Update Countdown"
				visible={showUpdateTimerModal}
				onHide={() => {
					if (!showUpdateTimerModal) return;
					setShowUpdateTimerModal(false);
				}}
			>
				<form onSubmit={onSubmit}>
					<div className="flex flex-col justify-start items-start gap-4 countdown-form">
						<div className="flex flex-row justify-center items-center">
							<label htmlFor="toggle-switch">Calendar</label>
							<div className="checkbox-apple">
								<input
									className="toggle-switch"
									id="check-apple"
									type="checkbox"
								/>
								<label htmlFor="check-apple"></label>
							</div>
						</div>

						<div className="flex flex-row justify-start items-center gap-5 timer-form">
							<div className="flex flex-row items-center gap-2 max-w-[22%]">
								<label htmlFor="date">Year:</label>
								<Calendar
									className="h-[40px] year-input"
									name="year"
									value={year}
									onChange={(e) => setYear(e.value)}
									view="year"
									dateFormat="yy"
								/>
							</div>
							<div className="flex flex-row items-center gap-2 max-w-[58%]">
								<label htmlFor="date">Month:</label>
								<Calendar
									className="h-[40px]"
									name="month"
									value={month}
									onChange={(e) => setMonth(e.value!)}
									view="month"
									dateFormat="MM"
								/>
							</div>
							<div className="flex flex-row items-center gap-2">
								<label htmlFor="date">Day:</label>
								<Dropdown
									name="day"
									value={day}
									onChange={(e: DropdownChangeEvent) =>
										setDay(e.value)
									}
									options={days}
									optionLabel="name"
									className="border-[2px] border-violet w-full md:w-14rem"
								/>
							</div>
						</div>
						<div className="flex flex-row justify-start items-center gap-5 countdown-location-form">
							<div className="flex flex-row items-center gap-2">
								<label htmlFor="date">Location:</label>
								<InputText type="text" name="location" />
							</div>
						</div>
						<div className="flex flex-row justify-end items-center gap-5 w-full">
							<Button
								className="bg-violet px-[1.25rem] py-[0.75rem] h-[40px] text-white"
								label="Save"
								icon="pi pi-check"
								type="submit"
								onClick={() => setShowUpdateTimerModal(false)}
								autoFocus
							/>
						</div>
					</div>
				</form>
			</Dialog>
		</>
	);
}

export default App;
