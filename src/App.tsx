import { useState } from "react";

// Components
import Navbar from "./components/Navbar";

// Pages
import CountdownTimer from "./page/CountdownTimer";

// Styles
import "./App.scss";

function App() {
  const [hiddenNavbar, setHiddenNavbar] = useState(false);

  const handleNavbarDisplay = () => setHiddenNavbar(!hiddenNavbar);

  return (
    <>
      <div
        className={`${
          hiddenNavbar ? "top-[2%] -translate-y-full" : "translate-y-0"
        } navbar-container absolute h-[64px] w-full transition-transform duration-500 ease-in-out`}
      >
        <Navbar
          hiddenNavbar={hiddenNavbar}
          handleNavbarDisplay={handleNavbarDisplay}
        />
      </div>
      <div className="flex justify-center items-center h-[100vh]">
        <CountdownTimer targetDate="2024-10-16T13:00:00.000Z" />
      </div>
    </>
  );
}

export default App;
