import React, { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  const actualizarContador = (nuevoValor) => {
    setContador(nuevoValor);
    console.log("Valor en memoria (CON):", nuevoValor);
  };

  return (
    <div className="card h-100 shadow-sm border-success">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-success text-center mb-3">
          Contador (Con useState)
        </h4>
        <div className="display-3 text-center my-auto fw-bold">{contador}</div>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => actualizarContador(contador + 1)}
          >
            Incrementar
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => actualizarContador(contador - 1)}
          >
            Decrementar
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => actualizarContador(0)}
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-success fw-semibold">
          El valor cambia en memoria y la UI <strong>SÍ</strong> se actualiza
        </small>
      </div>
    </div>
  );
}

function ContadorRoto() {
  let contador = 0;

  const incrementar = (op) => {
    if (op === "sumar") contador += 1;
    else if (op === "restar") contador -= 1;
    else if (op === "reiniciar") contador = 0;
    
    console.log("Valor en memoria (SIN):", contador);
  };

  return (
    <div className="card h-100 shadow-sm border-danger">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-danger text-center mb-3">
          Contador (Sin useState)
        </h4>
        <div className="display-3 text-center my-auto fw-bold">{contador}</div>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => incrementar("sumar")}
          >
            Incrementar
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => incrementar("restar")}
          >
            Decrementar
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => incrementar("reiniciar")}
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-danger fw-semibold">
          El valor cambia en memoria y la UI <strong>NO</strong> se actualiza
        </small>
      </div>
    </div>
  );
}

function FormularioConState() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const [enviados, setEnviados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.email || !formulario.mensaje) {
      alert("Por favor, completa todos los campos");
      return;
    }

    setEnviados((prev) => [...prev, { ...formulario, id: Date.now() }]);
    setFormulario({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="card h-100 shadow-sm border-success">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-success mb-3">Formulario (Con useState)</h4>

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea
              className="form-control"
              name="mensaje"
              rows="2"
              value={formulario.mensaje}
              onChange={handleChange}
              placeholder="Escribe tu mensaje..."
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Enviar mensaje
          </button>
        </form>

        <div className="p-3 bg-light rounded border mb-3">
          <h6 className="fw-bold mb-2">Vista previa (tiempo real):</h6>
          <p className="mb-1"><strong>Nombre:</strong> {formulario.nombre || "—"}</p>
          <p className="mb-1"><strong>Email:</strong> {formulario.email || "—"}</p>
          <p className="mb-0"><strong>Mensaje:</strong> {formulario.mensaje || "—"}</p>
        </div>

        {enviados.length > 0 && (
          <div className="mt-auto">
            <h6 className="fw-bold">Mensajes enviados ({enviados.length}):</h6>
            <ul className="list-group">
              {enviados.map((msg) => (
                <li key={msg.id} className="list-group-item">
                  <strong>{msg.nombre}</strong> ({msg.email})
                  <br />
                  <small className="text-muted">{msg.mensaje}</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-success fw-semibold">
          Los campos y la vista previa se actualizan
        </small>
      </div>
    </div>
  );
}

function FormularioRoto() {
  let nombre = "";
  let email = "";
  let mensaje = "";
  let mensajesEnviados = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa todos los campos");
      return;
    }

    mensajesEnviados.push({ nombre, email, mensaje, id: Date.now() });
    console.log("Formulario enviado (en memoria):", { nombre, email, mensaje });
  };

  return (
    <div className="card h-100 shadow-sm border-danger">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title text-danger mb-3">Formulario (Sin useState)</h4>

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              onChange={(e) => { nombre = e.target.value; }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="tu@email.com"
              onChange={(e) => { email = e.target.value; }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Escribe tu mensaje..."
              onChange={(e) => { mensaje = e.target.value; }}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Enviar mensaje
          </button>
        </form>

        <div className="p-3 bg-light rounded border">
          <h6 className="fw-bold mb-2">Vista previa (NO se actualiza):</h6>
          <p className="mb-1"><strong>Nombre:</strong> {nombre || "—"}</p>
          <p className="mb-1"><strong>Email:</strong> {email || "—"}</p>
          <p className="mb-0"><strong>Mensaje:</strong> {mensaje || "—"}</p>
        </div>
      </div>
      <div className="card-footer bg-light text-center border-top-0">
        <small className="text-danger fw-semibold">
          Los campos no reflejan su estado en tiempo real
        </small>
      </div>
    </div>
  );
}

function EjemploUseState() {
  return (
    <div className="container py-4">
      <header className="text-center mb-5">
        <h1 className="fw-bold">Demostración de useState en React</h1>
        <p className="text-muted">
          Comparativa de comportamiento en UI con y sin gestión de estado.
        </p>
      </header>

      <section className="mb-5">
        <h3 className="mb-3 border-bottom pb-2">1. Control de Estado Simple</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <Contador />
          </div>
          <div className="col-md-6">
            <ContadorRoto />
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-3 border-bottom pb-2">2. Control de Formularios</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <FormularioConState />
          </div>
          <div className="col-md-6">
            <FormularioRoto />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EjemploUseState;