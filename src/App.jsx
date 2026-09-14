import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

//Componentes
import MainPage from './components/MainPage';
import Navbar from './components/NavBar'
import VistaEjemplosDatos from './components/pages/EjemploRTDB';

import EjemploUseState from './components/pages/EjemploUseState'
import EjemploUseEffect from './components/pages/EjemploUseEffect';
import EjemploUseContext from './components/pages/EjemploUseContext';

import { EjemploCloudinary } from './components/pages/EjemploCloudinary';

import FormularioVideojuego from './components/FormularioVideojuego';
import { FormularioConsola } from './components/FormularioConsola';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <EjemploRTDB/> */}
      <div>

        <BrowserRouter>

          <Navbar />

          <div className="container mt-4">

            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route path="/EjemploUseState" element={<EjemploUseState />} />
              <Route path="/EjemploUseEffect" element={<EjemploUseEffect />} />
              <Route path="/EjemploUseContext" element={<EjemploUseContext />} /> 
              <Route path="/VistaEjemplosDatos" element={<VistaEjemplosDatos />} />
              <Route path="/EjemploCloudinary" element={<EjemploCloudinary />} />  

              <Route path="/videojuegos/nuevo" element={<FormularioVideojuego />} />
              <Route path="/videojuegos/editar/:id" element={<FormularioVideojuego />} />

              <Route path="/consolas/editar/:id" element={<FormularioConsola />} />
              
            </Routes>

          </div>

        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
