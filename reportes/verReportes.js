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


    const btnperfil = document.getElementById('btnFiltrar');
    const dropdown = document.getElementById('dropdown');

    // Abrir/cerrar el dropdown principal
    btnperfil.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btnperfil.classList.toggle('open', isOpen);
    });

    // Abrir/cerrar submenús
    document.querySelectorAll('.menu-label').forEach(label => {
      label.addEventListener('click', () => {
        const group = label.dataset.group;
        const sub = document.getElementById('sub-' + group);

        // Cierra los demás submenús
        document.querySelectorAll('.submenu').forEach(s => {
          if (s !== sub) s.classList.remove('open');
        });
        document.querySelectorAll('.menu-label').forEach(l => {
          if (l !== label) l.classList.remove('open');
        });

        sub.classList.toggle('open');
        label.classList.toggle('open');
      });
    });

    // Seleccionar/deseleccionar subopciones
    document.querySelectorAll('.submenu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        item.classList.toggle('selected');
      });
    });

    // Aplicar filtros
    document.getElementById('applyBtn').addEventListener('click', () => {
      const selected = [...document.querySelectorAll('.submenu-item.selected')]
        .map(el => el.dataset.val);

      console.log('Filtros seleccionados:', selected);
      alert('Filtros aplicados: ' + (selected.length ? selected.join(', ') : 'ninguno'));

      dropdown.classList.remove('open');
      btn.classList.toggle('open', false);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btn.classList.remove('open');
    });
    dropdown.addEventListener('click', e => e.stopPropagation());