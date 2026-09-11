import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  ref,
  onValue,
  update,
  push,
  set,
  remove
} from "firebase/database";

const manejoDatos = async (idAct, tituloN, desaN, platN, multN, imgN, precN, valN, anyoN, funARea) => {
  const objVid = 
    {
      "id": idAct,
      "titulo": tituloN,
      "desarrollador": desaN,
      "plataformas": platN,
      "multijugador": multN,
      "imagen": imgN,
      "precio": precN,
      "valoracion": valN,
      "anyo_lanzamiento": anyoN
    }

  if(funARea === "actualizar"){
    actuVidJ(objVid)
  }else if(funARea === "crear"){
    aniadirVidJ(objVid)
  }else if(funARea === "borrar"){
    borrarVidJ(objVid)
  } else{
    console.log("Error")
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

const borrarVidJ = async (datosObj) => {
  try{
    const vidRef = ref(db, `videojuegos/${datosObj.id}`)
    await remove(vidRef)
  }catch(error){
    console.log(error)
  }
}

export { actuVidJ, aniadirVidJ, borrarVidJ };