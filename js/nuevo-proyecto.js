import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion()

document.querySelector("#boton-nuevo-proyecto").addEventListener("click", () => { 
    const titulo = obtenerValorInput("nuevo-titulo")
    const descripcion = obtenerValorInput("nueva-descripcion")
    const prioridad = obtenerValorInput("nueva-prioridad")
    const estado = obtenerValorInput("nuevo-estado")

    if (!titulo || !descripcion || !prioridad || !estado) {
        imprimir("nuevo-proyecto-error", "Por favor, rellene todos los campos")
        return
    }

    const body = JSON.stringify({ titulo, descripcion, prioridad, estado});


    RequestsAPI.postProyecto(body)
    .then(() => {
        document.location.replace("proyectos.html");
    })
    .catch((error) => {
        imprimir("nuevo-proyecto-error", error)
    })
})