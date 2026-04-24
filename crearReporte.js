import { db, auth } from "../firebase.js";
import { collection, setDoc, onSnapshot, updateDoc, Timestamp, runTransaction, doc, getDoc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";


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
        
      const idReporte = reporte.numero_reporte.toString();
      //guardar todo en la base de datos
      await setDoc(doc(db, "reportes", idReporte), reporte);

    }catch(error){
        console.log(error.code)
        console.log(error.message)
    }
}

//cargar cambios en los reportes y enviarlos al mapa
export function cargarReportes(callback){
  try {
      //escuchar los cambios en tiempo real
      onSnapshot(collection(db, "reportes"), (snapshot) => {
        const arregloReportes = [];
        snapshot.forEach(doc => {
          
          //agregar cada reporte al arreglo
          const datosReporte = doc.data();
          arregloReportes.push(datosReporte);
            
        });

        callback(arregloReportes);
      });
    }catch(error){
        console.log(error.message)
        console.log(error.code)
    }
}

//Actualizar reportes
export async function actualizarReporte(estado, datos) {
  try {
    //guardar usuario actual para encontrar su codigo
    const uid = auth.currentUser.uid
    
    let datosUsuario;
    const userDoc = await getDoc(doc(db, "usuarios", uid));
    if (userDoc.exists()) {
     datosUsuario = userDoc.data();
    }
    
    //guardar numero de reporte para encontrarlo en la base de datos
    const numero_reporte = datos.id.toString();
  
    let datosReporte;
    const reporteDoc = await getDoc(doc(db, "reportes", numero_reporte));
    if (reporteDoc.exists()) {
      datosReporte = reporteDoc.data();
    }
    
    let fecha_solucion = null;
    if (estado === "completado") {
      fecha_solucion = Timestamp.now();
    }
    
    //actualizar estado del reporte y agregar el codigo del colaborador
    await updateDoc(doc(db, "reportes", numero_reporte), {
      codigo_colaborador: datosUsuario.codigo,
      estado: estado,
      uid_colaborador: datosUsuario.uid,
      fecha_solucion: fecha_solucion
      });
    
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
}