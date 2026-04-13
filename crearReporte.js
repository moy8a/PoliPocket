import { db, auth } from "../firebase.js";
import { collection, addDoc, onSnapshot, query, where, Timestamp, runTransaction, doc, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

export async function crearReporte(reporte){
    try{

        //usar uid para encontrar el codigo del usuario
        const uid = auth.currentUser.uid;

        const q = query(
            collection(db, "usuarios"),
            where("uid","==",uid)
        );

        const snapshot = await getDocs(q);

        snapshot.forEach(documento => {
            const datosUsuario = documento.data();
            
            reporte.codigo_usuario = datosUsuario.codigo;
            reporte.uid_usuario = datosUsuario.uid;
        });

        //fecha y estado del reporte
        reporte.fecha_expedicion = Timestamp.now();
        reporte.estado = "pendiente";

        //mandar campos del colaborador como null hasta que se resuelva el reporte
        reporte.fecha_solucion = null;
        reporte.codigo_colaborador = null;
        reporte.uid_colaborador = null;
        reporte.foto_url = null;

        //aumentar contador y guardar el numero de reporte
        const contadorRef = doc(db, "contador", "reportes");

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
    }
}