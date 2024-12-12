// Calculate the luminance of a color and return a text color that contrasts with it
function getLuminance(hexColor: string): number {
	// Convert hex to RGB
	const r = parseInt(hexColor.slice(1, 3), 16) / 255;
	const g = parseInt(hexColor.slice(3, 5), 16) / 255;
	const b = parseInt(hexColor.slice(5, 7), 16) / 255;

	// Apply the sRGB formula
	const [rLum, gLum, bLum] = [r, g, b].map((channel) =>
		channel <= 0.03928
			? channel / 12.92
			: Math.pow((channel + 0.055) / 1.055, 2.4)
	);

	// Calculate luminance
	return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum;
}

// Dynamically determine the text color based on the background color
export const getTextColor = (hexColor: string): string => {
	const luminance = getLuminance(hexColor);
	return luminance > 0.5 ? "#000000" : "#FFFFFF"; // Dark text for light backgrounds, light text for dark backgrounds
};
