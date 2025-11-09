import React from 'react'
import "./HistoricCard.css"

export default function HistoricCard(props) {
  return (
    <div id='card'>
        <h2 id='text-title' > 
            {props.historicTitle} 
        </h2>
        <p id='text-date'>
            {props.historicDate} 
        </p>

    </div>
  )
}
