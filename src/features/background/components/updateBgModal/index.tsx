import { Dispatch, SetStateAction } from "react";

// Interfaces
import { IPixabayVideo } from "@/features/background/interfaces";

// Components
import Modal from "@/common/components/modal";
import ImagesGrid from "@/features/background/components/imagesGrid";
import VideosGrid from "@/features/background/components/videosGrid";
import ColorWheel from "@/features/background/components/colorWheel";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";

// State/Context
import { BackgroundMediaContext } from "@/features/background/state/backgroundMedia";

import "@/scss/base/_modal.scss";
import "./styles.scss";

interface UpdateBgModalProps {
	showChangeBgModal: boolean;
	videos: IPixabayVideo[];
	setShowChangeBgModal: Dispatch<SetStateAction<boolean>>;
	setBackgroundMedia: Dispatch<SetStateAction<string>>;
	setVideos: Dispatch<SetStateAction<IPixabayVideo[]>>;
	setCountdownFontColor: Dispatch<SetStateAction<string>>;
}

export default function UpdateBgModal({
	showChangeBgModal,
	videos,
	setShowChangeBgModal,
	setBackgroundMedia,
	setVideos,
	setCountdownFontColor,
}: UpdateBgModalProps) {
	const removeBackground = () => {
		setBackgroundMedia("");
		setCountdownFontColor("#000000");
		localStorage.removeItem("background");
		localStorage.removeItem("countdownColor");
	};

	const DialogHeader = () => (
		<div className="flex md:flex-row flex-col items-start md:items-end md:gap-4">
			<span>Update Background</span>
			<Button
				className="hover:bg-transparent p-0 pb-[0.3rem] font-light text-violet text-xs"
				label="Remove background"
				text
				onClick={removeBackground}
			/>
		</div>
	);

	return (
		<BackgroundMediaContext.Provider
			value={{
				videos,
				setBackgroundMedia,
				setVideos,
				setCountdownFontColor,
			}}
		>
			<Modal
				className="!top-[5%] modal"
				header={<DialogHeader />}
				position="top"
				visible={showChangeBgModal}
				onHide={() => {
					if (!showChangeBgModal) return;
					setShowChangeBgModal(false);
				}}
			>
				<TabView>
					<TabPanel header="Image">
						<ImagesGrid />
					</TabPanel>
					<TabPanel header="Video">
						<VideosGrid />
					</TabPanel>
					<TabPanel header="Color">
						<ColorWheel />
					</TabPanel>
				</TabView>
			</Modal>
		</BackgroundMediaContext.Provider>
	);
}
