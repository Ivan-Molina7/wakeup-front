// Objetivo: Definir la clase proyecto con sus atributos y métodos


export default class Proyecto {
  id;
  titulo;
  descripcion;
  prioridad;
  estado;
  categoria;

  constructor(
    id = 0,
    titulo = "",
    descripcion = "",
    prioridad = "",
    estado = "",
    categoria = ""
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.prioridad = prioridad;
    this.estado = estado;
    this.categoria = categoria;
  }

  

  // Método para mostrar el proyecto en una lista
  mostrarEnLista() {
    let priority = this.prioridad.toLowerCase();
    let priorityClass = "";

    if (priority === "baja") {
      priorityClass = "priority-low";
    } else if (priority === "media") {
      priorityClass = "priority-medium";
    } else if (priority === "alta") {
      priorityClass = "priority-high";
    }

    let state = this.estado.toLocaleLowerCase();
    let stateClass = "";

    if (state === "sin empezar") {
      stateClass = "state-sin-empezar";
    } else if (state === "en progreso") {
      stateClass = "state-en-progreso";
    } else if (state === "finalizado") {
      stateClass = "state-finalizado";
    }
  
 

    return `
                    <div class="card-container col-lg-3 col-md-6 mb-4 ">
                        <div class="card card-custom "  >
                            <div class="card-header ${priorityClass}"></div>
                            <div class="card-body" id="${this.id}">
                                <div class="title d-flex align-items-center justify-content-between">     
                                    <h5 class="card-title"><i class="fa-solid fa-circle"></i></i> ${this.titulo}</h5>
                                
                                </div>
                                <p class="card-text card-text--description my-2">${this.descripcion}</p>
                                <p class="card-tag mb-2 mt-3 ${stateClass}">Estado: ${this.estado}</p>
                                <p class="card-tag ${priorityClass} ">Prioridad: ${this.prioridad}</p>
                             
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <small class="text-muted"><b>${this.categoria}</b></small>
                                 
                                <div class="d-flex align-items-center gap-3">
                                    <small class="text-muted"> <i class="fa-solid fa-trash boton-eliminar-proyecto"  id=${this.id}></i></small>
                                    <small class="text-muted ">  <i class="fa-solid fa-pen text-muted boton-editar-proyecto" id=${this.id} data-bs-toggle="modal" data-bs-target="#editarProyectoModal" ></i></small></div>
                            </div>
                        </div>
                    </div>
      `;
  }
  // <p class="card-tag-container">Estado:<span class="card-tag ">${this.estado}</span>/p>

