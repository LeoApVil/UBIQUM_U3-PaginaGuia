import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../services/firebase";
import { aniadirVidJ, actuVidJ } from "../services/VidCRUD";

function FormularioVideojuego() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    titulo: "",
    desarrollador: "",
    plataformas: "",
    multijugador: false,
    imagen: "",
    precio: "",
    valoracion: "",
    anyo_lanzamiento: ""
  });
  const [cargando, setCargando] = useState(false);

  // Si existe ID, estamos editando
  useEffect(() => {
    const obtenerVideojuego = async () => {
      if (!id) return;
      try {
        setCargando(true);
        const videojuegoRef = ref(db, `videojuegos/${id}`);
        const snapshot = await get(videojuegoRef);
        if (snapshot.exists()) {
          const datos = snapshot.val();
          setFormulario({
            titulo: datos.titulo || "",
            desarrollador: datos.desarrollador || "",
            plataformas: datos.plataformas || "",
            multijugador: datos.multijugador || false,
            imagen: datos.imagen || "",
            precio: datos.precio || "",
            valoracion: datos.valoracion || "",
            anyo_lanzamiento: datos.anyo_lanzamiento || ""
          });
        }
      } catch (error) {
        console.error("Error al obtener el videojuego:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerVideojuego();
  }, [id]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({ ...formulario, [name]: type === "checkbox" ? checked : value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await actuVidJ({ id, ...formulario });
        console.log("Videojuego actualizado");
      } else {
        await aniadirVidJ(formulario);
        console.log("Videojuego creado");
      }
      navigate("/VistaEjemplosDatos");
    } catch (error) {
      console.error("Error al guardar el videojuego:", error);
    }
  };

  if (cargando) return <p>Cargando videojuego...</p>;

  return (
    <section className="container my-5">
      <div className="text-center mb-4">
        <h2 className="display-6 fw-bold">{id ? "Editar videojuego" : "Nuevo videojuego"}</h2>
        <p className="text-muted">{id ? "Modifica los datos del videojuego" : "Agrega un nuevo videojuego"}</p>
      </div>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input type="text" className="form-control" name="titulo" value={formulario.titulo} onChange={manejarCambio} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Desarrollador</label>
          <input type="text" className="form-control" name="desarrollador" value={formulario.desarrollador} onChange={manejarCambio} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Plataformas</label>
          <input type="text" className="form-control" name="plataformas" value={formulario.plataformas} onChange={manejarCambio} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input type="text" className="form-control" name="imagen" value={formulario.imagen} onChange={manejarCambio} />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" className="form-control" name="precio" value={formulario.precio} onChange={manejarCambio} />
        </div>
        <div className="mb-3">
          <label className="form-label">Valoración</label>
          <input type="number" className="form-control" name="valoracion" value={formulario.valoracion} onChange={manejarCambio} min="0" max="10" step="0.1" />
        </div>
        <div className="mb-3">
          <label className="form-label">Año de lanzamiento</label>
          <input type="number" className="form-control" name="anyo_lanzamiento" value={formulario.anyo_lanzamiento} onChange={manejarCambio} />
        </div>
        <div className="form-check mb-4">
          <input type="checkbox" className="form-check-input" name="multijugador" checked={formulario.multijugador} onChange={manejarCambio} />
          <label className="form-check-label">Multijugador</label>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">{id ? "Actualizar videojuego" : "Crear videojuego"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/VistaEjemplosDatos")}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}

export default FormularioVideojuego;