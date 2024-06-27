const obtenerUrl = (ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"

}

const token = sessionStorage.getItem("session")
if(token){
    headers.Authorization = token;
}

const procesarRespuesta = (res) => {
    return res.json().then((data) => {
        if(data.error){
            throw new Error(data?.error)
        }

        return data;
        
    })
}

const procesarErrores = (error = new Error("Ocurrio un error inesperado")) => {
    console.error("Hubo un error:", error.message)
    throw error.message
}
export class RequestsAPI {

    static urlBaseBackend = "http://localhost:3000";

    //post /login
    static login(email, password) {
        const body = JSON.stringify({ email, password });

        return fetch(obtenerUrl("login"), {method: "POST", headers, body})
        .then(procesarRespuesta)
        .catch(procesarErrores)
    }

    static obtenerProyectos(opciones = {})  {
        const queryParams = new URLSearchParams({})

        if(opciones.filtroTitulo){
            queryParams.set("nombre", opciones.filtroTitulo)
        }

        if(opciones.filtroPrioridad){
            queryParams.set("prioridad", opciones.filtroPrioridad)
        }

        if(opciones.filtroEstado){
            queryParams.set("estado", opciones.filtroEstado)
        }

        return fetch(obtenerUrl("proyectos?"+queryParams), {method: "GET", headers})
        .then(procesarRespuesta)
        .catch(procesarErrores)
    }
}