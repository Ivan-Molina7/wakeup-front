import Proyecto from "../Models/Proyecto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir } from "../utils/helpers.js";

const mostrarListaProyectos = (data) => {
    imprimir("lista-error", "");
    const headerListado = `<tr><th>ID</th><th>Título</th><th>Descripción</th><th>Prioridad</th><th>Estado</th></tr>`;

    const listadoProyectos = data.map((proyecto) => 
        new Proyecto(
            proyecto.id, 
            proyecto.titulo, 
            proyecto.descripcion, 
            proyecto.prioridad, 
            proyecto.estado)
            .mostrarEnLista())
    imprimir("listado", `${listadoProyectos.join("")}`);    
}

const mostrarError = (error) => {
    imprimir("lista-error", error);
}

RequestsAPI.obtenerProyectos()
    .then(mostrarListaProyectos)
    .catch(mostrarError) 