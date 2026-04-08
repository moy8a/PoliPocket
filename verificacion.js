import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

export async function iniciarSesion(correo, password) {
  try {
    // Step 1 — Auth verifies email and password
    const userCredential = await signInWithEmailAndPassword(auth, correo, password);
    const uid = userCredential.user.uid;

    // Step 2 — Use uid to fetch their profile from Firestore
    const q = query(
      collection(db, "usuarios"),
      where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);
    
    snapshot.forEach(doc => {
      const userData = doc.data();
      
      console.log("Bienvenido:", userData.nombre);
   
    });

    window.location.href = "../mapa/mapa.html"

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
        document.getElementById("errorMsg").textContent = "Esta cuenta ha sido deshabilitada";
        break;

      default:
        document.getElementById("errorMsg").textContent = "Ocurrio un error";
        break;
    }
  }
}