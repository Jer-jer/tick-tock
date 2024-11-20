import { useState, useEffect } from "react";

// Components
import ReactPlayer from "react-player";
import Navbar from "./components/Navbar";
import Mute from "./components/Mute";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
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
    const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth);

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

    // Music States
    const [url, setUrl] = useState<string>("");
    const [playLink, setPlayLink] = useState<string | null>(null);
    const [mute, setMute] = useState(true);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    useEffect(() => {
        const storedCountdown = localStorage.getItem("countdown");
        const storedMusic = localStorage.getItem("music");

        if (storedMusic) {
            setPlayLink(storedMusic);
        }

        if (storedCountdown) {
            const date = new Date(storedCountdown);
            setCountdown(storedCountdown);
            setYear(date);
            setMonth(date);
            setDay(date.getDate().toString().padStart(2, "0"));
            setTime(date);
            setDateTime24h(date);
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

    //TODO Add a error handling here that checks for invalid dates
    const formatTargetDate = (
        newMonth: string,
        newYear: string,
        newDay: string,
        newTime: string
    ) => {
        const dayProper = Number(newDay);
        const formattedDay = dayProper.toString().padStart(2, "0");

        // Create a Date object using the provided values
        const date = new Date(
            `${newMonth} ${formattedDay}, ${newYear} ${newTime}:00`
        );

        console.log(newMonth, date)

        return date.toISOString();
    };
    
    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow only numbers and limit to 2 characters
        if (/^\d{0,2}$/.test(value)) {
            // Pad the value to 2 characters if necessary
            setDay(value);
        } 
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newCountdown: string;
        const formData = new FormData(event.currentTarget);
        const year = formData.get("year") as string;
        const month = formData.get("month") as string;
        const day = formData.get("day") as string;
        const time = formData.get("time") as string;
        const date = formData.get("calendar") as string;

        if (year && month && day && time) {
            newCountdown = formatTargetDate(month, year, day, time);
            setCountdown(newCountdown);
            localStorage.setItem("countdown", newCountdown);
        } else if (date) {
            const newDate = new Date(date);
            newCountdown = newDate.toISOString();
            setCountdown(newCountdown);
            localStorage.setItem("countdown", newCountdown);
        }
    };

    // Music Functions
    const handleMute = () => setMute(!mute);
    const handleMusicChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPlayLink(url);
        localStorage.setItem("music", url);
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

            {/* Update Countdown Modal */}
            <Dialog
                className="top-[15%] w-[85%] md:w-[77%] lg:w-[56%] xl:w-[38%] min-h-[236px] update-countdown-modal"
                header="Update Countdown"
                position="top"
                visible={showUpdateTimerModal}
                onHide={() => {
                    if (!showUpdateTimerModal) return;
                    setShowUpdateTimerModal(false);
                }}
            >
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col justify-start items-start gap-4 countdown-form">
                        <div className="flex flex-row justify-center items-center">
                            <label className="w-[7ch]" htmlFor="toggle-switch">
                                {switchCalendar ? "Calendar" : "Timer"}
                            </label>
                            <div className="checkbox-apple">
                                <input
                                    className="toggle-switch"
                                    id="check-apple"
                                    type="checkbox"
                                    value={switchCalendar ? "on" : "off"}
                                    onChange={() =>
                                        setSwitchCalendar(!switchCalendar)
                                    }
                                />
                                <label htmlFor="check-apple"></label>
                            </div>
                        </div>

                        {/* //TODO: Add Zod and React Hook Forms */}
                        <div className="flex flex-col justify-start items-start gap-5 timer-form">
                            {switchCalendar ? (
                                <div className="flex flex-row items-center gap-2">
                                    <label htmlFor="date">Date:</label>
                                    <Calendar
                                        id="calendar-24h"
                                        name="calendar"
                                        value={datetime24h}
                                        onChange={(e) =>
                                            setDateTime24h(e.value)
                                        }
                                        showTime
                                        hourFormat="24"
                                        required
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-row items-center gap-2 max-w-[45%] md:max-w-[19%]">
                                        <label htmlFor="date">Year:</label>
                                        <Calendar
                                            className="h-[40px] year-input"
                                            name="year"
                                            value={year}
                                            onChange={(e) => setYear(e.value)}
                                            view="year"
                                            dateFormat="yy"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-2 max-w-[70%] md:max-w-[30%]">
                                        <label htmlFor="date">Month:</label>
                                        <Calendar
                                            className="h-[40px]"
                                            name="month"
                                            value={month}
                                            onChange={(e) => setMonth(e.value!)}
                                            view="month"
                                            dateFormat="MM"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-2 max-w-[35%] md:max-w-[15%]">
                                        <label htmlFor="date">Day:</label>
                                        <InputText
                                            type="text"
                                            name="day"
                                            value={day}
                                            onChange={handleDayChange}
                                            maxLength={2}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-2 max-w-[50%] md:max-w-[21%]">
                                        <label htmlFor="date">Time:</label>
                                        <Calendar
                                            name="time"
                                            value={time}
                                            onChange={(e) => setTime(e.value)}
                                            timeOnly
                                            required
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        {/* {!switchCalendar && (
                            <div className="flex flex-row justify-start items-center gap-5 countdown-location-form">
                                <div className="flex flex-row items-center gap-2 max-w-[50%] md:max-w-[43%]">
                                    <label htmlFor="date">Time:</label>
                                    <Calendar
                                        name="time"
                                        value={time}
                                        onChange={(e) => setTime(e.value)}
                                        timeOnly
                                        required
                                    />
                                </div>
                            </div>
                        )} */}

                        {/* //TODO Maybe or maybe not add this */}
                        {/* <div className="flex flex-row justify-start items-center gap-5 countdown-location-form">
                            <div className="flex flex-row items-center gap-2">
                                <label htmlFor="date">Location:</label>
                                <InputText type="text" name="location" />
                            </div>
                        </div> */}
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

            {/* Change Music Modal */}
            <Dialog
                className="top-[15%] w-[85%] md:w-[77%] lg:w-[56%] xl:w-[38%] min-h-fit update-countdown-modal"
                header="Update Music"
                position="top"
                visible={showUpdateMusicModal}
                onHide={() => {
                    if (!showUpdateMusicModal) return;
                    setShowUpdateMusicModal(false);
                }}
            >
                <form onSubmit={handleMusicChange}>
                    <div className="flex flex-row items-center max-w-full music-url-container">
                        <InputText
                            type="text"
                            name="music-url"
                            placeholder="Enter desired link here"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <Button
                            className="bg-violet px-[0.75rem] py-[0.75rem] w-fit h-fit text-white music-save-button"
                            label="Save"
                            type="submit"
                            onClick={() => setShowUpdateMusicModal(false)}
                            autoFocus
                        />
                    </div>
                </form>
            </Dialog>

            {/* <BackgroundMusicPlayer /> */}
            <div className="hidden music-player">
                {playLink && (
                    <ReactPlayer
                        config={{
                            youtube: {
                                playerVars: {
                                    autoplay: 1,
                                },
                            },
                        }}
                        url={playLink}
                        playing={true}
                        loop={true}
                        volume={1}
                        muted={mute}
                    />
                )}
            </div>
        </>
    );
}

export default App;
