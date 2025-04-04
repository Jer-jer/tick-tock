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
	countdownFontColor: string;
	setShowUpdateTimerModal: Dispatch<SetStateAction<boolean>>;
	setShowChangeBgModal: Dispatch<SetStateAction<boolean>>;
	setShowUpdateMusicModal: Dispatch<SetStateAction<boolean>>;

	handleNavbarDisplay: () => void;
}

export default function Menu({
	hiddenNavbar,
	countdownFontColor,
	setShowUpdateTimerModal,
	setShowChangeBgModal,
	setShowUpdateMusicModal,
	handleNavbarDisplay,
}: MenuProps) {
	const items: MenuItem[] = [
		{
			label: "Update Countdown",
			command: () => {
				setShowUpdateTimerModal(true);
			},
		},
		{
			label: "Change Background",
			command: () => {
				setShowChangeBgModal(true);
			},
		},
		{
			label: "Update Music",
			command: () => {
				setShowUpdateMusicModal(true);
			},
		},
	];

	return (
		<>
			<div
				title="Close Menu"
				id="close-icon"
				className={`${
					!hiddenNavbar && "bg-white"
				} left-[48.55%] absolute top-[64%] flex justify-center items-center rounded-full w-11 h-11 cursor-pointer nav-collapse-button`}
				onClick={handleNavbarDisplay}
			>
				<i
					className={`z-50 text-xl ${
						hiddenNavbar
							? "pi pi-chevron-down navbar-icon-shadow"
							: "pi pi-chevron-up"
					}`}
					style={{
						color: `${hiddenNavbar ? countdownFontColor : "#000000"}`,
					}}
				/>
			</div>

			<Menubar
				className={`${
					hiddenNavbar && "-top-[100%]"
				} absolute justify-center bg-white rounded-none border-none w-full`}
				model={items}
			/>
		</>
	);
}
