import React from 'react'
import './Button.css'
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Button(props) {
  return (
    <button className='button-verde'> <h2 className='h2-componente'>{props.texto}</h2> <span className='img-span'><IoIosArrowRoundForward /></span></button>
  )
}
