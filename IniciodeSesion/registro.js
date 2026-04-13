import { crearUsuario } from "../usuarios.js";

document.getElementById("registro").addEventListener('submit', async (event) => {

    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);

    await crearUsuario(
        data.get("codigo"),
        data.get("nombre"),
        data.get("apellido"),
        data.get("password"),
        data.get("correo"),
        "estudiante"
    );
});

