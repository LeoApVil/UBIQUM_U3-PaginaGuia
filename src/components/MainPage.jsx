import { useState } from 'react'

// Componentes
import Carrusel from './CarruselImgs'
import ListaArticulos from './CardsArticulos'


function MainPage() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div style={{ paddingTop: '80px' }}>
            <Carrusel />
            <ListaArticulos />
        </div>
    </>
  )
}

export default MainPage;