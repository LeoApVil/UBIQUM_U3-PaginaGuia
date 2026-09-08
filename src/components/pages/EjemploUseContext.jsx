import React, { useState, createContext, useContext } from "react";

// El componente abuelo mantiene el estado y debe pasarlo hacia abajo
function ComponenteAbueloSinContext() {
  const [usuario, setUsuario] = useState("Carlos");

  return (
    <div className="card h-100 shadow-sm border-danger">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-danger mb-3">1. Sin useContext</h4>
        <p className="text-muted small">
          El estado está aquí, pero debe pasar por componentes intermedios que no lo usan.
        </p>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Cambiar usuario..."
          />
        </div>

        <ComponentePadreSinContext usuario={usuario} />
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-danger fw-semibold">
          Paso innecesario de props (Prop Drilling)
        </small>
      </div>
    </div>
  );
}

// El componente padre NO necesita 'usuario', pero debe recibirlo para pasarlo al hijo
function ComponentePadreSinContext({ usuario }) {
  return (
    <div className="p-3 bg-light rounded border mt-auto">
      <h6 className="text-muted mb-2">Componente Padre (Intermedio)</h6>
      <p className="small text-muted mb-2">
        Recibo <code>usuario</code> únicamente para pasarlo hacia abajo.
      </p>
      {/* Pasa la prop al Nieto */}
      <ComponenteNietoSinContext usuario={usuario} />
    </div>
  );
}

// El nieto es quien realmente necesita el dato
function ComponenteNietoSinContext({ usuario }) {
  return (
    <div className="p-2 bg-white rounded border">
      <h6 className="fw-bold mb-1">Componente Nieto (Consumidor):</h6>
      <span className="badge bg-danger fs-6">{usuario}</span>
    </div>
  );
}

// Paso A: Creación del Contexto
const UsuarioContext = createContext(null);

function ComponenteAbueloConContext() {
  const [usuario, setUsuario] = useState("Ana");

  return (
    // Paso B: Proveer el valor a toda la rama descendiente
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      <div className="card h-100 shadow-sm border-success">
        <div className="card-body d-flex flex-column">
          <h4 className="card-title text-success mb-3">2. Con useContext</h4>
          <p className="text-muted small">
            El contexto expone los datos de forma global dentro de esta rama de componentes.
          </p>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Cambiar usuario..."
            />
          </div>

          <ComponentePadreConContext />
        </div>
        <div className="card-footer bg-light text-center border-top-0">
          <small className="text-success fw-semibold">
            Acceso directo al estado sin pasar props intermedias
          </small>
        </div>
      </div>
    </UsuarioContext.Provider>
  );
}

// El padre ya NO recibe props
function ComponentePadreConContext() {
  return (
    <div className="p-3 bg-light rounded border mt-auto">
      <h6 className="text-muted mb-2">Componente Padre (Intermedio)</h6>
      <p className="small text-muted mb-2">
        Limpio: No recibo ni retransmito ninguna prop.
      </p>
      <ComponenteNietoConContext />
    </div>
  );
}

// El nieto consume el contexto directamente
function ComponenteNietoConContext() {
  const { usuario } = useContext(UsuarioContext);

  return (
    <div className="p-2 bg-white rounded border">
      <h6 className="fw-bold mb-1">Componente Nieto (Consumidor):</h6>
      <span className="badge bg-success fs-6">{usuario}</span>
    </div>
  );
}

const TemaContext = createContext();

function ComponenteConTema() {
  const [temaOscuro, setTemaOscuro] = useState(false);

  const toggleTema = () => setTemaOscuro((prev) => !prev);

  return (
    <TemaContext.Provider value={{ temaOscuro, toggleTema }}>
      <TarjetaConTema />
    </TemaContext.Provider>
  );
}

function TarjetaConTema() {
  // Consumimos el contexto del tema en cualquier nivel de la app
  const { temaOscuro, toggleTema } = useContext(TemaContext);

  const modoClases = temaOscuro
    ? "bg-dark text-white border-secondary"
    : "bg-light text-dark border-primary";

  return (
    <div className={`card h-100 shadow-sm ${modoClases}`}>
      <div className="card-body d-flex flex-column text-center">
        <h4 className="card-title mb-3">Caso Real: Selector de Tema</h4>
        <p className="small my-auto">
          El tema actual es: <strong>{temaOscuro ? "Oscuro 🌙" : "Claro ☀️"}</strong>
        </p>

        <button
          className={`btn mt-3 ${temaOscuro ? "btn-outline-light" : "btn-primary"}`}
          onClick={toggleTema}
        >
          Cambiar a modo {temaOscuro ? "Claro" : "Oscuro"}
        </button>
      </div>
      <div className="card-footer text-center border-top-0 opacity-75">
        <small>Útil para datos globales como temas, idiomas o autenticación.</small>
      </div>
    </div>
  );
}

function EjemploUseContext() {
  return (
    <div className="container py-4">
      <header className="text-center mb-5">
        <h1 className="fw-bold">Uso de useContext en React</h1>
        <p className="text-muted">
          Solución al problema de Prop Drilling y gestión de estado compartido.
        </p>
      </header>

      <section className="mb-5">
        <h3 className="mb-3 border-bottom pb-2">1. Comparativa: Con vs Sin Context</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <ComponenteAbueloSinContext />
          </div>
          <div className="col-md-6">
            <ComponenteAbueloConContext />
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-3 border-bottom pb-2">2. Aplicación Práctica</h3>
        <div className="row g-4">
          <div className="col-md-12">
            <ComponenteConTema />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EjemploUseContext;