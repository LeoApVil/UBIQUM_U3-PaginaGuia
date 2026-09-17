import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

export const EjemploCloudinary = () =>{
    
    const navigate = useNavigate();
    const [consolas, setConsola] = useState([]);
    

    useEffect(() => {
        const refConsola = ref(db, "consolas")
        const unsubscribe = onValue(refConsola, (snapshot) =>{
            const datosConsolas = snapshot.val();

            if(datosConsolas){
                const listaConsolas = Object.entries(datosConsolas).map(([id, consola]) =>({
                    id,
                    ...consola
                }))

                setConsola(listaConsolas)
            }else{
                setConsola([])
            }
        });

        return unsubscribe

    }, [])

    return (
        <>
            <section className="container mt-4">
                <h1 className="mb-4">Ejemplo de uso de Cloudinary</h1>

                <div className="list-group">
                    {consolas.map((consola) => (
                        <div
                            key={consola.id}
                            className="list-group-item list-group-item-action"
                        >
                            <div className="d-flex align-items-center gap-4">

                                <img
                                    src={consola.urlImg}
                                    alt={consola.nombre}
                                    width="150"
                                    height="150"
                                    className="rounded object-fit-cover"
                                />

                                <div className="flex-grow-1">
                                    <h2 className="h4 mb-2">
                                        {consola.nombre}
                                    </h2>

                                    <p className="mb-3">
                                        {consola.descripcion}
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate(`/consolas/editar/${consola.id}`)
                                        }
                                    >
                                        Editar
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}