import { RequestsAPI } from "../RequestsAPI.js";
import { obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion();

// obtenemos el id del proyecto
const params = new URLSearchParams(window.location.search);
const idProyecto = params.get("id");

const mostrarError = (error) => {
  imprimir("editar-proyecto-error", error);
};

const popularCampos = (data) => {
  document.querySelector("#editar-titulo").value = data.titulo;
  document.querySelector("#editar-descripcion").value = data.descripcion;
  document.querySelector("#editar-prioridad").value = data.prioridad;
  document.querySelector("#editar-estado").value = data.estado;
  document.querySelector("#editar-categoria").value = data.categoria;
  
};

RequestsAPI.obtenerProyecto(idProyecto)
  .then(popularCampos)
  .catch((error) => {
    mostrarError(error);
  });

document
  .querySelector("#boton-actualizar-proyecto")
  .addEventListener("click", () => {
    const titulo = obtenerValorInput("editar-titulo");
    const descripcion = obtenerValorInput("editar-descripcion");
    const prioridad = obtenerValorInput("editar-prioridad");
    const estado = obtenerValorInput("editar-estado");
    const categoria = obtenerValorInput("editar-categoria");

    if (!titulo || !descripcion || !prioridad || !estado || !categoria ) {
      imprimir("editar-proyecto-error", "Por favor, rellene todos los campos");
      return;
    }

    const body = JSON.stringify({ titulo, descripcion, prioridad, estado, categoria });

    RequestsAPI.putProyecto(idProyecto, body)
      .then(() => {
        document.location.replace(`proyecto.html?id=${idProyecto}`);
      })
      .catch((error) => {
        imprimir("nuevo-proyecto-error", error);
      });
  });
