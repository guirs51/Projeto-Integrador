import React from "react";

import "../login/Login.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FcEditImage, FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router";
import { User } from "lucide-react";

function Login() {
   const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const mostraOcultar = () => {
    setShow(!show);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const token = data.token
      localStorage.setItem("token", token)

      if (!response.ok) {
        alert(
          `Erro ${response.status}: ${data.message || "Erro desconhecido"}`
        );
        return;
      }
      
      alert("Login realizado com sucesso");
      navigate("/UserHome", { state: {id: data.user.id, mensagem: "Recebeu"} })

    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-card-esquerda">
          <div className="Login">
            <h1>
              Bem-vindo de volta ao <span>Recicle +</span>
            </h1>
            <h2>
              Junte-se à nossa comunidade na busca por um futuro melhor.{" "}
            </h2>
          </div>
          <div className="form">
            <form action="">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type={show ? "text" : "password"}
                placeholder="Senha"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn-view-login"
                onClick={mostraOcultar}
                type="button"
              >
                {!show ? (
                  <FaEyeSlash size={20} color="black" />
                ) : (
                  <IoEyeSharp size={20} color="black" />
                )}
              </button>
            </form>

            <button onClick={login}>Entrar</button>

            <div className="loginAccount">
              <h1 className="redirect-text">
                {" "}
                Não tem uma conta? <a href="./regis">Crie agora!</a>
              </h1>
            </div>

            <p>Ou continue com </p>

            <button className="btn-google">
              <span className="google-logo">
                <FcGoogle size={30} />
              </span>
            </button>
          </div>
        </div>

        <div className="login-card-direita">
          <h1>
            Preservar a natureza é o primeiro passo para preservar o futuro.
          </h1>
        </div>
      </div>
    </>
  );
}

export default Login;
