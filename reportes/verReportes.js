let tabActiva = 'pendiente';

function mostrarTab(tab, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    btn.classList.add('active');
    tabActiva = tab;
}

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