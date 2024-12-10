import { SetStateAction, Dispatch } from "react";

//Components
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

//Assets
import "primeicons/primeicons.css";

//Styles
import "./styles.scss";

interface MenuProps {
	hiddenNavbar: boolean;
	browserWidth: number;

	setShowUpdateTimerModal: Dispatch<SetStateAction<boolean>>;
	setShowChangeBgModal: Dispatch<SetStateAction<boolean>>;
	setShowUpdateMusicModal: Dispatch<SetStateAction<boolean>>;

	handleNavbarDisplay: () => void;
}

export default function Menu({
	hiddenNavbar,
	browserWidth,
	setShowUpdateTimerModal,
	setShowChangeBgModal,
	setShowUpdateMusicModal,
	handleNavbarDisplay,
}: MenuProps) {
	const items: MenuItem[] = [
		{
			label: "Update Countdown",
			command: () => {
				console.log("Update Countdown Opened");
				setShowUpdateTimerModal(true);
			},
		},
		{
			label: "Change Background", //TODO Add a an option where user can set the color(includes gradient option) of the background
			command: () => {
				console.log("Change Background Opened");
				setShowChangeBgModal(true);
			},
		},
		{
			label: "Update Music",
			command: () => {
				console.log("Update Music Opened");
				setShowUpdateMusicModal(true);
			},
		},
	];

	return (
		<>
			<div
				title="Close Menu"
				className={`${
					!hiddenNavbar && "bg-white"
				} left-[48.55%] absolute top-[64%] flex justify-center items-center rounded-full w-11 h-11 cursor-pointer nav-collapse-button`}
				onClick={handleNavbarDisplay}
			>
				<i
					className={`z-50 text-xl ${
						hiddenNavbar
							? "pi pi-chevron-down"
							: "pi pi-chevron-up"
					}`}
				/>
			</div>

			<Menubar
				className={`${
					browserWidth > 960 && hiddenNavbar && "-top-[100%]"
				} absolute justify-center bg-white border-none w-full`}
				model={items}
			/>
		</>
	);
}
