import Proyecto from "../Models/Proyecto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion, eventoClickCerrarSesion } from "../utils/helpers.js";

validarSesion()
eventoClickCerrarSesion()

const mostrarListaProyectos =  (data) => {
    imprimir("lista-error", "");
    const listadoProyectos = data.map((proyecto) => 
        new Proyecto(
            proyecto.id, 
            proyecto.titulo, 
            proyecto.descripcion, 
            proyecto.prioridad, 
            proyecto.estado)
            .mostrarEnLista())
    imprimir("listado", `${listadoProyectos.join("")}`);    

    console.log(data)

    //? data

    document.querySelectorAll(".card").forEach((itemListado) => {
        itemListado.addEventListener("click", () => {
            document.location.replace(`proyecto.html?id=${itemListado.id}`);
            console.log("Hola");
        })
    })
    
}


const mostrarError = (error) => {
    imprimir("lista-error", error);
}

document.querySelector("#boton-filtro").addEventListener("click", () => {
    const filtroTitulo = obtenerValorInput("input-filtro-titulo")
    const filtroEstado = obtenerValorInput("input-filtro-estado")

    RequestsAPI.obtenerProyectos({filtroTitulo, filtroEstado})
    .then(mostrarListaProyectos)
    .catch(mostrarError) 
})



RequestsAPI.obtenerProyectos()
    .then(mostrarListaProyectos)
    .catch(mostrarError) 