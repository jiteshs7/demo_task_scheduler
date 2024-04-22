import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../App.css";
import { REGEX } from "../../shared/Constants";
import apiClient from "../../api/Api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!REGEX.EMAIL.test(email)) {
      return setErrMsg("Please enter valid email address.");
    }

    apiClient
      .post(`/auth/login`, {
        email,
        password,
      })
      .then((resp) => {
        login(resp.data.data);
        setTimeout(() => {
          setIsLoggedIn(true);
        }, 1000);
      })
      .catch((err) => {
        console.log("Login Error", err);
        setErrMsg(err.data.data?.message);
      });
  };

  const navigateToRegister = () => {
    navigate("/signup");
  };

  return (
    <div>
      <form className="formContainer" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errMsg && <p className="errorMsg">{errMsg}</p>}
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            required
            aria-required
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            min={8}
            required
            aria-required
            value={password}
            onChange={handlePassChange}
          />
        </div>

        <button className="formButton" type="submit">
          Login
        </button>
        <h2 className="link" onClick={navigateToRegister}>
          New here? Signup
        </h2>
      </form>
    </div>
  );
};

export default Login;
