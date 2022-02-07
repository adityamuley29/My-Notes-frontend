import jwtDecode from "jwt-decode";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const AuthContext = createContext();

export default AuthContext;

// const INITIAL_DATA = {
//   name: "",
//   email: "",
//   password: "",
// };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );
  const { addToast } = useToasts();
  const history = useNavigate();

  // register user

  const registerUserHandeler = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/register/", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("authToken")
          ? "JWT " + localStorage.getItem("authToken")
          : null,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    if (response.status === 200) {
      addToast(`Registration Successfull 🥳`, {
        appearance: "success",
        autoDismiss: true,
      });
      history("/");
    } else {
      addToast(`Somthing went wrong! 😬`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    console.log("form submited");
  };

  // login user
  let loginUser = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    let response = await fetch("/api/token/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      // console.log(data.access);

      localStorage.setItem("authToken", JSON.stringify(data));

      addToast(`You are now logged in 👍`, {
        appearance: "success",
        autoDismiss: true,
      });
      history("/");
    } else {
      addToast(`Somthing went wrong`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // logout user

  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    history("/login");
  };

  let contextData = {
    user: user,
    registerUserHandeler: registerUserHandeler,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
