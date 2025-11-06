import React from "react";

import "../login/Login.css";


function Login() {
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
              <h2>Nome</h2>
              <input type="text" placeholder='Nome' />
              <h2>Senha</h2>
              <input type="password" placeholder='Senha' />
            </form>


            <button>Entrar</button>

            <div className='loginAccount'>
              <h1> Não tem uma conta? <a href="./regis">Crie agora!</a></h1>
            </div>

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
