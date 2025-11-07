import React from 'react'
import "./DataField.css"

export default function DataField(props) {
    return (
        <div id='data-field'>
            <h2 id='text-local'>
                {props.title}
            </h2>
            <input disabled type="text" placeholder={props.info} id='input-field' />
        </div>
    )
}
