import { useEffect, Dispatch, SetStateAction } from "react";

import ReactPlayer from "react-player";

interface MusicPlayerProps {
	playLink: string | null;
	mute: boolean;
	setPlayLink: Dispatch<SetStateAction<string | null>>;
}

export default function MusicPlayer({
	playLink,
	mute,
	setPlayLink,
}: MusicPlayerProps) {
	useEffect(() => {
		const storedMusic = localStorage.getItem("music");

		if (storedMusic) {
			setPlayLink(storedMusic);
		}
	}, []);

	return (
		<div className="hidden music-player">
			{playLink && (
				<ReactPlayer
					config={{
						youtube: {
							playerVars: {
								autoplay: 1,
							},
						},
					}}
					url={playLink}
					playing={true}
					loop={true}
					volume={1}
					muted={mute}
				/>
			)}
		</div>
	);
}
