import React from 'react'
import RegisterField from '../../componentes/registerField'
import PasswordField from '../../componentes/passwordField'
import './Register.css'
import Hearder from '../../componentes/Hearder'
import Button from '../../componentes/Button'
import { useState } from 'react'


function Register() {

    const [activeForm, setActiveForm] = useState('cadastro');

    function login(){
        setActiveForm('login');
    }

    function cadastro(){
        setActiveForm('cadastro');
    }

    const cardClass = `card ${activeForm === 'cadastro' ? 'cadastroActive' : 'loginActive'}`;

    return (
        <>
            <div className='container'>
                <div className={cardClass} id='card'>
                    <div className='esquerda'>
                        <div className='formLogin'>
                            <h1>Login</h1>
                            <form action="">
                                <input type="text" placeholder='Email' />
                                <input type="text" placeholder='Password' />
                                <button>Entrar</button>
                            </form>
                        </div>
                        <div className='login'>
                            <h1>Ja tem uma conta?</h1>
                            <p>entre agora em sua conta</p>
                            <button onClick={login}>Login</button>
                        </div>
                    </div>
                    <div className='direita'>
                        <div className='formCadastro'>
                            <h1>Cadastro</h1>
                            <form action="">
                                <input type="text" placeholder='Nome' />
                                <input type="text" placeholder='Email'/>
                                <input type="Password" placeholder='Password'/>
                                <button>Cadastrar</button>
                            </form>
                        </div>
                        <div className='cadastro'>
                            <h1>Não tem uma Conta</h1>
                            <p>cria sua conta agora!</p>
                            <button onClick={cadastro}>Cadastrar</button>
                        </div>
                    </div>
                    <div className='background'>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register