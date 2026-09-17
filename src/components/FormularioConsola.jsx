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
        console.log(nuevaUrl)
        try{
            if(nuevaUrl.secure_url){
                await update(refConsola, {
                    "urlImg": nuevaUrl.secure_url
                })
                
                setEstadoImg(`${nuevaUrl.display_name} se ha subido`)
            }else 
            if(nuevaUrl.message){
                setEstadoImg(nuevaUrl.message)
            }
        }catch(error){
            console.log(error)
            setEstadoImg(error)
        }
    }

    return(
        <>
        <div className="container mt-4">
            <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h1 className="h4 mb-0">Editar imagen de consola</h1>
            </div>
            <div className="card-body">
                <h3 className="h5 text-secondary mb-3">{consolas.nombre}</h3>

                <div className="mb-3">
                <label htmlFor="imgCloud_consola" className="form-label fw-semibold">
                    Imagen de la consola
                </label>
                <input
                    id="imgCloud_consola"
                    className="form-control"
                    type="file"
                    name="imgCloud_consola"
                    accept="image/*"
                    onChange={(e) => {
                    subirImgBD(e.target.files[0]);
                    }}
                />
                <div className="form-text">Sube tu imagen acá (JPG, PNG, etc.)</div>
                </div>

                {estadoImg && (
                <div className="alert alert-info py-2 mb-0" role="alert">
                    {estadoImg}
                </div>
                )}
            </div>
            </div>
        </div>
        </>
    )
}

