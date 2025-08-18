import React from 'react'
import RegisterField from '../componets/registerField'
import PasswordField from '../componets/passwordField'
import './Register.css'

function Register() {
    return (
        <>
            <section id='register-container'>

                    <div id='text'>
                        <h2 id='big-txt'>
                            Create an account:
                        </h2>
                        <h3 id='small-txt'>
                            Transform the future now.Your help will <br />
                            make a difference!
                        </h3>
                    </div>

                <div id='register'>
                    <RegisterField texto='Email' />
                    <RegisterField texto='Cpf' />
                    <PasswordField texto='Password' />
                    <PasswordField texto='Confirm password' />
                </div>
            </section>




        </>
    )
}

export default Register