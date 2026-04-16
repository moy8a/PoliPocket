//_______Menu de reportes_________//

// Cerrar menú
const tarjeta = document.getElementById("tarjetaMapa");
const btnCerrar = document.getElementById("Cerrar");

btnCerrar.addEventListener("click", () => {
    tarjeta.classList.remove("visible");
});


//boton para volver a la vista simple
document.getElementById("btnVolver").addEventListener("click", () => {
    formulario.style.display = "none";
    vistaSimple.style.display = "block";
});


//Boton mostrar formulario
const vistaSimple = document.getElementById("vistaSimple");
const formulario = document.getElementById("formularioReporte");
const btnIrReporte = document.getElementById("btnIrReporte");

// Ir al formulario
btnIrReporte.addEventListener("click", () => {
    vistaSimple.style.display = "none";
    formulario.style.display = "block";
});


//Foto (preview / quitar)
const inputFoto = document.getElementById("fotoReporte");
const preview = document.getElementById("previewFoto");
const contenido = document.querySelector(".subirfoto-contenido");
const btnQuitar = document.getElementById("btnQuitarFoto");

// Mostrar preview
inputFoto.addEventListener("change", function () {
    const archivo = this.files[0];

    if (archivo) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";

            contenido.style.display = "none";
            btnQuitar.style.display = "block";
        };

        reader.readAsDataURL(archivo);
    }
});

// Quitar foto
btnQuitar.addEventListener("click", () => {
    inputFoto.value = "";
    preview.src = "";
    preview.style.display = "none";

    contenido.style.display = "flex";
    btnQuitar.style.display = "none";
});


//FORMULARIO (validación)
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    const aula = document.getElementById("aula").value;
    const tipo = document.querySelector('input[name="tipo"]:checked');
    const descripcion = document.getElementById("descripcionReporte").value;
    const foto = inputFoto.files.length;

    if (!aula || !tipo || !descripcion || !foto) {
        e.preventDefault();
        alert("Completa todos los campos obligatorios");
        return;
    }

    alert("Reporte enviado correctamente");

    // Reset visual después de enviar
    setTimeout(() => {
        form.reset();

        preview.style.display = "none";
        preview.src = "";
        contenido.style.display = "flex";
        btnQuitar.style.display = "none";
    }, 100);
});


//Botones menu header/footer
const menuDerecha = document.getElementById("menuDerecha");
const btnAbrir = document.getElementById("abrirDerecha");
const btncerrar = document.getElementById("cerrarDerecha");

btnAbrir.addEventListener("click", () => {
    menuDerecha.classList.add("activo");
});

btncerrar.addEventListener("click", () => {
    menuDerecha.classList.remove("activo");
});

//Ocultar-Mostrar btn abrir menu
btnAbrir.addEventListener('click', () => {
    menuDerecha.classList.add('abierto');
    btnAbrir.classList.add('btnOculto');
});

//cerrar menu al hacer click afuera
btncerrar.addEventListener('click', () => {
    menuDerecha.classList.remove('abierto');
    btnAbrir.classList.remove('btnOculto');
}); 

document.addEventListener("click", (e) => {
    const clickDentro = menuDerecha.contains(e.target);
    const clickBotonAbrir = btnAbrir.contains(e.target);

    if (!clickDentro && !clickBotonAbrir && menuDerecha.classList.contains("activo")) {
        menuDerecha.classList.remove("activo");
        btnAbrir.classList.remove("btnOculto");
    }
});