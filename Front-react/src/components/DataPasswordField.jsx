import React from 'react'
import "./DataPasswordField.css"

export default function DataPasswordField(props) {
    return (
        <div id='data-field'>
            <h2 id='text-local'>
                {props.title}
            </h2>
            <input disabled type="password" placeholder={props.info} id='input-field' />
        </div>
    )
}
