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

        if(!response.ok){
            console.log("Error al subir la imagen")
        }
        
        const result = await response.json()
        console.log(result);

        return result.secure_url

    }catch(error) 
    {
        console.error(error.message)
        return null;
    }
}