import Proyecto from "../Models/Proyecto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
  imprimir,
  obtenerValorInput,
  validarSesion,
  eventoClickCerrarSesion,
  debounce,
} from "../utils/helpers.js";

validarSesion();
eventoClickCerrarSesion();

document.querySelector(".sidebar").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".menu-btn__icon").classList.toggle("fa-arrow-left");
});

const mostrarListaProyectos = (data) => {
  imprimir("lista-error", "");

  // Invierte el orden de los proyectos
  const proyectosInvertidos = data.reverse();

  const listadoProyectos = proyectosInvertidos.map((proyecto) =>
    new Proyecto(
      proyecto.id,
      proyecto.titulo,
      proyecto.descripcion,
      proyecto.prioridad,
      proyecto.estado,
      proyecto.categoria
    ).mostrarEnLista()
  );
  imprimir("listado", `${listadoProyectos.join("")}`);

  console.log(data);

  //? data

  document.querySelectorAll(".card-body").forEach((itemListado) => {
    itemListado.addEventListener("click", () => {
      document.location.replace(`proyecto.html?id=${itemListado.id}`);
      console.log("Hola");
    });
  });
};

const mostrarNombre = (data) => {

  document.querySelector(
    ".user-name"
  ).innerHTML = `<p>Hola <b>${data[0].nombre}!</b> </p>`;
};

let filtroIdUsuario = sessionStorage.getItem("user");

if (filtroIdUsuario) {
  filtroIdUsuario = filtroIdUsuario.trim().replace(/^"|"$/g, "");
}

const mostrarError = (error) => {
  imprimir("lista-error", error);
};

document.querySelector("#boton-filtro").addEventListener("click", () => {
  const filtroTitulo = obtenerValorInput("input-filtro-titulo");

  RequestsAPI.obtenerProyectos({ filtroTitulo, filtroIdUsuario })
    .then(mostrarListaProyectos)
    .catch(mostrarError);
});

let filtroTituloInput = document.querySelector("#input-filtro-titulo");

const debounceDelay = 300; // Tiempo de espera en milisegundos
filtroTituloInput.addEventListener(
  "keyup",
  debounce(() => {
    let filtroTitulo = filtroTituloInput.value;
    RequestsAPI.obtenerProyectos({ filtroTitulo, filtroIdUsuario })
      .then(mostrarListaProyectos)
      .catch(mostrarError);
  }, debounceDelay)
);

document.querySelectorAll(".btn--filter").forEach((boton) => {
  boton.addEventListener("click", () => {
    document
      .querySelectorAll(".btn--filter")
      .forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");
  });
});

//CATEGORIAS HOMEPAGE

document.querySelectorAll(".boton-filtro-categorias--home").forEach((boton) => {
  boton.addEventListener("click", () => {
    document
      .querySelectorAll(".btn--filter")
      .forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");
    let filtroCategoria = boton.dataset.categoria;

    RequestsAPI.obtenerProyectos({ filtroCategoria, filtroIdUsuario })
      .then(mostrarListaProyectos)
      .catch(mostrarError);
  });
});

//FILTROS

//CATEGORIAS
document.querySelectorAll(".boton-filtro-categorias").forEach((boton) => {
  boton.addEventListener("click", () => {
    // Remover la clase 'active' de todos los botones
    document
      .querySelectorAll(".boton-filtro-categorias--home")
      .forEach((b) => b.classList.remove("active"));

    // Añadir la clase 'active' solo al botón que fue clicado

    let filtroCategoria = boton.dataset.categoria;

    RequestsAPI.obtenerProyectos({ filtroCategoria, filtroIdUsuario })
      .then(mostrarListaProyectos)
      .catch(mostrarError);
  });
});

//ESTADO
document.querySelectorAll(".boton-filtro-estados").forEach((boton) => {
  boton.addEventListener("click", () => {
    let filtroEstado = boton.dataset.estado;

    RequestsAPI.obtenerProyectos({ filtroEstado, filtroIdUsuario })
      .then(mostrarListaProyectos)
      .catch(mostrarError);
  });
});

//PRIORIDAD
document.querySelectorAll(".boton-filtro-prioridades").forEach((boton) => {
  boton.addEventListener("click", () => {
    let filtroPrioridad = boton.dataset.prioridad;

    RequestsAPI.obtenerProyectos({ filtroPrioridad, filtroIdUsuario })
      .then(mostrarListaProyectos)
      .catch(mostrarError);
  });
});


// GESTIONAR PROYECTO


//? EDITAR PROYECTO
document.querySelector("#boton-editar-proyecto").addEventListener("click", () => {
  document.location.replace(`editar-proyecto.html?id=${idProyecto}`)
})


//? ELIMINAR PROYECTO
document.querySelector("#boton-eliminar-proyecto").addEventListener("click", () => { 
  RequestsAPI.deleteProyecto(idProyecto)
  .then(()  => {
      document.location.replace("proyectos.html");
  })
  .catch((error) => {
     mostrarError(error);
  })

})



RequestsAPI.obtenerUsuario({ filtroIdUsuario })
  .then(mostrarNombre)
  .catch(mostrarError);

RequestsAPI.obtenerProyectos({ filtroIdUsuario })
  .then(mostrarListaProyectos)
  .catch(mostrarError);
