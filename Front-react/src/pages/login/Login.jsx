import React from "react";

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
          <RegisterField texto="Email:" />
          <PasswordField texto="Password:" />
          <Button texto="Login"></Button>
        </div>
      </div>
    </>
  );
}

export default Login;
