import { Dispatch, SetStateAction } from "react";

// Interfaces
import { IPexelsResponse } from "@/features/background/interfaces";

// Components
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import ImagesGrid from "@/features/background/components/imagesGrid";

// State/Context
import { BackgroundMediaContext } from "@/features/background/state/backgroundMedia";

import "@/scss/base/_modal.scss";
import "./styles.scss";

interface UpdateBgModalProps {
	showChangeBgModal: boolean;
	images: IPexelsResponse[];
	backgroundQuery: string;
	setShowChangeBgModal: Dispatch<SetStateAction<boolean>>;
	setBackgroundMedia: Dispatch<SetStateAction<string>>;
	setImages: Dispatch<SetStateAction<IPexelsResponse[]>>;
	setBackgroundQuery: Dispatch<SetStateAction<string>>;
	setCountdownFontColor: Dispatch<SetStateAction<string>>;
}

export default function UpdateBgModal({
	showChangeBgModal,
	images,
	backgroundQuery,
	setShowChangeBgModal,
	setBackgroundMedia,
	setImages,
	setBackgroundQuery,
	setCountdownFontColor,
}: UpdateBgModalProps) {
	const LoadingIcon: React.FC = () => (
		<svg className="h-[24px] loading" viewBox="25 25 50 50">
			<circle r="20" cy="50" cx="50"></circle>
		</svg>
	);

	const removeBackground = () => {
		setBackgroundMedia("");
		setCountdownFontColor("#000000");
		localStorage.removeItem("background");
		localStorage.removeItem("countdownColor");
	};

	const DialogHeader = () => (
		<div className="flex items-end gap-4">
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
				images,
				backgroundQuery,
				setBackgroundMedia,
				setImages,
				setBackgroundQuery,
				setCountdownFontColor,
				LoadingIcon,
			}}
		>
			<Dialog
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
						<p className="m-0">
							Sed ut perspiciatis unde omnis iste natus
							error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa
							quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
							Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit, sed quia
							consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt. Consectetur,
							adipisci velit, sed quia non numquam eius
							modi.
						</p>
					</TabPanel>
					<TabPanel header="Color">
						<p className="m-0">
							Sed ut perspiciatis unde omnis iste natus
							error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa
							quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo.
							Nemo enim ipsam voluptatem quia voluptas sit
							aspernatur aut odit aut fugit, sed quia
							consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt. Consectetur,
							adipisci velit, sed quia non numquam eius
							modi.
						</p>
					</TabPanel>
				</TabView>
			</Dialog>
		</BackgroundMediaContext.Provider>
	);
}
