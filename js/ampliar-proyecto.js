import Proyecto from "../Models/Proyecto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

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
     imprimir("proyecto-ampliar-container", proyecto.mostrarDetalle())

     document.querySelector(".title").innerHTML = data.titulo;

    
        document.querySelector(".boton-editar-proyecto").addEventListener("click", () => {
          
                    // Llamar a la API para obtener los detalles del proyecto
                   RequestsAPI.obtenerProyecto(idProyecto)
              
                      .then((data) => {
            //             // Rellenar los campos del formulario con los datos del proyecto
                        document.querySelector("#editar-titulo").value = data.titulo;
                        document.querySelector("#editar-descripcion").value = data.descripcion;
                        document.querySelector("#editar-prioridad").value = data.prioridad;
                        document.querySelector("#editar-estado").value = data.estado;
                        document.querySelector("#editar-categoria").value = data.categoria;
              
                     // Guardar la ID del proyecto en el botón de actualización del modal
              
                  })
                  .catch((error) => {
                    document.querySelector("#editar-proyecto-error").style.display = "flex";
                    imprimir("editar-proyecto-error", error);
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
              
            document.querySelector("#editar-proyecto-error").style.display = "flex";
              imprimir("editar-proyecto-error", "Por favor, rellene todos los campos");
              return;
            }

            const body = JSON.stringify({ titulo, descripcion, prioridad, estado, categoria });

            RequestsAPI.putProyecto(idProyecto, body)
              .then(() => {
                document.location.replace(`proyecto.html?id=${idProyecto}`);
              })
              .catch((error) => {
                setTimeout(() => {
              
                  document.querySelector("#editar-proyecto-error").style.display = "flex";
                  imprimir("editar-proyecto-error", error)
                },2000 )
              });
          });
           
    
      
        document.querySelector(".boton-eliminar-proyecto").addEventListener("click", () => {
        
              const confirmarEliminarModal = new bootstrap.Modal(document.querySelector("#confirmarEliminarModal"));
              confirmarEliminarModal.show();
            });
    

          
        // Selecciona el botón de confirmación dentro del modal
        document.querySelector("#confirmarEliminarBtn").addEventListener("click", () => {
       
          if (idProyecto) {
            // Llamar a la API para eliminar el proyecto
            RequestsAPI.deleteProyecto(idProyecto)
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

    
  }

      


RequestsAPI.obtenerProyecto(idProyecto)
    .then(mostrarDetalle)
    .catch((error) => {
        mostrarError(error + "Error al obtener el proyecto");
    })

  
