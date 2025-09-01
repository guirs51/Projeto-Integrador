import React from "react";
import Hearder from "../../componentes/Hearder";
import "../login/Login.css";

function Login() {
  return (
    <>
      <Hearder />
      <div className="div-maior">
        <span className="box-branca-login">
          <h3 className="login-title">Your moment to make a difference.</h3>
          <span className="home-ball"></span>
        </span>
        <h1 className="h1-login">Log-in:</h1>
        <p>
          Connect and start your process of <br /> helping your environment.
        </p>

        <div className="div-campos-login">
          <div className="campos-login">
            <label htmlFor="">Email:</label>
            <input type="text" className="login-input" />
          </div>
          <div className="campos-login">
            <label htmlFor="password">Password:</label>
            <input type="password" className="login-input" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
