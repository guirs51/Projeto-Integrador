import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hearder from './componentes/Hearder'
import Banner from './componentes/Banner'
import Login from './componentes/Login'

function App() {


  return (
    <>
      <Hearder></Hearder>
     {/* <Banner img={'../src/img/fundo.png'}/> */}
    
    <Login></Login>
    </>
    
  )
}

export default App
