import React, { useState, useEffect } from "react";

import { handleFileUpload, handleRemoveBg } from "@/features/background/utils";

const BackgroundCustomizer: React.FC = () => {
	const [background, setBackground] = useState<string | null>(null);

	// Load the background from local storage on component mount
	useEffect(() => {
		const savedBackground = localStorage.getItem("background");
		if (savedBackground) {
			setBackground(savedBackground);
		}
	}, []);

	return (
		<div
			style={{
				position: "relative",
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				background:
					background && background.startsWith("data:image")
						? `url(${background}) center/cover no-repeat`
						: undefined,
				backgroundSize: "cover",
				willChange: "transform",
			}}
		>
			{/* Video Background */}
			{background && background.startsWith("data:video") && (
				<video
					src={background}
					autoPlay
					loop
					muted
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						objectFit: "cover",
						willChange: "transform",
					}}
				/>
			)}

			{/* Controls */}
			<div
				style={{
					position: "absolute",
					top: 20,
					left: 20,
					zIndex: 2,
				}}
			>
				<input
					className="!w-[60%]"
					type="file"
					accept="image/*,video/*"
					onChange={(event) =>
						handleFileUpload(event, setBackground)
					}
				/>
				<button
					onClick={() => setBackground(handleRemoveBg)}
					style={{ marginLeft: "10px" }}
				>
					Reset Background
				</button>
			</div>
		</div>
	);
};

export default BackgroundCustomizer;
