import React from "react";

import "../login/Login.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";


function Login() {

  const [show, setShow] = useState(false)

  const mostraOcultar = () => {
    setShow(!show)
  }

  return (
    <>

      <div className="container">
        <div className="card-esquerda">
          <div className='Login'>
            <h1>Bem-vindo de volta ao <span>Recicle +</span></h1>
            <h2>Junte-se à nossa comunidade na busca por um futuro melhor. <span>future</span>.</h2>
          </div>
          <div className='form'>
            <form action="">
              <input type="text" placeholder='Nome' />
              <input type={show ? "text" : "password"} placeholder='Senha' id='password'/>
              <button className='btn-view-login' onClick={mostraOcultar} type='button'>
                {!show ? <FaEyeSlash size={20} color='black' /> : <IoEyeSharp size={20} color='black' />}
              </button>
            </form>


            <button>Entrar</button>

            <div className='loginAccount'>
              <h1> Não tem uma conta? <a href="./regis">Crie agora!</a></h1>
            </div>

            <p>Ou continue com </p>

            <button className='btn-google'><span className='google-logo'><FcGoogle size={30} /></span></button>
          </div>

        </div>

        <div className='card-direita'>
          <h1>Preservar a natureza é o primeiro passo para preservar o futuro.</h1>
        </div>

      </div>
    </>
  );
}

export default Login;
