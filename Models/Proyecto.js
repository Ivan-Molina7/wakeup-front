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

    return `
                    <div class="card-container col-lg-3 col-md-6 mb-4 ">
                        <div class="card card-custom "  >
                            <div class="card-header ${priorityClass}"></div>
                            <div class="card-body" id="${this.id}">
                                <div class="title d-flex align-items-center justify-content-between">     
                                    <h5 class="card-title"><i class="fa-solid fa-circle"></i></i> ${this.titulo}</h5>
                                
                                </div>
                                <p class="card-text card-text--description my-2">${this.descripcion}</p>
                                <p class="card-tag mb-2 mt-3">Estado: ${this.estado}</p>
                                <p class="card-tag ${priorityClass} ">Prioridad: ${this.prioridad}</p>
                             
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <small class="text-muted"><b>${this.categoria}</b></small>
                                 
                                <div class="d-flex align-items-center gap-3">
                                  <small class="text-muted"><i class="fa-solid fa-trash"></i></small>
                                <small class="text-muted" id="boton-editar-proyecto  data-id=${this.id}">  <i class="fa-solid fa-pen text-muted" ></i></small></div>
                            </div>
                        </div>
                    </div>
      `;
  }
  // <p class="card-tag-container">Estado:<span class="card-tag ">${this.estado}</span>/p>

  // Método para mostrar el detalle de el proyecto
  mostrarDetalle() {
    return `
      <div class="container-sm">
      <div class="card card-custom " id="${this.id}">
                    <img src="https://picsum.photos/seed/${Math.floor(
                      Math.random() * 1000
                    )}/3840/2160" alt="Imagen Aleatoria" class="card-image">
                    <div class="card-body">
                        <h5 class="card-title">${this.titulo}</h5>
                        <p class="card-text">${this.descripcion}</p>
                        <p class="card-text"><strong>Prioridad:</strong> <span class="priority-${this.prioridad.toLowerCase()}">${
      this.prioridad
    }</span></p>
                        <p class="card-text"><strong>Estado:</strong> <span class="status-${this.estado.toLowerCase()}">${
      this.estado
    }</span></p>
                        <p class="card-text"><strong>Categoria:</strong> <span class="status-${this.categoria.toLowerCase()}">${
      this.categoria
    }</span></p>
                    </div>
                </div>
                    </div>
      `;
  }
}
