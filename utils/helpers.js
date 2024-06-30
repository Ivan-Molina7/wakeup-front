import { RequestsAPI } from "../RequestsAPI.js";

// function para obtener el valor de un input. Recibe el id del input y retorna el valor del input.
export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;
  
export const imprimir = (elemento, contenido) => {
 document.querySelector(`#${elemento}`).innerHTML = `${contenido}`;
}

export const validarSesion = () => {
  const usuarioLogueado = sessionStorage.getItem("session");
  const estaEnLogin = document.location.pathname.includes("login.html");
  const estaEnRegister = document.location.pathname.includes("register.html");
  const estaEnPaginaPublica = estaEnLogin || estaEnRegister;

  if (usuarioLogueado) { 
    if (estaEnPaginaPublica) {
     // si el usuario esta logueado y esta en una pagina publica, lo redirigimos al index
      document.location.replace("proyectos.html");
    }
  }else{
      // si no estas logueado,y esta en una pagina restringida, redirigimos al login
      if (!estaEnPaginaPublica) {
        document.location.replace("login.html");
      }
  }
}

export const eventoClickCerrarSesion = () => {
  const cerrarSesion = document.getElementById("boton-logout");
  cerrarSesion.addEventListener("click", () => {
    sessionStorage.removeItem("session");
    RequestsAPI.logout().then(() => {
        document.location.replace("login.html");
    })
  });
}