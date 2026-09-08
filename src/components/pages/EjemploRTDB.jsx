import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { APIjson } from "../../services/APIjson";

function EjemploRTDB() {
  const [videojuegos, setVideojuegos] = useState([]);

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
        <p className="text-muted">Videojuegos obtenidos desde Realtime Database</p>
      </div>

      <div className="d-flex flex-column gap-3">
        {videojuegos.map((videojuego) => (
          <div className="card shadow-sm border-0" key={videojuego.id}>
            <div className="row g-0 align-items-center">
              <div className="col-4 col-sm-3">
                <img
                  src={videojuego.imagen}
                  className="img-fluid rounded-start"
                  alt={videojuego.titulo}
                  style={{ height: "120px", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-8 col-sm-9">
                <div className="card-body py-2">
                  <h3 className="card-title h5 mb-1">{videojuego.titulo}</h3>
                  <p className="card-text text-muted mb-0 small">
                    Desarrollador: {videojuego.desarrollador}
                  </p>
                </div>
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
        <h2 className="display-6 fw-bold">JSON Local</h2>
        <p className="text-muted">Videojuegos obtenidos mediante Fetch</p>
      </div>

      <div className="d-flex flex-column gap-3">
        {videojuegos.map((videojuego) => (
          <div className="card shadow-sm border-0" key={videojuego.id}>
            <div className="row g-0 align-items-center">
              <div className="col-4 col-sm-3">
                <img
                  src={videojuego.imagen}
                  className="img-fluid rounded-start"
                  alt={videojuego.titulo}
                  style={{ height: "120px", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-8 col-sm-9">
                <div className="card-body py-2">
                  <h3 className="card-title h5 mb-1">{videojuego.titulo}</h3>
                  <p className="card-text text-muted mb-0 small">
                    Desarrollador: {videojuego.desarrollador}
                  </p>
                </div>
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