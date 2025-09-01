import React from 'react'
import './header.css'

function Hearder() {
  return (
        <header>
            <img src="../src/img/logo.png" alt="Logo" />
            <nav>
                <a href="/">Home</a>
                <a href="/regis">Register</a>
                <a href="/login">Login</a>
                <a href="">About us</a>
                <a href="">Others</a>
            </nav>
        </header>
  )
}

export default Hearder