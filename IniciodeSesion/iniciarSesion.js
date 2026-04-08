import { iniciarSesion } from "../verificacion.js";

document.getElementById("login").addEventListener('submit', async (event) => {

        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);

        await iniciarSesion(
            data.get("correo"),
            data.get("password")
        );
        
});