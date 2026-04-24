

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
