export const APIjson = (jsondata) => {
    return(
        fetch(jsondata)
        .then(response =>{
            return response.json()
        })
        .catch(error => {
            return console.log(error)
        })
    )
}