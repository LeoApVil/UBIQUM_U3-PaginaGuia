export const CloudinaryService = async (file) =>
{
    const preset_name = "leoapvil_pagReactTuto"
    const cloud_name = "dftg94wb4"
    const url_api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

    const datos = new FormData()

    datos.append('file', file)
    datos.append('upload_preset', preset_name)

    try
    {
        const response = await fetch(
            url_api,
            {
                method: 'POST',
                body: datos 
            }
        )

        const result = await response.json()

        if(!response.ok){
            console.log("Error al subir la imagen")
            return result.error

        }else if (response.ok){
            console.log(result)
            return result
        }

    }catch(error) 
    {
        console.error(error)
        throw error;
    }
}