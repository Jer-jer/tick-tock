import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import Mute from "./components/Mute";

// Pages
import CountdownTimer from "./page/CountdownTimer";

//Assets
import "primeicons/primeicons.css";

// Styles
import "./App.scss";

function App() {
  const [hiddenNavbar, setHiddenNavbar] = useState(false);
  const [mute, setMute] = useState(false);
  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavbarDisplay = () => setHiddenNavbar(!hiddenNavbar);

  const handleMute = () => setMute(!mute);

  return (
    <>
      <div
        className={`${
          browserWidth > 960 && hiddenNavbar && "top-[2%] -translate-y-full"
        } navbar-container absolute h-[64px] w-full transition-transform duration-500 ease-in-out`}
      >
        <Navbar
          hiddenNavbar={hiddenNavbar}
          handleNavbarDisplay={handleNavbarDisplay}
          browserWidth={browserWidth}
        />
      </div>
      <div className="flex justify-center items-center min-h-[90vh]">
        <CountdownTimer targetDate="2024-10-16T13:00:00.000Z" />
      </div>

      <div className="flex justify-end items-center music-container">
        <div className="flex justify-center items-center cursor-pointer music-button">
          <span>
            <Mute isMuted={mute} handleMute={handleMute} />
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
