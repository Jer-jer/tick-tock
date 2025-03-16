import { useState, useContext } from "react";
import tinycolor from "tinycolor2";

// Components
import ColorPicker from "react-best-gradient-color-picker";
import { Button } from "primereact/button";

// State
import { BackgroundMediaContext } from "@/features/background/state/backgroundMedia";

// Utils
import { getTextColor } from "@/features/background/utils/getTextColor";

import "./styles.scss";

const background = localStorage.getItem("background");
const backgroundColor =
	background && background.startsWith("https") ? "#7d10c0" : background;
const backgroundButtonColor =
	background && background.startsWith("https") ? "#9B17EC" : background;

const tinyColorBackground = tinycolor(backgroundColor!);
const tinyColorBgdButtonColor = tinycolor(
	backgroundButtonColor!
).monochromatic();
const tinyColorBgButtonColorsHex = tinyColorBgdButtonColor.map((color) =>
	color.toHexString()
);

export default function ColorWheel() {
	const [color, setColor] = useState(tinyColorBackground.toRgbString());
	const [buttonColor, setButtonColor] = useState(
		tinyColorBgButtonColorsHex[1]
	);
	const [textColor, setTextColor] = useState(
		getTextColor(buttonColor || "#9B17EC")
	);

	const backgroundMediaContext = useContext(BackgroundMediaContext);
	const setBackgroundMedia = backgroundMediaContext!.setBackgroundMedia;
	const setCountdownFontColor =
		backgroundMediaContext!.setCountdownFontColor;

	const changeColor = (color: string) => {
		const monochromaticColors = tinycolor(color).monochromatic();
		const monochromaticColorsHex = monochromaticColors.map((color) =>
			color.toHexString()
		);

		setColor(color);
		setButtonColor(color);
		setButtonColor(monochromaticColorsHex[1]);
		setTextColor(getTextColor(buttonColor || "#9B17EC"));
	};

	const setBackground = () => {
		const adjustedTextColor = getTextColor(color!);
		setCountdownFontColor(adjustedTextColor);
		setBackgroundMedia(color!);

		localStorage.setItem("countdownColor", adjustedTextColor);
		localStorage.setItem("background", color!); // Save to local storage
	};

	return (
		<div
			style={{ background: color! }}
			className={`flex justify-center items-center flex-col h-full w-full rounded-md py-4 gap-3`}
		>
			<div className="flex justify-center items-center bg-[#222] p-4 rounded-md">
				<ColorPicker
					value={color!}
					onChange={(value) => changeColor(value)}
				/>
			</div>
			<Button
				className="hover:opacity-80 shadow-md p-3 font-semibold transition-opacity duration-200"
				style={{
					background: buttonColor!,
					color: textColor,
				}}
				label="Set Background"
				onClick={() => setBackground()}
			/>
		</div>
	);
}
