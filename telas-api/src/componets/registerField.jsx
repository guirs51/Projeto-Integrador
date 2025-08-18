import React from 'react'
import './registerField.css'

function RegisterField(prop) {
    return (
        <>
            <h2>{prop.texto}</h2>
            <div id='form-register'>
                <form> 
                    <input type="text" />
                </form>
            </div>

        </>
    )
}

export default RegisterField