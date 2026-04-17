import { db, auth } from "../firebase.js";
import { collection, addDoc, onSnapshot, query, where, Timestamp, runTransaction, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";


export async function crearReporte(reporte) {
    try {

        //usar uid para encontrar el codigo del usuario
        const uid = auth.currentUser.uid;

        const userDoc = await getDoc(doc(db, "usuarios", uid));
        if (userDoc.exists()) {
            const datosUsuario = userDoc.data();
            reporte.codigo_usuario = datosUsuario.codigo;
            reporte.uid_usuario = datosUsuario.uid;
        }

        reporte.fecha_expedicion = Timestamp.now();

        //aumentar contador y guardar el numero de reporte
        const contadorRef = doc(db, "contador", "num_reportes");

        await runTransaction(db, async (transaction) => {
            const contadorDoc = await transaction.get(contadorRef);
            const nuevoNumero = contadorDoc.data().total + 1;

            transaction.update(contadorRef, {total: nuevoNumero});
            reporte.numero_reporte = nuevoNumero;
        })

        //guardar todo en la base de datos
        await addDoc(collection(db, "reportes"), reporte);

    }catch(error){
        console.log(error.code)
        console.log(error.message)
    }
}

//cargar cambios en los reportes y enviarlos al mapa
export function cargarReportes(callback){
    try{
        onSnapshot(collection(db, "reportes"),(snapshot)=>{
        snapshot.forEach(doc => {
            
            const datosReporte = doc.data();
            if(datosReporte.estado === "completado"){
                return;
            }

            callback(datosReporte);
        });
    })
    }catch(error){
        console.log(error.message)
        console.log(error.code)
    }
    
}