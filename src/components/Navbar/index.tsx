//Components
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

//Assets
import "primeicons/primeicons.css";

//Styles
import "./index.scss";

interface NavbarProps {
  hiddenNavbar: boolean;
  handleNavbarDisplay: () => void;
}

function Navbar({ hiddenNavbar, handleNavbarDisplay }: NavbarProps) {
  const items: MenuItem[] = [
    {
      label: "Update Timer",
    },
    {
      label: "Change Background",
    },
    {
      label: "Update Music",
    },
  ];

  return (
    <>
      <div
        title="Close Menu"
        className={`${
          !hiddenNavbar && "bg-white"
        } left-[50%] absolute top-[64%] flex justify-center items-center rounded-full w-11 h-11 cursor-pointer nav-collapse-button`}
        onClick={handleNavbarDisplay}
      >
        <i
          className={`z-50 text-xl ${
            hiddenNavbar ? "pi pi-chevron-down" : "pi pi-chevron-up"
          }`}
        />
      </div>

      <Menubar
        className={`${
          hiddenNavbar && "-top-[100%]"
        } absolute justify-center bg-white border-none w-full`}
        model={items}
      />
    </>
  );
}

export default Navbar;
