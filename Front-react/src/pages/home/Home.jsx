import { useState } from 'react'
import './Home.css'
import Hearder from '../../componentes/Hearder'

function Home() {
  return (
    <>
      <Hearder />
      <div className='div-pai'>
        <span className='box-branca'><h3 className='home-title'>Recicle +</h3> <span className='home-ball'></span> </span>
        <h1 className='h1-home'>Create your  <br />account or log in!</h1>
        <p className='home-p'>rascunho apresentado site</p>
        <div className='home-buttons'>
          <a href="/regis"><button className='home-botao'><h6 className='home-h6'>Register</h6></button></a>
          <a href="/login"><button className='home-botao'><h6 className='home-h6'>Login</h6></button></a>
        </div>
      </div>
    </>
  )
}

export default Home
