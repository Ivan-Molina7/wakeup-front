// Objetivo: Definir la clase proyecto con sus atributos y métodos
export default class Proyecto {
    id;
    titulo;
    descripcion;
    prioridad;
    estado;
  
    constructor(id = 0, titulo = "", descripcion = "", prioridad = "",  estado = "", ) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.estado = estado
    }
  
    // Método para mostrar el proyecto en una lista
    mostrarEnLista() {
      return `
  <div class="card card-custom" id="${this.id}">
                    <img src="https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/400/200" alt="Imagen Aleatoria" class="card-image">
                    <div class="card-body">
                        <h5 class="card-title">${this.titulo}</h5>
                        <p class="card-text">${this.descripcion}</p>
                        <p class="card-text"><strong>Prioridad:</strong> <span class="priority-${this.prioridad.toLowerCase()}">${this.prioridad}</span></p>
                        <p class="card-text"><strong>Estado:</strong> <span class="status-${this.estado.toLowerCase()}">${this.estado}</span></p>
                    </div>
                </div>
      `;
    }
  
    // Método para mostrar el detalle de el proyecto
    mostrarDetalle() {
      return `
      <table>
        <tr><td><b>ID</b></td><td>${this.id}</td></tr>
        <tr><td><b>Nombre</b></td><td>${this.nombre}</td></tr>
          <tr><td><b>Tipo</b></td><td>${this.tipo}</td></tr>
          <tr><td><b>Raza</b></td><td>${this.raza}</td></tr>
          </table>
      `;
    }
  }
  