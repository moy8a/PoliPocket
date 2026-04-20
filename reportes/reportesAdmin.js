
import { soloColaborador } from "../autenticacion.js";
import { cargarReportes } from "../crearReporte.js";

//solo permitir a colaboradores y admins con sesion iniciada
soloColaborador(function datosUsuario() {
  
  //cargar reportes a tabla pendiente
  let tablaPendiente = document.getElementById("Tabla_usuario");
  
  cargarReportes(function (arregloReportes) {
    arregloReportes.forEach(datosReporte => {
      
      let filaTabla = document.createElement('tr');
      tablaPendiente.append(filaTabla);
      
      let botonPendiente = document.createElement('button')
      botonPendiente.textContent = "Atender"
      botonPendiente.classList.add("btn-accion", "btn-atender");
      
      let fecha_expedicion = (datosReporte.fecha_expedicion.toDate().toString().slice(0, 24))
      
       
      //objeto con solo los datos a mostrar en la tabla pendiente
      let datos = {
        id: datosReporte.numero_reporte,
        fechaE: fecha_expedicion,
        fechaS : "N/A",
        tipo : datosReporte.tipo_reporte,
        edificio : datosReporte.edificio,
        descripcion: datosReporte.descripcion,
        codigoA : datosReporte.codigo_usuario,
        codigoC : "N/A",
        area: datosReporte.area
      };

      Object.values(datos).forEach(dato => {
        let datoTabla = document.createElement('td')
        datoTabla.textContent = dato;
        filaTabla.append(datoTabla, botonPendiente);
      })
    })
  });
});

