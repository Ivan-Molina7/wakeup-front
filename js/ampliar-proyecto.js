import Proyecto from "../Models/Proyecto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, validarSesion } from "../utils/helpers.js";

validarSesion()


// obtenemos el id del proyecto
const params = new URLSearchParams(window.location.search)
const idProyecto = params.get("id");

const mostrarError = (error) => {
    imprimir("detalle-error", error);
}

const mostrarDetalle = (data)  => {
    const proyecto = new Proyecto(
        data.id, 
        data.titulo, 
        data.descripcion, 
        data.prioridad, 
        data.estado,
        data.categoria);
     imprimir("detalle", proyecto.mostrarDetalle())
} 

document.querySelector("#boton-editar-proyecto").addEventListener("click", () => {
    document.location.replace(`editar-proyecto.html?id=${idProyecto}`)
})

document.querySelector("#boton-eliminar-proyecto").addEventListener("click", () => { 
    RequestsAPI.deleteProyecto(idProyecto)
    .then(()  => {
        document.location.replace("proyectos.html");
    })
    .catch((error) => {
       mostrarError(error);
    })

})

RequestsAPI.obtenerProyecto(idProyecto)
    .then(mostrarDetalle)
    .catch((error) => {
        mostrarError(error);
    })
