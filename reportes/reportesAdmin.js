
import { soloColaborador } from "../autenticacion.js";
import { cargarReportes, actualizarReporte } from "../crearReporte.js";

//solo permitir a colaboradores y admins con sesion iniciada
soloColaborador(function (datosUsuario) {
  
  cargarReportes(function (arregloReportes) {
    //limpiar tabla
    document.getElementById("Tabla_pendiente").innerHTML = "";
    document.getElementById("Tabla_proceso").innerHTML = "";
    document.getElementById("Tabla_completado").innerHTML = "";
    
    arregloReportes.forEach(datosReporte => {
      
      let tablaActiva;
      
      const estado = datosReporte.estado;
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

//llenar las tablas con datos correspondientes
function elementosTabla(datosReporte, tablaActiva) {
  
  //crear una fila por reporte
  let filaTabla = document.createElement('tr');
  tablaActiva.append(filaTabla);
  
  //agregar botones solo en tabla pendiente y tabla en proceso
  const idTabla = tablaActiva.getAttribute("id")
  let botonReporte = document.createElement('button');
  let tdBoton = document.createElement('td');
  tdBoton.append(botonReporte);
  
  if(idTabla === "Tabla_pendiente" || idTabla === "Tabla_proceso"){
    botonReporte.classList.add("btn-accion");
    
    if (idTabla === "Tabla_pendiente") {
      botonReporte.classList.add("btn-atender")
      botonReporte.textContent = "Atender"
    } else {
      botonReporte.classList.add("btn-completar")
      botonReporte.textContent = "Completar"
    }
  }
  
  //objeto con solo los datos a mostrar en la tabla
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
    codigoA: datosReporte.codigo_usuario,
    codigoC: datosReporte.codigo_colaborador,
    area: datosReporte.area
  };
  
  //llenar la fila con los datos del reporte
  Object.values(datos).forEach(dato => {
    let datoTabla = document.createElement('td')
    datoTabla.textContent = dato;
    filaTabla.append(datoTabla);
    if (idTabla === "Tabla_pendiente" || idTabla === "Tabla_proceso") {
      filaTabla.append(tdBoton);
    }
  });
  
  botonReporte.addEventListener('click', async (event) => {
    
    event.preventDefault();
    
    let estado
    if (idTabla === "Tabla_pendiente") {
      estado = "proceso";
    } else if(idTabla === "Tabla_proceso") {
      estado = "completado"
    }
    
    await actualizarReporte(estado, datos);
    
  })
}
