import './Register.css'
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
                                <button>Enter</button>
                            </form>
                        </div>
                        <div className='login'>
                            <h1>Already have an account?</h1>
                            <p>Log into your account now.</p>
                            <button onClick={login}>Login</button>
                        </div>
                    </div>
                    <div className='direita'>
                        <div className='formCadastro'>
                            <h1>Register</h1>
                            <form action="">
                                <input type="text" placeholder='Name' />
                                <input type="text" placeholder='Email'/>
                                <input type="Password" placeholder='Password'/>
                                
                            </form>
                            <button>Register</button>
                        </div>
                        <div className='cadastro'>
                            <h1>Don't have an account?</h1>
                            <p>Create your account now!</p>
                            <button onClick={cadastro}>Register</button>
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