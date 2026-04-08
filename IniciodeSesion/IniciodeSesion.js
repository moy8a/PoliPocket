const btnRegistro = document.getElementById("btnregistro");
const btnLogin = document.getElementById("btnlogin");
const formularioRegistro = document.getElementById("registro");
const formularioLogin = document.getElementById("login");

/* ── MODIFICADO: referencia al contenedor del switch ── */
const eleccion = document.querySelector(".eleccion");

function cambiarFormulario(entrante, saliente, btnActivo, btnInactivo) {

    if (entrante.classList.contains("activo")) return;

    /* 1. Sale deslizándose hacia la derecha */
    saliente.classList.add("saliendo");
    saliente.classList.remove("activo");

    /* 2. Entra deslizándose desde la izquierda */
    entrante.classList.add("activo");

    /* 3. Limpia la clase temporal al terminar la transición */
    saliente.addEventListener("transitionend", function limpiar() {
        saliente.classList.remove("saliendo");
        saliente.removeEventListener("transitionend", limpiar);
    });

    btnActivo.classList.add("seleccionado");
    btnInactivo.classList.remove("seleccionado");
}

btnRegistro.addEventListener("click", () => {
    cambiarFormulario(formularioRegistro, formularioLogin, btnRegistro, btnLogin);
    eleccion.classList.remove("en-login"); /* ── MODIFICADO: pastilla vuelve a la izquierda ── */
});

btnLogin.addEventListener("click", () => {
    cambiarFormulario(formularioLogin, formularioRegistro, btnLogin, btnRegistro);
    eleccion.classList.add("en-login"); /* ── MODIFICADO: pastilla se desliza a la derecha ── */
});