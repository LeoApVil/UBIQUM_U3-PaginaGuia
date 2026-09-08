import React, { useState } from "react";

function Carrusel() {
  const imagenes = [
    'https://via.placeholder.com/800x300/FF6B6B/FFFFFF?text=Slide+1',
    'https://via.placeholder.com/800x300/4ECDC4/FFFFFF?text=Slide+2',
    'https://via.placeholder.com/800x300/45B7D1/FFFFFF?text=Slide+3'
  ];

  const [indice, setIndice] = useState(0);
  const [errorImagen, setErrorImagen] = useState(false);

  const siguiente = () => {
    setIndice((indice + 1) % imagenes.length);
    setErrorImagen(false); // Resetear error al cambiar de imagen
  };

  const anterior = () => {
    setIndice((indice - 1 + imagenes.length) % imagenes.length);
    setErrorImagen(false); // Resetear error al cambiar de imagen
  };

  const manejarErrorImagen = () => {
    setErrorImagen(true);
  };

  return (
    <div className="position-relative w-75 mx-auto my-4">
      {/* Contenedor de la imagen con manejo de error */}
      <div className="position-relative" style={{ height: '300px' }}>
        {errorImagen ? (
          // Mensaje de error cuando la imagen no se carga
          <div 
            className="w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-light text-secondary"
            style={{ height: '300px', borderRadius: '4px' }}
          >
            <i className="bi bi-image fs-1 mb-2"></i>
            <p className="text-center mb-0">
              <strong>No se ha renderizado la imagen</strong>
              <br />
              <small>La imagen no pudo cargarse correctamente</small>
            </p>
          </div>
        ) : (
          <img 
            src={imagenes[indice]} 
            alt={`Slide ${indice + 1}`}
            className="w-100 h-100"
            style={{ objectFit: 'cover', borderRadius: '4px' }}
            onError={manejarErrorImagen}
          />
        )}
      </div>
      
      {/* Botón anterior */}
      <button 
        onClick={anterior}
        className="position-absolute top-50 start-0 translate-middle-y btn btn-dark btn-sm"
        style={{ marginLeft: '10px', zIndex: 10 }}
      >
        ◀
      </button>
      
      {/* Botón siguiente */}
      <button 
        onClick={siguiente}
        className="position-absolute top-50 end-0 translate-middle-y btn btn-dark btn-sm"
        style={{ marginRight: '10px', zIndex: 10 }}
      >
        ▶
      </button>

      {/* Indicadores de posición */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3" style={{ zIndex: 10 }}>
        {imagenes.map((_, index) => (
          <span
            key={index}
            className={`badge rounded-pill mx-1 ${index === indice ? 'bg-primary' : 'bg-secondary'}`}
            style={{ 
              cursor: 'pointer', 
              width: '12px', 
              height: '12px', 
              padding: 0,
              opacity: index === indice ? 1 : 0.6
            }}
            onClick={() => {
              setIndice(index);
              setErrorImagen(false);
            }}
          >
            &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export default Carrusel;