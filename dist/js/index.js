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
    });
  });

  

  let idAcutal ;

// EDITAR PROYECTO / abrir modal
  document.querySelectorAll(".boton-editar-proyecto").forEach((boton) => {
    boton.addEventListener("click", () => {
      

      // Obtener la ID del proyecto desde el atributo data-id del botón
      const idProyecto = boton.id;
      idAcutal = idProyecto

      // Llamar a la API para obtener los detalles del proyecto
      RequestsAPI.obtenerProyecto(idProyecto)

        .then((data) => {
          // Rellenar los campos del formulario con los datos del proyecto
          document.querySelector("#editar-titulo").value = data.titulo;
          document.querySelector("#editar-descripcion").value = data.descripcion;
          document.querySelector("#editar-prioridad").value = data.prioridad;
          document.querySelector("#editar-estado").value = data.estado;
          document.querySelector("#editar-categoria").value = data.categoria;

          // Guardar la ID del proyecto en el botón de actualización del modal
          document.querySelector("#boton-actualizar-proyecto").dataset.id = idProyecto;

        })
        .catch((error) => {
          document.querySelector("#editar-proyecto-error").style.display = "flex";
          imprimir("editar-proyecto-error", error);
        });
    });
  });


// ACTUALIZAR PROYECTO
document.querySelector("#boton-actualizar-proyecto")
  .addEventListener("click", () => {
    const titulo = obtenerValorInput("editar-titulo");
    const descripcion = obtenerValorInput("editar-descripcion");
    const prioridad = obtenerValorInput("editar-prioridad");
    const estado = obtenerValorInput("editar-estado");
    const categoria = obtenerValorInput("editar-categoria");

    if (!titulo || !descripcion || !prioridad || !estado || !categoria ) {
      
     document.querySelector("#editar-proyecto-error").style.display = "flex ";
      imprimir("editar-proyecto-error", "Por favor, rellene todos los campos");
      return;
    }

    const body = JSON.stringify({ titulo, descripcion, prioridad, estado, categoria });

    RequestsAPI.putProyecto(idAcutal, body)
      .then(() => {
        document.location.replace(`proyecto.html?id=${idAcutal}`);
      })
      .catch((error) => {
         setTimeout(() => {
       
          document.querySelector("#editar-proyecto-error").style.display = "flex";
          imprimir("editar-proyecto-error", error)
         },2000 )
      });
  });


  //ELIMINAR PROYECTO
  // Variable para almacenar la ID del proyecto a eliminar
  let idProyectoAEliminar = null;

  document.querySelectorAll(".boton-eliminar-proyecto").forEach((boton) => {
    boton.addEventListener("click", () => {
      // Obtener la ID del proyecto desde el botón
      idProyectoAEliminar = boton.id;

      // Mostrar el modal de confirmación
      const confirmarEliminarModal = new bootstrap.Modal(document.querySelector("#confirmarEliminarModal"));
      confirmarEliminarModal.show();
    });
  });
// Selecciona el botón de confirmación dentro del modal
document.querySelector("#confirmarEliminarBtn").addEventListener("click", () => {
  if (idProyectoAEliminar) {
    // Llamar a la API para eliminar el proyecto
    RequestsAPI.deleteProyecto(idProyectoAEliminar)
      .then(() => {
        // Redireccionar a la página de proyectos después de la eliminación
        document.location.replace("proyectos.html");
      })
      .catch((error) => {
        console.error("Error al eliminar el proyecto:", error);
        setTimeout(() => {
          document.querySelector("#eliminar-proyecto-error").style.display = "flex";
          imprimir("eliminar-proyecto-error", error)
        },2000 )  });

    // Cerrar el modal de confirmación
    const confirmarEliminarModal = bootstrap.Modal.getInstance(document.querySelector("#confirmarEliminarModal"));
    confirmarEliminarModal.hide();
  }
});

};


// Función para eliminar errores al hacer clic en los botones con clase delete-errores-modal
document.querySelectorAll(".delete-errores-modal").forEach((boton) => {
  boton.addEventListener("click", () => {
    // Seleccionar todos los elementos con clase errores-modal y ocultarlos
    document.querySelectorAll(".errores-modal").forEach((itemListado) => {
      itemListado.style.display = "none";

      // Asegurar que se mantengan ocultos después de 3 segundos
      setTimeout(() => {
        itemListado.style.display = "none";
      }, 3000);
    });
  });
});

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
    document
    .querySelectorAll(".boton-filtro-categorias--home")
    .forEach((b) => b.classList.remove("active"));


    let filtroEstado = boton.dataset.estado;

    RequestsAPI.obtenerProyectos({ filtroEstado, filtroIdUsuario })
      .then(mostrarListaProyectos)
      .catch(mostrarError);
  });
});

//PRIORIDAD
document.querySelectorAll(".boton-filtro-prioridades").forEach((boton) => {
  boton.addEventListener("click", () => {
    document
    .querySelectorAll(".boton-filtro-categorias--home")
    .forEach((b) => b.classList.remove("active"));

    let filtroPrioridad = boton.dataset.prioridad;

    RequestsAPI.obtenerProyectos({ filtroPrioridad, filtroIdUsuario })
      .then(mostrarListaProyectos)
      .catch(mostrarError);
  });
});

// GESTIONAR PROYECTO

//? EDITAR PROYECTO
// document.querySelector("#boton-editar-proyecto").addEventListener("click", () => {
//   document.location.replace(`editar-proyecto.html?id=${idProyecto}`)
// })


// //? ELIMINAR PROYECTO
// document.querySelector("#boton-eliminar-proyecto").addEventListener("click", () => { 
//   RequestsAPI.deleteProyecto(idProyecto)
//   .then(()  => {
//       document.location.replace("proyectos.html");
//   })
//   .catch((error) => {
//      mostrarError(error);
//   })

// })



RequestsAPI.obtenerUsuario({ filtroIdUsuario })
  .then(mostrarNombre)
  .catch(mostrarError);

RequestsAPI.obtenerProyectos({ filtroIdUsuario })
  .then(mostrarListaProyectos)
  .catch(mostrarError);

  