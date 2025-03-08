import React from "react";

import { InputText } from "primereact/inputtext";

import "./styles.scss";

interface InputProps {
	className?: string;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	name?: string;
	value?: string | null;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	maxLength?: number;
}

export default function Input({
	className,
	placeholder,
	type = "text",
	name,
	value,
	onChange,
	maxLength,
}: InputProps) {
	return (
		<InputText
			className={className}
			placeholder={placeholder}
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			maxLength={maxLength}
			required
		/>
	);
}
