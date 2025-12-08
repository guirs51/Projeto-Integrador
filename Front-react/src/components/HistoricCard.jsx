import React from 'react'
import "./HistoricCard.css"

export default function HistoricCard(props) {
  return (
    <div id='cardHist'>
        <h2 id='text-hist' > 
            {props.historicTitle} 
        </h2>
        <p id='text-dateHist'>
            {props.historicDate} 
        </p>

    </div>
  )
}
