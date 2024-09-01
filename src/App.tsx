import React from "react";

// Components
import Navbar from "./components/Navbar";

// Pages
import CountdownTimer from "./page/CountdownTimer";

// Styles
import "./App.scss";

function App() {
  return (
    <>
      <div className="flex justify-center absolute">
        <Navbar />
      </div>
      <div className="flex justify-center items-center h-[100vh]">
        <CountdownTimer />
      </div>
    </>
  );
}

export default App;
