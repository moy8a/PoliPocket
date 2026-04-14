import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";


//redirigir si no ha iniciado sesion
export function soloUsuarios(callback){
    onAuthStateChanged(auth, async(usuario)=>{
        if(!usuario){
            window.location.href = "../index/index.html";
            return;
        }

        const docUsuario = await getDoc(doc(db, "usuarios", usuario.uid));
        if(docUsuario.exists()){
            callback(docUsuario.data());
        }
    })
}

//redirigir si no ha iniciado sesion o no es colaborador
export function soloColaborador(callback){
    onAuthStateChanged(auth, async(usuario)=>{
        if(!usuario){
            window.location.href = "../iniciodeSesion/iniciodeSesion.html";
            return;
        }

        const docUsuario = await getDoc(doc(db, "usuarios", usuario.uid));
        if(docUsuario.exists()){

            const datosUsuario = docUsuario.data();

            if(datosUsuario.rol == "estudiante"){
                window.location.href = "../index/index.html";
                return
            }

            callback(docUsuario.data());
        }
    })
}

