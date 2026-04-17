//solo permitir a colaboradores y admins con sesion iniciada
import { soloColaborador } from "../autenticacion.js";

soloColaborador(function datosUsuario(){});
//

let pendiente = document.getElementById("pendiente");
let enProceso = document.getElementById("enProceso");
let resuelto = document.getElementById("resuelto");

function ocultarTab(){
    pendiente.classList.remove('active');
    enProceso.classList.remove('active');
    resuelto.classList.remove('active');
}

pendiente.addEventListener('click', function(){
    ocultarTab();
    pendiente.classList.add('active');
})

enProceso.addEventListener('click', function(){
    ocultarTab();
    enProceso.classList.add('active');
})

resuelto.addEventListener('click', function(){
    ocultarTab();
    resuelto.classList.add('active');
})

/////

function exportarExcel() {
    const tablaId = 'tabla-' + tabActiva;
    const tabla = document.getElementById(tablaId);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tabla);
    const nombres = { pendiente: 'Pendiente', enproceso: 'En Proceso', completado: 'Completado' };
    XLSX.utils.book_append_sheet(wb, ws, nombres[tabActiva]);
    XLSX.writeFile(wb, 'Reportes_' + nombres[tabActiva] + '.xlsx');
}

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