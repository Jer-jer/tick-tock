import { Dispatch, SetStateAction } from "react";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "./styles.scss";

interface UpdateMusicProps {
	showUpdateMusicModal: boolean;
	setShowUpdateMusicModal: Dispatch<SetStateAction<boolean>>;
	url: string;
	setUrl: Dispatch<SetStateAction<string>>;
	setPlayLink: Dispatch<SetStateAction<string | null>>;
}

export default function UpdateMusic({
	showUpdateMusicModal,
	setShowUpdateMusicModal,
	url,
	setUrl,
	setPlayLink,
}: UpdateMusicProps) {
	const handleMusicChange = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPlayLink(url);
		localStorage.setItem("music", url);
	};

	return (
		<Dialog
			className="min-h-fit modal"
			header="Update Music"
			position="top"
			draggable={false}
			visible={showUpdateMusicModal}
			onHide={() => {
				if (!showUpdateMusicModal) return;
				setShowUpdateMusicModal(false);
			}}
		>
			<form onSubmit={handleMusicChange}>
				<div className="flex flex-row items-center max-w-full max-h-[40px] music-url-container">
					<InputText
						type="text"
						name="music-url"
						placeholder="Enter desired link here"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
					<Button
						className="bg-violet px-[0.75rem] py-[0.5rem] w-fit h-fit text-white music-save-button"
						label="Save"
						type="submit"
						onClick={() => setShowUpdateMusicModal(false)}
						autoFocus
					/>
				</div>
			</form>
		</Dialog>
	);
}
