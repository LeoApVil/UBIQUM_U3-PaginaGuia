import { db } from "../services/firebase";
import { ref, update, push, set, remove } from "firebase/database";

const aniadirVidJ = async (datosObj) => {
  try{
    const vidRef = ref(db, `videojuegos`)
    const newVid = push(vidRef)
    await set(newVid, {
      "titulo": datosObj.titulo,
      "desarrollador": datosObj.desarrollador,
      "plataformas": datosObj.plataformas,
      "multijugador": datosObj.multijugador,
      "imagen": datosObj.imagen,
      "precio": datosObj.precio,
      "valoracion": datosObj.valoracion,
      "anyo_lanzamiento": datosObj.anyo_lanzamiento
    })
  }catch(error){
    console.log(error)
  }
}

const actuVidJ = async (datosObj) => {
  try{
    const vidRef = ref(db, `videojuegos/${datosObj.id}`)
    await update(vidRef, {
      "titulo": datosObj.titulo,
      "desarrollador": datosObj.desarrollador,
      "plataformas": datosObj.plataformas,
      "multijugador": datosObj.multijugador,
      "imagen": datosObj.imagen,
      "precio": datosObj.precio,
      "valoracion": datosObj.valoracion,
      "anyo_lanzamiento": datosObj.anyo_lanzamiento
    })
  }catch(error){
    console.log(error)
  }
}

const borrarVidJ = async (datosObj) => {
  try{
    const vidRef = ref(db, `videojuegos/${datosObj.id}`)
    await remove(vidRef)
  }catch(error){
    console.log(error)
  }
}

export { actuVidJ, aniadirVidJ, borrarVidJ };