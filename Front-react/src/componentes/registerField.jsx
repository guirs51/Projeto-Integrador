import React from 'react'
import './registerField.css'

function RegisterField(prop) {
    return (
        <>
            
            <div className='form-register'>
                <h2>{prop.texto}</h2>
                <form> 
                    <input type="text" />
                </form>
            </div>

        </>
    )
}

export default RegisterField