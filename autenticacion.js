import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";


//obtener datos de sesion
export function sesion(callback){
    onAuthStateChanged(auth, async(usuario)=>{
        if(!usuario){
            callback(usuario);
            return;
        }

        const docUsuario = await getDoc(doc(db, "usuarios", usuario.uid));
        if(docUsuario.exists()){
            callback(docUsuario.data());
        }
    })
}



//redirigir si no ha iniciado sesion
export function soloUsuarios(callback){
    onAuthStateChanged(auth, async(usuario)=>{
        if(!usuario){
            window.location.href = "../IniciodeSesion/IniciodeSesion.html";
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
            window.location.href = "../IniciodeSesion/IniciodeSesion.html";
            return;
        }

        const docUsuario = await getDoc(doc(db, "usuarios", usuario.uid));
        if(docUsuario.exists()){

            const datosUsuario = docUsuario.data();

            switch(datosUsuario.rol){
                case "estudiante":
                    window.location.href = "../mapa/mapa.html";
                    break;
                
                case "colaborador":
                case "admin":
                    callback(datosUsuario);
                    break;
            }
        }
    })
}

