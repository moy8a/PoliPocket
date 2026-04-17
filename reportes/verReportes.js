//solo permitir a colaboradores y admins con sesion iniciada
import { soloColaborador } from "../autenticacion.js";

soloColaborador(function datosUsuario(){});
//



let tabActiva = 'pendiente';

/*function mostrarTab(tab, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    btn.classList.add('active');
    tabActiva = tab;
}*/
let pendiente = document.getElementById("pendiente");
let tabPendiente = document.getElementById("tab-pendiente");


let enProceso = document.getElementById("enProceso");
let tabProceso = document.getElementById("tab-enproceso");

let resuelto = document.getElementById("resuelto");
let tabCompletado = document.getElementById("tab-completado");

function ocultarTab(){
    pendiente.classList.remove('active');
    enProceso.classList.remove('active');
    resuelto.classList.remove('active');

    tabPendiente.classList.remove('active');
    tabProceso.classList.remove('active');
    tabCompletado.classList.remove('active');
}

pendiente.addEventListener('click', function(){
    ocultarTab();
    pendiente.classList.add('active');
    tabActiva = 'pendiente';
    tabPendiente.classList.add('active');
})

enProceso.addEventListener('click', function(){
    ocultarTab();
    enProceso.classList.add('active');
    tabActiva = 'enproceso';
    tabProceso.classList.add('active');
})

resuelto.addEventListener('click', function(){
    ocultarTab();
    resuelto.classList.add('active');
    tabActiva = 'completado';
    tabCompletado.classList.add('active');
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

document.getElementById("exportarExcel").addEventListener('click', function(){
    exportarExcel();
})

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