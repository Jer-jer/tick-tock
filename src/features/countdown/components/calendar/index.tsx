import { Calendar } from "primereact/calendar";

import { Nullable, FormEvent } from "primereact/ts-helpers";

interface CountdownFormCalendarProps {
	className?: string;
	name: string;
	value: Nullable<Date>;
	onChange: (
		e: FormEvent<Date, React.SyntheticEvent<Element, Event>>
	) => void;
	view?: "month" | "year" | "date";
	showTime?: boolean;
	hourFormat?: "12" | "24";
	dateFormat?: string;
	timeOnly?: boolean;
}

export default function CountdownFormCalendar({
	className,
	name,
	value,
	onChange,
	view = "date",
	showTime = false,
	hourFormat = "24",
	dateFormat,
	timeOnly = false,
}: CountdownFormCalendarProps) {
	return (
		<Calendar
			className={className}
			name={name}
			value={value}
			onChange={onChange}
			view={view}
			showTime={showTime}
			hourFormat={hourFormat}
			dateFormat={dateFormat}
			timeOnly={timeOnly}
			required
		/>
	);
}
