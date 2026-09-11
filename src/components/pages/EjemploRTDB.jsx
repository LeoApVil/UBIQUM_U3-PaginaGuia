import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { APIjson } from "../../services/APIjson";

import { useNavigate } from "react-router-dom";

import { borrarVidJ } from "../../services/VidCRUD";


function EjemploRTDB() {
  const [videojuegos, setVideojuegos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const videojuegosRef = ref(db, "videojuegos");

    const unsubscribe = onValue(videojuegosRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const lista = Object.entries(data).map(([id, videojuego]) => ({
          id,
          ...videojuego
        }));
        setVideojuegos(lista);
      } else {
        setVideojuegos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="h-100">
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold">Firebase Realtime Database</h2>

        <p className="text-muted">
          Videojuegos obtenidos desde Realtime Database
        </p>

        <button
          className="btn btn-success mt-2"
          type="button"
          onClick={() => navigate("/videojuegos/nuevo")}
        >
          Agregar videojuego
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        {videojuegos.map((videojuego) => (
          <div className="card shadow-sm border-0" key={videojuego.id}>
            <div className="row align-items-center">

              <div className="col-3 col-sm-3">
                <img
                  src={videojuego.imagen}
                  className="img-fluid rounded-start"
                  alt={videojuego.titulo}
                  style={{
                    height: "120px",
                    width: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>

              <div className="col-6 col-sm-5">
                <div className="card-body py-2">
                  <h3 className="card-title h5 mb-1">
                    {videojuego.titulo}
                  </h3>

                  <p className="card-text text-muted mb-0 small">
                    Desarrollador: {videojuego.desarrollador}
                  </p>
                </div>
              </div>
{/*  */}
              <div className="col-3 col-sm-3 d-flex justify-content-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/videojuegos/editar/${videojuego.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0b5ed7";
                    e.currentTarget.style.borderColor = "#0a58ca";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0d6efd";
                    e.currentTarget.style.borderColor = "#0d6efd";
                  }}
                  style={{
                    display: "inline-block",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "center",
                    textDecoration: "none",
                    verticalAlign: "middle",
                    cursor: "pointer",
                    userSelect: "none",
                    border: "1px solid #0d6efd",
                    padding: "0.375rem 0.75rem",
                    fontSize: "1rem",
                    borderRadius: "0.375rem",
                    color: "#fff",
                    backgroundColor: "#0d6efd",
                    transition: "all 0.15s ease-in-out",
                    marginRight: "0.5rem",
                  }}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => borrarVidJ({ id: videojuego.id })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#bb2d3b";
                    e.currentTarget.style.borderColor = "#b02a37";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#dc3545";
                    e.currentTarget.style.borderColor = "#dc3545";
                  }}
                  style={{
                    display: "inline-block",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "center",
                    textDecoration: "none",
                    verticalAlign: "middle",
                    cursor: "pointer",
                    userSelect: "none",
                    border: "1px solid #dc3545",
                    padding: "0.375rem 0.75rem",
                    fontSize: "1rem",
                    borderRadius: "0.375rem",
                    color: "#fff",
                    backgroundColor: "#dc3545",
                    transition: "all 0.15s ease-in-out",
                  }}
                >
                  Eliminar
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EjemploAPI() {
  const [videojuegos, setVideojuegos] = useState([]);
  const API_URL = "/videojuegos_1.json";

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const datosAPI = await APIjson(API_URL);
        setVideojuegos(datosAPI.videojuegos);
      } catch (error) {
        console.log("Hubo un error");
      }
    };

    obtenerDatos();
  }, []);

  return (
  <section className="h-100">
    <div className="text-center mb-4">
      <h2 className="display-6 fw-bold">API/JSON</h2>
      <p className="text-muted">
        Videojuegos obtenidos desde API/JSON
      </p>
    </div>

    <div className="d-flex flex-column gap-3">
      {videojuegos.map((videojuego) => (
        <div className="card shadow-sm border-0" key={videojuego.id}>
          <div className="row align-items-center">

            <div className="col-3 col-sm-3">
              <img
                src={videojuego.imagen}
                className="img-fluid rounded-start"
                alt={videojuego.titulo}
                style={{
                  height: "120px",
                  width: "100%",
                  objectFit: "cover"
                }}
              />
            </div>

            <div className="col-6 col-sm-5">
              <div className="card-body py-2">
                <h3 className="card-title h5 mb-1">
                  {videojuego.titulo}
                </h3>

                <p className="card-text text-muted mb-0 small">
                  Desarrollador: {videojuego.desarrollador}
                </p>
              </div>
            </div>

            <div className="col-3 col-sm-3 d-flex justify-content-center gap-2">
              {/* <button
                className="btn btn-primary" type="button">
                Editar
              </button>

              <button className="btn btn-danger" type="button">
                Eliminar
              </button> */}
            </div>

          </div>
        </div>
      ))}
    </div>
  </section>
);
}



function VistaEjemplosDatos() {
  return (
    <div className="container-fluid my-5 px-4">
      <div className="row g-5">
        <div className="col-12 col-xl-6">
          <EjemploRTDB />
        </div>
        <div className="col-12 col-xl-6 border-start-xl">
          <EjemploAPI />
        </div>
      </div>
    </div>
  );
}

export default VistaEjemplosDatos;