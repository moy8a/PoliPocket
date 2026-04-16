

/* Toggle expandir / colapsar tarjeta*/
function toggleCard(btn) {
  var card   = btn.closest('.info-breve');
  var expand = card.querySelector('.info-extra');
  var isOpen = card.classList.contains('open');
  card.classList.toggle('open', !isOpen);
  expand.style.maxHeight = isOpen ? '0' : expand.scrollHeight + 'px';
  btn.innerHTML = isOpen ? 'Ver más <span>↓</span>' : 'Ver menos <span>↑</span>';
}



/*Filtro de búsqueda en tiempo real*/
document.getElementById('busqueda-input').addEventListener('input', function () {
  var q       = this.value.toLowerCase().trim();
  var cards   = document.querySelectorAll('.info-breve');
  var visible = 0;
  cards.forEach(function (card) {
    var text = (card.innerText + ' ' + card.dataset.keywords).toLowerCase();
    var show = !q || text.includes(q);
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('sinResultados').style.display = visible === 0 ? 'flex' : 'none';
});

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