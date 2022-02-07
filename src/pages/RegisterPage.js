import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
  const { registerUserHandeler } = useContext(AuthContext);

  return (
    <div className="loginForm-container">
      <span id="formTitle">Register</span>
      <form className="loginForm" onSubmit={registerUserHandeler}>
        <input
          type="text"
          name="name"
          className="loginInput"
          placeholder="Enter name "
        />
        <input
          type="email"
          name="email"
          className="loginInput"
          placeholder="Enter email "
        />
        <input
          type="password"
          name="password"
          className="loginInput"
          placeholder="Enter password "
        />
        <button className="loginInput" id="login-btn" type="submit">
          Register
        </button>
      </form>
      <p>
        Aldready have an account?<Link to={"/login"}> Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
