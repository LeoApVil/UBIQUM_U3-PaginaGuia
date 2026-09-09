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
    { id: 1, titulo: 'React-Vite', descripcion: 'Adentrate y aprende lo básico de React y Vite.', imagen: '#' },
    { id: 2, titulo: 'Firebase', descripcion: 'Aloja y despliega tu proyecto.', imagen: '#' },
    { id: 3, titulo: 'Hooks', descripcion: 'Aprende qué son los Hooks de React.', imagen: '#' },
    { id: 4, titulo: 'Realtime Database', descripcion: 'Crea tu primer conexión a una Base de Datos no relacional.', imagen: '#' },
    { id: 5, titulo: 'Google Authentication', descripcion: 'Implementa el autenticador de Google.', imagen: '#' },
    { id: 6, titulo: 'Cloudinary', descripcion: 'Aloja archivos subidos desde tu app web.', imagen: '#' },
    { id: 7, titulo: 'PWA', descripcion: 'Deja que instalen tu app web.', imagen: '#' }
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