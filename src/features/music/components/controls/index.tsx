import { MenuItem } from "primereact/menuitem";

// Styles
import "./styles.scss";

function Controls(
	isMuted: boolean,
	isPaused: boolean,
	handlePlay: () => void,
	handleMute: () => void
) {
	const controlItems: MenuItem[] = [
		{
			label: "Mute",
			template: (
				<div className="mute">
					<label className="mute-container">
						<input
							checked={isMuted}
							onChange={handleMute}
							type="checkbox"
						/>
						<svg
							viewBox="0 0 448 512"
							height="1em"
							xmlns="http://www.w3.org/2000/svg"
							className="voice"
						>
							<path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z" />
						</svg>
						<svg
							viewBox="0 0 576 512"
							height="1em"
							xmlns="http://www.w3.org/2000/svg"
							className="mute"
						>
							<path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
						</svg>
					</label>
				</div>
			),
		},
		{
			label: "Play/Pause",
			template: (
				<div className="play-pause">
					<label className="play-pause-container">
						<input
							checked={isPaused}
							onChange={handlePlay}
							type="checkbox"
						/>
						<svg
							viewBox="0 0 384 512"
							height="1em"
							xmlns="http://www.w3.org/2000/svg"
							className="play"
						>
							<path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
						</svg>
						<svg
							viewBox="0 0 320 512"
							height="1em"
							xmlns="http://www.w3.org/2000/svg"
							className="pause"
						>
							<path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path>
						</svg>
					</label>
				</div>
			),
		},
		{
			label: "Remove Music",
			icon: "pi pi-times",
			command: () => {
				localStorage.removeItem("music");
				window.location.reload();
			},
		},
	];

	return controlItems;
}

export default Controls;
