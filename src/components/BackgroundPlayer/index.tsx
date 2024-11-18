import React, { useState } from "react";
import ReactPlayer from "react-player";

export const BackgroundMusicPlayer: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [playLink, setPlayLink] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPlayLink(url);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Background Music Player</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter YouTube or Spotify link"
                    style={{
                        padding: "10px",
                        width: "80%",
                        maxWidth: "400px",
                        marginBottom: "10px",
                    }}
                />
                <br />
                <button type="submit" style={{ padding: "10px 20px" }}>
                    Play
                </button>
            </form>
            {playLink && (
                <>
                    <div className="hidden">
                        <ReactPlayer
                            url={playLink}
                            playing={true}
                            loop={true}
                            volume={1}
                            muted={isMuted}
                        />
                    </div>
                    {/* Mute/Unmute toggle */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        style={{
                            padding: "10px",
                            borderRadius: "50%",
                            backgroundColor: isMuted ? "red" : "green",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        {isMuted ? "Unmute" : "Mute"}
                    </button>
                </>
            )}
        </div>
    );
};

export default BackgroundMusicPlayer;
