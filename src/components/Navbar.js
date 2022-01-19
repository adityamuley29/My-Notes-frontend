import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { darkMode, lightMode } from "../actions/index";

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  const dispatched = useDispatch();

  const triggerToggle = () => {
    setToggle(!toggle);
    toggleMode(toggle);
  };

  let toggleMode = (mode) => {
    if (mode === false) {
      dispatched(darkMode());
    } else {
      dispatched(lightMode());
    }
  };

  return (
    <div className="navbar">
      <h1>My Notes</h1>

      {/* dark mode button start here */}

      <div
        onClick={triggerToggle}
        className={`wrg-toggle ${toggle ? "wrg-toggle--checked" : ""}`}
      >
        <div className="wrg-toggle-container">
          <div className="wrg-toggle-check">
            <span>🌜</span>
          </div>

          <div className="wrg-toggle-uncheck">
            <span>🌞</span>
          </div>
        </div>
        <div className="wrg-toggle-circle"></div>
        <input
          className="wrg-toggle-input"
          type="checkbox"
          aria-label="Toggle Button"
        />
      </div>
    </div>
  );
};

export default Navbar;
