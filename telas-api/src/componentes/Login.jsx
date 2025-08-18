import React from 'react'
import './Login.css'



function Login() {
    return (
        <div className='Login-container'>

            <div className='text-login'>
                <h1>Log-in</h1>
                <h2>Connect and start your process of helping your environment.</h2>
            </div>
            <form className="login-form">

                <h3>email</h3>
                <input type="email" placeholder='Digite seu email' required />
                <h3>senha</h3>
                <input type="password" placeholder='Digite sua senha' required />
                <button type='submit'>Login </button>
            </form>
        </div>
    )
}

export default Login