//solo permitir a usuarios con sesion iniciada
import { soloUsuarios } from "../autenticacion.js";

soloUsuarios(function datosUsuario(){});
//

//Boton perfil
const btn = document.querySelector(".btnPerfil");
const menu = document.querySelector(".menuPerfil");

btn.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

// cerrar si das click fuera
document.addEventListener("click", (e) => {
    if (!e.target.closest(".perfil-container")) {
        menu.classList.remove("activo");
    }
});