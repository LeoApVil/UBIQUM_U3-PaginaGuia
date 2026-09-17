import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { update, onValue, ref } from "firebase/database";
import { CloudinaryService } from "../services/Cloudinary";
import { db } from "../services/firebase";

export const FormularioConsola1 = () => {
    const { id } = useParams()
    const [consolas, setConsolasForm] = useState(
        {
            nombre: "",
            compania: "",
            anio_lanzamiento: 0,
            descripcion: "",
            urlImg: ""
        }
    );
    const refConsola = ref(db, `consolas/${id}`)
    
    useEffect(() => {
            
            const unsubscribe = onValue(refConsola, (snapshot) =>{
            const datosConsolas = snapshot.val();

            if(datosConsolas){
                setConsolasForm(datosConsolas)
            }else{
                setConsolasForm({
                    nombre: "",
                    compania: "",
                    anio_lanzamiento: 0,
                    descripcion: "",
                    urlImg: ""
                })
            }
        });

        return unsubscribe
    },[id])

    const subirImgBD = async (nuevaImg) => {
        const nuevaUrl = await CloudinaryService(nuevaImg)
        try{
            await update(refConsola, {
                "urlImg": nuevaUrl
            })
            

        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <h1>Editar imagen de consola1.</h1>
            <h3>{consolas.nombre}</h3>
            <input
            type="file" 
            name ="imgCloud_consola"
            placeholder="Sube tu imagen acá"
            onChange={(e) => {
                subirImgBD(e.target.files[0])
            }}
            />
        </>
    )
}

