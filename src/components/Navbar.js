import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { darkMode, lightMode } from "../actions/index";
import {  useToasts } from "react-toast-notifications";

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  const dispatched = useDispatch();
  const { addToast } = useToasts();

  const triggerToggle = () => {
    setToggle(!toggle);
    toggleMode(toggle);
  };

  let toggleMode = (mode) => {
    if (mode === false) {
      dispatched(darkMode());
      addToast("Dark Mode enabled 🥳", {
        appearance: "success",
        autoDismiss:true
      });
    } else {
      dispatched(lightMode());
      addToast("Dark Mode disabled 🥳", {
        appearance: "success",
        autoDismiss: true,
      });
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
