import React from 'react'
import './passwordField.css'

function PasswordField(prop) {
    return (
        <>
            <h2 id='texto'>{prop.texto}</h2>
            <div id='form-password'>
                <form >
                    <input type="password" />
                </form>
            </div>

        </>
    )
}

export default PasswordField