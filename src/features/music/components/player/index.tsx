import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player";

interface MusicPlayerProps {
	playLink: string | null;
	mute: boolean;
	play: boolean;
	setPlayLink: Dispatch<SetStateAction<string | null>>;
}

export default function MusicPlayer({
	playLink,
	play,
	mute,
	setPlayLink,
}: MusicPlayerProps) {
	const playerRef = useRef<ReactPlayer>(null);
	const [playerKey, setPlayerKey] = useState(0);

	useEffect(() => {
		const storedMusic = localStorage.getItem("music");
		if (storedMusic) {
			setPlayLink(storedMusic);
		}
	}, []);

	// Force player remount when URL changes
	useEffect(() => {
		setPlayerKey((prev) => prev + 1);
	}, [playLink]);

	// Handle play/pause when prop changes
	useEffect(() => {
		if (!playerRef.current) return;

		if (play) {
			// For YouTube
			const youtubePlayer = (
				playerRef.current as any
			)?.getInternalPlayer?.();
			if (youtubePlayer?.playVideo) {
				youtubePlayer.playVideo();
			}
			// For HTML5 audio/video
			else if (playerRef.current.getInternalPlayer()?.play) {
				playerRef.current.getInternalPlayer().play();
			}
		} else {
			// For YouTube
			const youtubePlayer = (
				playerRef.current as any
			)?.getInternalPlayer?.();
			if (youtubePlayer?.pauseVideo) {
				youtubePlayer.pauseVideo();
			}
			// For HTML5 audio/video
			else if (playerRef.current.getInternalPlayer()?.pause) {
				playerRef.current.getInternalPlayer().pause();
			}
		}
	}, [play]);

	return (
		<div className="hidden music-player">
			{playLink && (
				<ReactPlayer
					key={`player-${playerKey}`}
					ref={playerRef}
					config={{
						youtube: {
							playerVars: {
								autoplay: play ? 1 : 0,
							},
						},
					}}
					url={playLink}
					playing={play}
					loop={true}
					volume={1}
					muted={mute}
					onReady={() => {
						if (play && playerRef.current) {
							// Auto-play when ready if play is true
							const internalPlayer = (
								playerRef.current as any
							)?.getInternalPlayer?.();
							if (internalPlayer?.playVideo) {
								internalPlayer.playVideo();
							} else if (internalPlayer?.play) {
								internalPlayer.play();
							}
						}
					}}
				/>
			)}
		</div>
	);
}
