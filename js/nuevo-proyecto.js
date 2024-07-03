import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion()

document.querySelector("#boton-nuevo-proyecto").addEventListener("click", () => { 
    const titulo = obtenerValorInput("nuevo-titulo")
    const descripcion = obtenerValorInput("nueva-descripcion")
    const prioridad = obtenerValorInput("nueva-prioridad")
    const estado = obtenerValorInput("nuevo-estado")
    const usuario = sessionStorage.getItem("user")
    const categoria = obtenerValorInput("nueva-categoria")


    if (!titulo || !descripcion || !prioridad || !estado || !usuario || !categoria) {
        document.querySelector("#nuevo-proyecto-error").style.cssText = "display: block !important;";
        imprimir("nuevo-proyecto-error", "Por favor, rellene todos los campos")
        return
    }

    const body = JSON.stringify({ titulo, descripcion, prioridad, estado, usuario, categoria });
    

    RequestsAPI.postProyecto(body)
    .then(() => {
        document.location.replace("proyectos.html");
    })
    .catch((error) => {
        document.querySelector("#nuevo-proyecto-error").style.display = "block !important";
        imprimir("nuevo-proyecto-error", error)
    })
})