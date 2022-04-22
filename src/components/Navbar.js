import React, { Fragment, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { darkMode, lightMode } from "../actions/index";
import { useToasts } from "react-toast-notifications";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import DarkModeButton from "./DarkModeButton";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const myState = useSelector((state) => state.toggleMode);
  const [toggle, setToggle] = useState(myState);
  const dispatched = useDispatch();
  const { addToast } = useToasts();
  const { user, logoutUser } = useContext(AuthContext);

  const currentPath = window.location.pathname;

  const userDetails = JSON.parse(localStorage.getItem("user"));

  // console.log(JSON.parse(userDetails));
  const triggerToggle = () => {
    setToggle(!toggle);
    toggleMode(toggle);
  };

  let toggleMode = (mode) => {
    if (mode === false) {
      dispatched(darkMode());
      addToast("Dark Mode enabled 🥳", {
        appearance: "success",
        autoDismiss: true,
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
      <h1>
        <Link to={"/"}>My Notes</Link>
      </h1>

      {/* dark mode button start here */}
      <div className="navbar-buttons">
        <DarkModeButton triggerToggle={triggerToggle} toggle={toggle} />

        {user ? (
          <Fragment>
            <div className="auth-button">
              <h3>Hello, {userDetails.username}</h3>
            </div>
            <div className="auth-button">
              <h3 id="logoutbtn">
                <Link to={"/"} onClick={logoutUser}>
                  Logout
                </Link>
              </h3>
            </div>
          </Fragment>
        ) : currentPath === "/login" ? (
          <div className="auth-button">
            <h3>
              <Link to={"/register"}>Register</Link>
            </h3>
          </div>
        ) : (
          <div className="auth-button">
            <h3>
              <Link to={"/login"}>login</Link>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
