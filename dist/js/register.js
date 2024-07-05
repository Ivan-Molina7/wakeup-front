import {
  validarSesion,
  obtenerValorInput,
  imprimir,
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

// Validamos la sesión del usuario
validarSesion();

const mostrarError = (error) => {
  imprimir("form-register-error", error);
  document.querySelector("#form-register-error").style.display = "flex ";
}

// Evento click para registrar un nuevo usuario
document
  .querySelector("#boton-register-submit")
  .addEventListener("click", () => {
    console.log("Botón de registro clickeado");

    // Obtenemos los valores de los inputs
    const nombre = obtenerValorInput("form-register-nombre");
    const apellido = obtenerValorInput("form-register-apellido");
    const email = obtenerValorInput("form-register-email");
    const password = obtenerValorInput("form-register-password");

    console.log({ nombre, apellido, email, password });

    // Validamos que los campos no estén vacíos
    if (!nombre || !apellido || !email || !password) {
      // Mostramos un error si los campos están vacíos
      mostrarError("Por favor complete todos los campos");
      console.log("Campos vacíos detectados");
      return;
    }

    // Creamos el body del post, con los valores de los inputs
    const body = JSON.stringify({ nombre, apellido, email, password });
    
    console.log("Enviando datos al servidor", body);

    // Hacemos el fetch, usando el método register de request api
    RequestsAPI.register(body).then(() => {
      console.log("Registro exitoso. Redirigiendo a login.html...");
      document.querySelector("#form-register-error").style.display = "none";
      window.location.href = "login.html";
    }).catch((error) => {
      console.log("Error en el registro", error);
      mostrarError("Hubo un problema al registrar el usuario. Inténtelo nuevamente.");
      document.querySelector("#form-register-error").style.display = "flex ";
    });
  });
