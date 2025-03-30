import { useState } from "react";

// Components
import { SpeedDial } from "primereact/speeddial";
import MusicPlayer from "@/features/music/components/player";
import Controls from "@/features/music/components/controls";

// Styles
import "primeicons/primeicons.css";
import "./styles.scss";

function MusicFloatingActionButton() {
	const [playLink, setPlayLink] = useState<string | null>(null);
	const [mute, setMute] = useState(true);
	const [pause, setPause] = useState<boolean>(false);

	const controls = Controls(
		mute,
		pause,
		() => setPause(!pause),
		() => setMute(!mute)
	);

	return (
		<div>
			<MusicPlayer
				playLink={playLink}
				play={pause}
				mute={mute}
				setPlayLink={setPlayLink}
			/>
			<div className="flex justify-end items-center music-container">
				<div className="flex justify-center items-center cursor-pointer music-button">
					<span>
						<div className="speeddial-container">
							<SpeedDial
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
		</div>
	);
}

export default MusicFloatingActionButton;
