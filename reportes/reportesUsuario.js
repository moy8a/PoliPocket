
import { soloUsuarios } from "../autenticacion.js";
import { cargarReportes } from "../crearReporte.js";

//solo permitir a usuarios con sesion iniciada
soloUsuarios(function (datosUsuario) {
  
  //cargar uid del usuario actual
  let uid = datosUsuario.uid
  
  let tabla = document.getElementById("Tabla_usuario");
  
  cargarReportes(function (arregloReportes) {
    //limpiar tabla
    tabla.innerHTML = '';
    
    arregloReportes.forEach(datosReporte => {
      
      let uid_usuario = datosReporte.uid_usuario
      
      if (uid === uid_usuario) {
        elementosTabla(datosReporte)
      }
    });
  });
  
  function elementosTabla(datosReporte) {
    
    let filaTabla = document.createElement('tr');
    tabla.append(filaTabla);
    
    //objeto de solo los datos a mostrar
    let fecha_expedicion = datosReporte.fecha_expedicion.toDate().toString().slice(0, 24)
    let fecha_solucion = "N/A";
    if (datosReporte.fecha_solucion) {
      fecha_solucion = datosReporte.fecha_solucion.toDate().toString().slice(0, 24)
    }
    
    let datos = {
      id: datosReporte.numero_reporte,
      fechaE: fecha_expedicion,
      fechaS: fecha_solucion,
      tipo: datosReporte.tipo_reporte,
      edificio: datosReporte.edificio,
      descripcion: datosReporte.descripcion,
      codigoC: datosReporte.codigo_colaborador,
      area: datosReporte.area,
      estado: datosReporte.estado
    };
    
    //llenar la fila con los datos del reporte
    Object.values(datos).forEach(dato => {
      let datoTabla = document.createElement('td')
      datoTabla.textContent = dato;
      filaTabla.append(datoTabla);
    });
    
  }
});

