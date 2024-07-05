const obtenerUrl = (ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const token = sessionStorage.getItem("session");
if (token) {
  headers.Authorization = token;
}

const procesarRespuesta = (res) => {
  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data?.error);
    }


    return data;
  });
};

const procesarErrores = (error = new Error("Ocurrio un error inesperado")) => {
  console.error("Hubo un error:", error.message);
  throw error.message;
};
export class RequestsAPI {
  static urlBaseBackend = "https://wakeup-api.onrender.com";

  //post /login
  static login(email, password) {
    const body = JSON.stringify({ email, password });

    return fetch(obtenerUrl("login"), { method: "POST", headers, body })
      .then(procesarRespuesta)
      .catch(procesarErrores);
  }

  static logout() {
    return fetch(obtenerUrl("logout"), { method: "POST", headers })
      .then(procesarRespuesta)
      .catch(procesarErrores);
  }

  static register(body) {
    return fetch(obtenerUrl("registrar"), { method: "POST", headers, body,})
      .then(procesarRespuesta)
      .catch(procesarErrores);
  }


  static obtenerUsuario(idUsuario) {
  

    return fetch(obtenerUrl(`usuarios?idUsuario=` + idUsuario.filtroIdUsuario ), {
      method: "GET",
      headers,
    })
      .then(procesarRespuesta)
      .catch(procesarErrores);
  }

  static obtenerProyectos(opciones = {}) {
    const queryParams = new URLSearchParams({});

    if (opciones.filtroTitulo) {
      queryParams.set("titulo", opciones.filtroTitulo);
    }

    if (opciones.filtroPrioridad) {
      queryParams.set("prioridad", opciones.filtroPrioridad);
    }

    if (opciones.filtroEstado) {
      queryParams.set("estado", opciones.filtroEstado);
    }

    if (opciones.filtroCategoria) {
      queryParams.set("categoria", opciones.filtroCategoria);
    }

    if (opciones.filtroIdUsuario) {
      queryParams.set("idUsuario", opciones.filtroIdUsuario);
    }

    return fetch(obtenerUrl("proyectos?" + queryParams), {
      method: "GET",
      headers,
    })
      .then(procesarRespuesta)
      .catch(procesarErrores);
  }

  static obtenerProyecto(idProyecto) {
    return fetch(obtenerUrl("proyecto/" + idProyecto), {
      method: "GET",
      headers,
    })
      .then(procesarRespuesta)
      .catch(procesarErrores);
  }

  static postProyecto(body) {
    return fetch(obtenerUrl("proyectos"), { method: "POST", headers, body })
      .then(procesarRespuesta)
      .catch(procesarErrores)
  }

  static putProyecto(idProyecto, body) {
    return fetch(obtenerUrl("proyecto/" + idProyecto), { method: "PUT", headers, body })
      .then(procesarRespuesta)
      .catch(procesarErrores)
  }

  static deleteProyecto(idProyecto) {
    return fetch(obtenerUrl(`proyecto/${idProyecto}`), { method: "DELETE", headers })
      .then(procesarRespuesta)
      .catch(procesarErrores)
  }
}

