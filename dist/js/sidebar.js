import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir } from "../utils/helpers.js";

// Selecciona el botón del menú dentro de la barra lateral
const menuButton = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const menuIcon = document.querySelector(".menu-btn__icon");

// Añade el event listener solo al botón de menú para abrir/cerrar el sidebar
menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    menuIcon.classList.toggle("fa-arrow-left");
});

// Event listener global para cerrar el sidebar si se hace clic fuera de él
document.addEventListener("click", (event) => {
    // Verifica si el clic está fuera de la sidebar y el botón de menú
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        // Si la sidebar está abierta, la cierra
        if (sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
            menuIcon.classList.remove("fa-arrow-left");
        }
    }
});

// Selecciona el botón de proyectos dentro de la barra lateral
const proyectosButton = document.querySelector(".btn-proyectos-sidebar");

// Añade el event listener al botón de proyectos
proyectosButton.addEventListener("click", () => {
    // Selecciona el icono dentro del botón de proyectos
    const icon = proyectosButton.querySelector("i");

    // Alterna la clase 'i-rotated' para aplicar la animación de rotación
    icon.classList.toggle("i-rotated");
});

export const imprimirTitulosProyectos = (data) => { 

    let dataReverse = data.reverse();

    let dataReverseShort = dataReverse.slice(0, 5);

    dataReverseShort.forEach((proyecto) => {
    let proyectoTitle = `<a href="proyecto.html?id=${proyecto.id}"><p class="proyecto__title-sidebar d-flex align-items-center gap-2 mb-2">${proyecto.titulo}</p></a>`
    document.querySelector("#proyectos-sidebar").innerHTML += `${proyectoTitle}`;
})
    
}
let filtroIdUsuario = sessionStorage.getItem("user");

if (filtroIdUsuario) {
  filtroIdUsuario = filtroIdUsuario.trim().replace(/^"|"$/g, "");
}

RequestsAPI.obtenerProyectos({ filtroIdUsuario })
  .then((data) => {
    imprimirTitulosProyectos(data);
  })
  .catch((error) => {
    console.log(error);
  })