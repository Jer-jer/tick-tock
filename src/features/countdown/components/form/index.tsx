import React, { Dispatch, SetStateAction } from "react";

import CountdownFormCalendar from "@/features/countdown/components/calendar";
import Input from "@/common/components/input";
import { Button } from "primereact/button";

import { Nullable } from "primereact/ts-helpers";

import "./styles.scss";

interface CountdownFormProps {
	setShowUpdateTimerModal: Dispatch<SetStateAction<boolean>>;
	switchCalendar: boolean;
	setSwitchCalendar: Dispatch<SetStateAction<boolean>>;
	datetime24h: Nullable<Date>;
	setDateTime24h: Dispatch<SetStateAction<Nullable<Date>>>;
	year: Nullable<Date>;
	setYear: Dispatch<SetStateAction<Nullable<Date>>>;
	month: Nullable<Date>;
	setMonth: Dispatch<SetStateAction<Nullable<Date>>>;
	day: string;
	setDay: Dispatch<SetStateAction<string>>;
	time: Nullable<Date>;
	setTime: Dispatch<SetStateAction<Nullable<Date>>>;
	setCountdown: Dispatch<SetStateAction<string>>;
}

export default function CountdownForm({
	setShowUpdateTimerModal,
	switchCalendar,
	setSwitchCalendar,
	datetime24h,
	setDateTime24h,
	year,
	setYear,
	month,
	setMonth,
	day,
	setDay,
	time,
	setTime,
	setCountdown,
}: CountdownFormProps) {
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

	//TODO Only update the state here
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
	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col justify-start items-start gap-4 w-full countdown-form">
				<div className="flex flex-row justify-center items-center">
					<label className="w-[10ch]" htmlFor="toggle-switch">
						{switchCalendar ? "Quick Picker" : "Step-by-Step"}
					</label>
					<div className="checkbox-calendar">
						<input
							className="toggle-switch"
							id="check-calendar"
							type="checkbox"
							value={switchCalendar ? "on" : "off"}
							onChange={() =>
								setSwitchCalendar(!switchCalendar)
							}
						/>
						<label htmlFor="check-calendar"></label>
					</div>
				</div>

				{/* //TODO: Add Zod and React Hook Forms */}
				<div className="flex flex-col justify-start items-start gap-5 w-full timer-form">
					{switchCalendar ? (
						<div className="flex flex-row items-center gap-2">
							<label htmlFor="date">Date:</label>
							<CountdownFormCalendar
								name="calendar"
								value={datetime24h}
								onChange={(e) =>
									setDateTime24h(e.value)
								}
								showTime
								hourFormat="24"
							/>
						</div>
					) : (
						<>
							<div className="flex flex-row justify-start items-center gap-[1.3rem] md:gap-2 w-full md:max-w-[19%]">
								<label htmlFor="date">Year:</label>
								<CountdownFormCalendar
									className="h-[40px] year-input"
									name="year"
									value={year}
									onChange={(e) => setYear(e.value)}
									view="year"
									dateFormat="yy"
								/>
							</div>
							<div className="flex flex-row justify-start items-center gap-2 w-full md:max-w-[30%]">
								<label htmlFor="date">Month:</label>
								<CountdownFormCalendar
									className="h-[40px]"
									name="month"
									value={month}
									onChange={(e) =>
										setMonth(e.value!)
									}
									view="month"
									dateFormat="MM"
								/>
							</div>
							<div className="flex flex-row justify-start items-center gap-[1.7rem] md:gap-2 w-full md:max-w-[15%] max-h-[40px]">
								<label htmlFor="date">Day:</label>
								<span>
									<Input
										className="!w-full"
										type="text"
										name="day"
										value={day}
										onChange={handleDayChange}
										maxLength={2}
									/>
								</span>
							</div>
							<div className="flex flex-row justify-start items-center gap-[1.1rem] md:gap-2 w-full md:max-w-[21%] max-h-[40px]">
								<label htmlFor="date">Time:</label>
								<CountdownFormCalendar
									name="time"
									value={time}
									onChange={(e) => setTime(e.value)}
									timeOnly
								/>
							</div>
						</>
					)}
				</div>

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
	);
}
