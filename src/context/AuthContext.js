import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("userId") ? localStorage.getItem("userId") : null
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : null
  );
  const { addToast } = useToasts();
  const history = useNavigate();

  // register user

  const registerUserHandeler = async (e) => {
    e.preventDefault();
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        username: e.target.name.value,
        password: e.target.password.value,
        confirmPassword: e.target.password.value,
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
    let response = await fetch("/auth/login", {
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
    let user = data.user
    if (response.status === 200) {
      setAuthToken(user.id);
      setUser(user.id);

      localStorage.setItem("userId", JSON.stringify(user.id));
      localStorage.setItem("user",JSON.stringify(user))

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
  console.log(user);

  // logout user

  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("userId");
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
