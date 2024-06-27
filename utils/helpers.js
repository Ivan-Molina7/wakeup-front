// function para obtener el valor de un input. Recibe el id del input y retorna el valor del input.
export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;
  
export const imprimir = (elemento, contenido) => {
 document.querySelector(`#${elemento}`).innerHTML = `<p>${contenido}</p>`;
}