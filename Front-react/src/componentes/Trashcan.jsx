import React from 'react'
import "./trashcan.css"


function Trashcan(prop) {
    return (
        <>

            <div id='trashcan-body'>

                <div id='trashcan-header'>
                    <h2>{prop.texto}</h2>
                </div>

                <img id='img' src="../src/img/reciclagemSimolo.png" alt="" />
            </div>
        </>
    )
}

export default Trashcan