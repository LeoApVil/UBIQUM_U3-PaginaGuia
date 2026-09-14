import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { update, onValue, ref } from "firebase/database";
import { CloudinaryService } from "../services/Cloudinary";
import { db } from "../services/firebase";

export const FormularioConsola = () => {
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
    const [estadoImg, setEstadoImg] = useState("")
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
        setEstadoImg("")
        const nuevaUrl = await CloudinaryService(nuevaImg)
        try{
            await update(refConsola, {
                "urlImg": nuevaUrl
            })
        }catch(error){
            setEstadoImg("Error al subir la imagen")
            console.error(error);
        }

    }

    return(
        <>
            <h1>Editar imagen de consola.</h1>
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

