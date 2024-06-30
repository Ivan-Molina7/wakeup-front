import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion()


const botonLogin = document.getElementById("form-login-submit");

botonLogin.addEventListener("click", () => {
    // Validar usuario y contraseña
 const emailValue = obtenerValorInput("form-login-email");
 const passwordValue = obtenerValorInput("form-login-password");

 
    RequestsAPI.login(emailValue, passwordValue)
    .then((data) => {
           //    si el login es exitoso, lo guardamos en el session storage
           sessionStorage.setItem("session", data.session);
           sessionStorage.setItem("user", JSON.stringify(data.user));

     
           // redirigimos al usaurio al index
           document.location.replace("proyectos.html");
    })
    .catch((error) => {
        console.error(error);
        imprimir("form-login-error", "El usuario o la contraseña son incorrectos");
    });
})