  // Método para mostrar el detalle de el proyecto
  mostrarDetalle() {
    let priority = this.prioridad.toLowerCase();
    let priorityClass = "";

    if (priority === "baja") {
      priorityClass = "priority-low";
    } else if (priority === "media") {
      priorityClass = "priority-medium";
    } else if (priority === "alta") {
      priorityClass = "priority-high";
    }

    let state = this.estado.toLocaleLowerCase();
    let stateClass = "";

    if (state === "sin empezar") {
      stateClass = "state-sin-empezar";
    } else if (state === "en progreso") {
      stateClass = "state-en-progreso";
    } else if (state === "finalizado") {
      stateClass = "state-finalizado";
    }
    return `
 <div class="proyecto-header">


 <!-- MODAL EDITAR -->

 <div class="modal fade modal-lg" id="editarProyectoModal" tabindex="-1" data-bs-backdrop="static"
     data-bs-keyboard="false" aria-labelledby="editarProyectoModalLabel" aria-hidden="true">
     <div class="modal-dialog">
         <div class="modal-content">
             <div class="modal-header">
                 <h5 class="modal-title" id="editarProyectoModalLabel">Editar Proyecto</h5>
                 <button type="button" class="btn-close delete-errores-modal" data-bs-dismiss="modal"
                     aria-label="Close"></button>
             </div>
             <div class="modal-body">
                 <!-- Formulario de edición -->
                 <form id="form-editar-proyecto">
                     <div class="mb-4">
                         <label for="editar-titulo" class="form-label">Título:</label>
                         <input type="text" id="editar-titulo" class="form-control" />
                     </div>

                     <div class="mb-4">
                         <label for="editar-descripcion" class="form-label">Descripción:</label>
                         <textarea id="editar-descripcion" class="form-control" rows="4"></textarea>
                     </div>

                     <div class="mb-4">
                         <label for="editar-categoria" class="form-label">Categoría:</label>
                         <select id="editar-categoria" class="form-select">
                             <option value="Estudios">Estudios</option>
                             <option value="Trabajo">Trabajo</option>
                             <option value="Personal">Personal</option>
                             <option value="Otra">Otra</option>
                         </select>
                     </div>

                     <div class="row">
                         <div class="col-6 mb-4">
                             <label for="editar-prioridad" class="form-label">Prioridad:</label>
                             <select id="editar-prioridad" class="form-select">
                                 <option value="Baja">Baja</option>
                                 <option value="Media">Media</option>
                                 <option value="Alta">Alta</option>
                             </select>
                         </div>

                         <div class="col-6 mb-4">
                             <label for="editar-estado" class="form-label">Estado:</label>
                             <select id="editar-estado" class="form-select">
                                 <option value="Sin empezar">Sin empezar</option>
                                 <option value="En progreso">En progreso</option>
                                 <option value="Finalizado">Finalizado</option>
                             </select>
                         </div>
                     </div>

                     <div class="modal-footer mb-0">
                         <div id="editar-proyecto-error"
                             class="errores-modal my-3 bg-danger  p-3 text-light w-100 rounded-3 "></div>

                         <button type="button" class="btn btn-secondary delete-errores-modal"
                             data-bs-dismiss="modal">Cancelar</button>
                         <button type="button" id="boton-actualizar-proyecto"
                             class="btn btn-primary">Actualizar proyecto</button>
                     </div>
                 </form>
             </div>
         </div>
     </div>
 </div>




 <div class="modal fade" id="confirmarEliminarModal" tabindex="-1" data-bs-backdrop="static"
     aria-labelledby="confirmarEliminarModalLabel" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content p-3">
             <div class="modal-header">
                 <h5 class="modal-title" id="confirmarEliminarModalLabel">Confirmar eliminación</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body ">
                 ¿Estás seguro de que deseas eliminar este proyecto?
             </div>
             <div class="modal-footer">
                 <div id="eliminar-proyecto-error"
                     class="errores-modal my-3 bg-danger  p-3 text-light w-100 rounded-3 "></div>
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                 <button type="button" class="btn action-red" id="confirmarEliminarBtn">Eliminar</button>
             </div>
         </div>
     </div>
 </div>


                <figure class="proyecto__thumbnail">
                    <img src="https://picsum.photos/1920/1080" alt="imagen-principal" class="proyecto__image">
                </figure>
            </div>

            <div class="proyecto-container container-sm ms-auto mt-3 mb-5 px-5 ">
                <div class="proyecto__titles d-flex align-items-center justify-content-between  mb-2">
                    <h1 class="proyecto__title">${this.titulo}</h1>
                    <i class="fa-solid fa-ellipsis proyecto__title-icon" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                        <li data-bs-toggle="modal" data-bs-target="#editarProyectoModal" class="boton-editar-proyecto text-muted"><a class="dropdown-item text-muted" href="#" ><i class="fa-solid fa-pen"></i> Editar</a></li>
                        <li class="boton-eliminar-proyecto text-muted"><a class="dropdown-item text-muted" href="#"  ><i class="fa-solid fa-trash text-muted"></i> Eliminar</a></li>
                    </ul>
                </div>
          

                <div class="proyecto__details mb-4 d-flex flex-column gap-3">
                    <div class="proyecto__details-container d-flex flex-wrap">
                        <div class="proyecto__detail"><i class="fa-solid fa-chart-pie me-2"></i><span>Estado:</span></div>
                        <div class="proyecto__detail-dinamico">
                            <p class="${stateClass}">${this.estado}</p>
                        </div>
                    </div>
                    <div class="proyecto__details-container d-flex flex-wrap">
                        <div class="proyecto__detail">
                            <i class="fa-solid fa-flag me-2"></i><span>Prioridad:</span>
                        </div>
                        <div class="proyecto__detail-dinamico">
                           <p class="${priorityClass}">${this.prioridad}</p>
                        </div>
                    </div>

                    <div class="proyecto__details-container d-flex flex-wrap">
                        <div class="proyecto__detail">
                            <i class="fa-solid fa-chart-bar me-2"></i><span>Categoría:</span>
                        </div>
                        <div >
                         <p class="fw-bold">${this.categoria}</p>
                        </div>
                    </div>
                </div>
                <div class="border-top my-3"></div>

                <p class="proyecto__description">
                ${this.descripcion}
                </p>

            </div>


        </div>

        
    
      `;
  }
}
