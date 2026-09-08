import React, { useState, useEffect } from "react";

// 1. SIN DEPENDENCIAS vs CON ARRAY VACÍO
function EjemploCicloVida() {
  const [contador, setContador] = useState(0);

  // Se ejecuta en CADA renderizado
  useEffect(() => {
    console.log("🟡 useEffect: Ejecutado en cada renderizado (Por defecto)");
  });

  // Se ejecuta SOLO UNA VEZ (al montar el componente)
  useEffect(() => {
    console.log("🟢 useEffect: Ejecutado solo al montar (Se debe ejecutar UNA VEZ)");
  }, []);

  // Se ejecuta cuando 'contador' cambia
  useEffect(() => {
    console.log(`🔵 useEffect: El contador cambió a ${contador}`);
  }, [contador]);

  return (
    <div className="card h-100 shadow-sm border-primary">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-primary mb-3">Ciclo de Vida y Dependencias</h4>
        <p className="text-muted small">
          Abre la consola del navegador para ver cuándo se dispara cada <code>useEffect</code>.
        </p>

        <div className="display-4 text-center my-auto fw-bold">{contador}</div>

        <button
          className="btn btn-primary mt-3 w-100"
          onClick={() => setContador((prev) => prev + 1)}
        >
          Re-renderizar (Incrementar)
        </button>
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-muted">
          Revisa el comportamiento según el array de dependencias.
        </small>
      </div>
    </div>
  );
}

function TemporizadorConCleanup() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let intervalo = null;

    if (activo) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    }

    // Función de Limpieza
    return () => {
      if (intervalo) {
        clearInterval(intervalo);
        console.log("Cleanup: Intervalo limpiado");
      }
    };
  }, [activo]);

  return (
    <div className="card h-100 shadow-sm border-warning">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-warning text-dark mb-3">Temporizador (Con Cleanup)</h4>
        <p className="text-muted small">
          Utiliza la función de retorno para limpiar timers y evitar fugas de memoria.
        </p>

        <div className="display-4 text-center my-auto fw-bold">{segundos}s</div>

        <div className="d-flex gap-2 mt-3">
          <button
            className={`btn w-50 ${activo ? "btn-warning" : "btn-success"}`}
            onClick={() => setActivo(!activo)}
          >
            {activo ? "Pausar" : "Iniciar"}
          </button>
          <button
            className="btn btn-outline-secondary w-50"
            onClick={() => {
              setActivo(false);
              setSegundos(0);
            }}
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-muted">Evita fugas de memoria limpiando recursos.</small>
      </div>
    </div>
  );
}

function PeticionDatos() {
  const [usuarioId, setUsuarioId] = useState(1);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    let ignorar = false; // Flag para evitar condiciones de carrera (Race Conditions)
    setCargando(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${usuarioId}`)
      .then((response) => response.json())
      .then((data) => {
        if (!ignorar) {
          setUsuario(data);
          setCargando(false);
        }
      });

    return () => {
      ignorar = true; // Ignora la petición anterior si usuarioId cambia rápido
    };
  }, [usuarioId]); // Se re-ejecuta cada vez que cambia el ID

  return (
    <div className="card h-100 shadow-sm border-info">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-info mb-3">Carga de Datos (Fetch API)</h4>
        <p className="text-muted small">
          Realiza peticiones HTTP cada vez que cambia una dependencia (<code>usuarioId</code>).
        </p>

        <div className="d-flex gap-2 mb-3">
          <button
            className="btn btn-outline-info flex-grow-1"
            disabled={usuarioId <= 1}
            onClick={() => setUsuarioId((prev) => prev - 1)}
          >
            Anterior
          </button>
          <span className="align-self-center fw-bold">ID: {usuarioId}</span>
          <button
            className="btn btn-outline-info flex-grow-1"
            disabled={usuarioId >= 10}
            onClick={() => setUsuarioId((prev) => prev + 1)}
          >
            Siguiente
          </button>
        </div>

        <div className="p-3 bg-light rounded border my-auto">
          {cargando ? (
            <div className="text-center text-muted">Cargando datos...</div>
          ) : usuario ? (
            <div>
              <h6 className="fw-bold mb-1">{usuario.name}</h6>
              <p className="mb-1 small"><strong>Email:</strong> {usuario.email}</p>
              <p className="mb-0 small"><strong>Empresa:</strong> {usuario.company?.name}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-muted">Sincronización con APIs externas.</small>
      </div>
    </div>
  );
}

function EjemploUseEffect() {
  return (
    <div className="container py-4">
      <header className="text-center mb-5">
        <h1 className="fw-bold">Casos de Uso de useEffect en React</h1>
        <p className="text-muted">
          Demostración práctica de ciclo de vida, limpiezas y consumo de API externas.
        </p>
      </header>

      <section className="mb-5">
        <h3 className="mb-3 border-bottom pb-2">1. Control de Ejecución y Limpieza</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <EjemploCicloVida />
          </div>
          <div className="col-md-6">
            <TemporizadorConCleanup />
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-3 border-bottom pb-2">2. Peticiones e Integraciones</h3>
        <div className="row g-4">
          <div className="col-md-12">
            <PeticionDatos />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EjemploUseEffect;