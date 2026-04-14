import { db, auth } from "./firebase.js";
import { setDoc, doc, Timestamp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

export async function crearUsuario(codigo, nombre, apellido, password, correo, rol) {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      uid: uid,
      codigo: codigo,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      rol: rol,
      fecha_registro: Timestamp.now()
    });

    window.location.href = "../mapa/mapa.html"

  } catch (error) {
    switch(error.code){
      case "auth/email-already-in-use":
        document.getElementById("errorRegistro").textContent = "Este correo ya esta en uso.";
        break;

      case "auth/invalid-email":
        document.getElementById("erroRegistro").textContent = "El correo no es valido";
        break;

      case "auth/weak-password":
        document.getElementById("errorRegistro").textContent = "La contraseña debe tener al menos 6 caracteres.";
        break;

      default:
        document.getElementById("errorRegistro").textContent = "Ocurrió un error, intenta de nuevo";
        break;
    }
  }
}