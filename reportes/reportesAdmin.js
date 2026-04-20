
import { soloColaborador } from "../autenticacion.js";
import { cargarReportes } from "../crearReporte.js";

//solo permitir a colaboradores y admins con sesion iniciada
soloColaborador(function datosUsuario() {
    
  cargarReportes(function (arregloReportes) {
    arregloReportes.forEach(datosReporte => {
      
      const estado = datosReporte.estado;
      let tablaActiva;
      switch (estado) {
        case "pendiente":
          tablaActiva = document.getElementById("Tabla_pendiente");
          elementosTabla(datosReporte, tablaActiva);
          break;
        case "proceso":
          tablaActiva = document.getElementById("Tabla_proceso");
          elementosTabla(datosReporte, tablaActiva);
          break;
        case "completado":
          tablaActiva = document.getElementById("Tabla_completado");
          elementosTabla(datosReporte, tablaActiva);
          break;
      }
    });
  });
});

function elementosTabla(datosReporte, tablaActiva) {
  
  //crear una fila por reporte
  let filaTabla = document.createElement('tr');
  tablaActiva.append(filaTabla);
  
  //objeto con solo los datos a mostrar en la tabla pendiente
  let fecha_expedicion = (datosReporte.fecha_expedicion.toDate().toString().slice(0, 24))
  let datos = {
    id: datosReporte.numero_reporte,
    fechaE: fecha_expedicion,
    fechaS: "N/A",
    tipo: datosReporte.tipo_reporte,
    edificio: datosReporte.edificio,
    descripcion: datosReporte.descripcion,
    codigoA: datosReporte.codigo_usuario,
    codigoC: "N/A",
    area: datosReporte.area
  };
  
  //llenar la fila con los datos del reporte
  Object.values(datos).forEach(dato => {
    let datoTabla = document.createElement('td')
    datoTabla.textContent = dato;
    filaTabla.append(datoTabla);
  });
}