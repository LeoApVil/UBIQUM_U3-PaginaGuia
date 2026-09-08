import React from "react";

function Card({ titulo, descripcion, imagen }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img 
        src={imagen} 
        className="card-img-top" 
        alt={titulo}
        style={{ height: '150px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text text-secondary">{descripcion}</p>
        <button className="btn btn-primary">
          Leer más
        </button>
      </div>
    </div>
  );
}

function ListaArticulos() {
  const articulos = [
    { id: 1, titulo: 'React para principiantes', descripcion: 'Aprende los fundamentos de React', imagen: 'https://via.placeholder.com/250x150/FF6B6B/FFFFFF?text=React' },
    { id: 2, titulo: 'JSX explicado', descripcion: 'Entiende cómo funciona JSX', imagen: 'https://via.placeholder.com/250x150/4ECDC4/FFFFFF?text=JSX' },
    { id: 3, titulo: 'Componentes en React', descripcion: 'Crea componentes reutilizables', imagen: 'https://via.placeholder.com/250x150/45B7D1/FFFFFF?text=Componentes' },
    { id: 4, titulo: 'Estado y props', descripcion: 'Maneja datos en tus componentes', imagen: 'https://via.placeholder.com/250x150/F9CA24/FFFFFF?text=Estado' }
  ];

  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center p-4">
      {articulos.map(articulo => (
        <Card 
          key={articulo.id}
          titulo={articulo.titulo}
          descripcion={articulo.descripcion}
          imagen={articulo.imagen}
        />
      ))}
    </div>
  );
}

export default ListaArticulos;