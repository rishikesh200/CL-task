import React, { useState } from "react";
import "./App.css";
import Popup from "./components/Popup";
import { MdKeyboardArrowLeft } from "react-icons/md";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="parent">
      
      <div className="topbar">
        <MdKeyboardArrowLeft className="ar_icon"/>
        <h1> View Audience</h1>
      </div>

      <button className="ss_btn" onClick={() => setShowPopup(true)}>Save segment</button>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;
