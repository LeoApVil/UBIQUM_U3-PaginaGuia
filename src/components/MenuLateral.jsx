import React, { useState } from "react";

function MenuLateral() {
  const [abierto, setAbierto] = useState(true);

  const menuItems = [
    { icono: '🏠', texto: 'Inicio', ruta: '#' },
    { icono: '📊', texto: 'Dashboard', ruta: '#' },
    { icono: '👥', texto: 'Usuarios', ruta: '#' },
    { icono: '⚙️', texto: 'Configuración', ruta: '#' },
    { icono: '📁', texto: 'Archivos', ruta: '#' }
  ];

  return (
    <div className="d-flex">
      {/* Botón para abrir/cerrar */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="position-fixed btn btn-dark btn-sm"
        style={{
          left: abierto ? '210px' : '10px',
          top: '10px',
          zIndex: 1000,
          transition: 'left 0.3s ease'
        }}
      >
        {abierto ? '◀' : '▶'}
      </button>

      {/* Menú lateral */}
      <div
        className="position-fixed top-0 start-0 vh-100 bg-dark text-white overflow-hidden"
        style={{
          width: abierto ? '200px' : '0px',
          transition: 'width 0.3s ease',
          paddingTop: '60px',
          zIndex: 999
        }}
      >
        <ul className="list-unstyled m-0">
          {menuItems.map((item, index) => (
            <li 
              key={index}
              className="d-flex align-items-center gap-2 px-3 py-3 border-bottom border-secondary"
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.classList.add('bg-secondary')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('bg-secondary')}
            >
              <span>{item.icono}</span>
              <span>{item.texto}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MenuLateral;