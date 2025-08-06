import React from 'react'
import './Banner.css' 

function Banner({img}) {
  return (
    <div className='banner' style={{backgroundImage:`url(${img})`}}></div>
  )
}

export default Banner