import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { collection, doc, where, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

export async function iniciarSesion(correo, password) {
  try {
    // Step 1 — Auth verifies email and password
    const userCredential = await signInWithEmailAndPassword(auth, correo, password);
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "usuarios", uid));
    if(userDoc.exists()){
      const datosUsuario = userDoc.data();
      window.location.href = "../mapa/mapa.html"
    }

  } catch (error) {
    switch(error.code) {
      case "auth/invalid-credential":
      case "auth/invalid-email":
        document.getElementById("errorSesion").textContent = "Correo o contraseña incorrectos.";
        break;

      case "auth/too-many-requests":
        document.getElementById("errorSesion").textContent = "Demasiados intentos fallidos, intenta mas tarde.";
        break;

      case "auth/user-disabled":
        document.getElementById("errorSesion").textContent = "Esta cuenta ha sido deshabilitada";
        break;

      default:
        console.log(error.code);
        console.log(error.message);
        document.getElementById("errorSesion").textContent = "Ocurrio un error";
        break;
    }
  }
}