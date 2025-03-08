import { Dispatch, SetStateAction } from "react";

import Modal from "@/common/components/modal";
import CountdownForm from "@/features/countdown/components/form";

import { Nullable } from "primereact/ts-helpers";

import "./styles.scss";

interface UpdateTimerProps {
	showUpdateTimerModal: boolean;
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

export default function UpdateTimer({
	showUpdateTimerModal,
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
}: UpdateTimerProps) {
	return (
		<Modal
			header="Update Countdown"
			position="top"
			draggable={false}
			visible={showUpdateTimerModal}
			onHide={() => {
				if (!showUpdateTimerModal) return;
				setShowUpdateTimerModal(false);
			}}
		>
			<CountdownForm
				setShowUpdateTimerModal={setShowUpdateTimerModal}
				switchCalendar={switchCalendar}
				setSwitchCalendar={setSwitchCalendar}
				datetime24h={datetime24h}
				setDateTime24h={setDateTime24h}
				year={year}
				setYear={setYear}
				month={month}
				setMonth={setMonth}
				day={day}
				setDay={setDay}
				time={time}
				setTime={setTime}
				setCountdown={setCountdown}
			/>
		</Modal>
	);
}
