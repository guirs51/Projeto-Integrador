import React from 'react'
import RegisterField from '../../componentes/registerField'
import PasswordField from '../../componentes/passwordField'
import './Register.css'
import Hearder from '../../componentes/Hearder'


function Register() {
    return (
        <>
            <Hearder />
            <div className='register-container'>

                <div id='text'>
                    <h2 id='big-txt'>
                        Create an  <br /> account:
                    </h2>
                    <h3 id='small-txt'>
                        Transform the future now.Your help will <br />
                        make a difference!
                    </h3>
                </div>

                <div id='register'>
                    <RegisterField texto='Email:' />
                    <RegisterField texto='CPF:' />
                    <PasswordField texto='Password:' />
                    <PasswordField texto='Confirm password:' />
                </div>
            </div>
        </>
    )
}

export default Register