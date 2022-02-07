import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  return (
    <div className="loginForm-container">
      <span id="formTitle">Login</span>
      <form onSubmit={loginUser} className="loginForm">
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
        <button  className="loginInput" id="login-btn" type="submit">Login</button>
      </form>
      <p>
        Don't have an account?<Link to={"/register"}> Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
