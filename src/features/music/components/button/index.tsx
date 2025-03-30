// Components
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import Controls from "@/features/music/components/controls";

// Styles
import "primeicons/primeicons.css";
import "./styles.scss";

interface MusicFloatingActionButtonProps {
	mute: boolean;
	play: boolean;
	setMute: (value: boolean) => void;
	setPlay: (value: boolean) => void;
}

function MusicFloatingActionButton({
	mute,
	play,
	setMute,
	setPlay,
}: MusicFloatingActionButtonProps) {
	const controls = Controls(
		mute,
		play,
		() => setPlay(!play),
		() => setMute(!mute)
	);

	return (
		<div className="flex justify-end items-center music-container">
			<div className="flex justify-center items-center cursor-pointer music-button">
				<span>
					<div className="speeddial-container">
						<Tooltip
							target=".music-button .p-speeddial-action"
							position="left"
						/>
						<SpeedDial
							className="music-button"
							model={controls}
							direction="up"
							style={{
								left: "calc(50% - 2rem)",
								bottom: 0,
							}}
						/>
					</div>
				</span>
			</div>
		</div>
	);
}

export default MusicFloatingActionButton;
