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
            <section>
                <h1>Ejemplo de uso de Cloudinary</h1><br /><br />

                {consolas.map((consola) =>
                    (<div key={consola.id}>
                        <h1>{consola.nombre}</h1>
                        <img src={consola.urlImg}
                        alt={consola.nombre}
                        width="250"
                        height="250"></img>
                        <p>{consola.descripcion}</p>
                        <hr />
                        <button
                            onClick={() => navigate(`/consolas/editar/${consola.id}`)}
                        >Editar</button>
                    </div>)
                )}
            </section>
        </>
    )
}