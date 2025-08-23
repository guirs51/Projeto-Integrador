import React from 'react'
import './passwordField.css'

function PasswordField(prop) {
    return (
        <>

            <div className='form-password'>
                <h2 id='texto'>{prop.texto}</h2>
                <form >
                    <input type="password" />
                </form>
            </div>

        </>
    )
}

export default PasswordField