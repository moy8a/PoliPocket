import { db, auth } from "../firebase.js";
import { collection, addDoc, onSnapshot, query, where, Timestamp, runTransaction, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

//mapa del poli
var map = L.map('mapa', {
    minZoom: 19,
    maxZoom: 21.9,
    zoomControl: false,
    attributionControl: false,
    maxBoundsViscosity : 1.0
});

//vistas del mapa
var stadiaDefaultTile = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg', {
    maxZoom: 21.9,
    attribution: '&copy; OpenStreetMap contributors'
});

var stadiaWorldTile = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
    maxZoom: 21.9,
    attribution: '&copy; OpenStreetMap contributors'
});

var defaultTile = stadiaDefaultTile;
defaultTile.addTo(map);

//boton para cambiar la vista del mapa
var botonVista = document.getElementById("botonVista");

botonVista.addEventListener('click', function(){
  map.removeLayer(defaultTile);

  if(defaultTile === stadiaDefaultTile){
    defaultTile = stadiaWorldTile;
    defaultTile.addTo(map);
  }else{
    defaultTile= stadiaDefaultTile;
    defaultTile.addTo(map);
  }
});

map.setView([20.65934411098098, -103.3258758827752], 19);

//geoJson del Poli
var geoJsonPoli = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "nombre": "Escuela Politecnica de Guadalajara",
        "tipo": "perimetro"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32455156206775,
              20.659771723191938
            ],
            [
              -103.3257255723348,
              20.660499901274264
            ],
            [
              -103.32631755497275,
              20.65975210940364
            ],
            [
              -103.32677898698175,
              20.660060746706208
            ],
            [
              -103.32730110176156,
              20.659371683218765
            ],
            [
              -103.32728807123607,
              20.65920146817797
            ],
            [
              -103.32665336441359,
              20.65924887928665
            ],
            [
              -103.32655820544316,
              20.65839852463843
            ],
            [
              -103.32585431825184,
              20.658459446800606
            ],
            [
              -103.32584242779895,
              20.6581883206877
            ],
            [
              -103.32445066378882,
              20.658210428856492
            ],
            [
              -103.32455156206775,
              20.659771723191938
            ]
          ]
        ],
        "type": "Polygon"
      },
      "id": 0
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Edificio A",
        "tipo": "Edificio",
        "contenido": [
          {"nombre": "Aula A-1", "tipo": "aula", "nivel": "1"},
          {"nombre": "Baños", "tipo": "sanitario", "nivel": "2"}
        ]
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32480885916567,
              20.659431325945945
            ],
            [
              -103.3257313521474,
              20.659431325945945
            ],
            [
              -103.3257313521474,
              20.659297206911205
            ],
            [
              -103.32480885916567,
              20.659297206911205
            ],
            [
              -103.32480885916567,
              20.659431325945945
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Edificio B",
        "tipo": "Edificio"
        
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32455024406971,
              20.659136743501577
            ],
            [
              -103.32486900640055,
              20.65913713386911
            ],
            [
              -103.32486381355614,
              20.659032497063308
            ],
            [
              -103.32488960461973,
              20.659036254511435
            ],
            [
              -103.32489316250968,
              20.65911758576034
            ],
            [
              -103.32574963525761,
              20.659100319817412
            ],
            [
              -103.32574550606965,
              20.658994700692574
            ],
            [
              -103.32512687694435,
              20.659005572918815
            ],
            [
              -103.32511918892992,
              20.658958682715365
            ],
            [
              -103.32488489577662,
              20.658960302563244
            ],
            [
              -103.32472671385135,
              20.65897129354299
            ],
            [
              -103.32472975289274,
              20.65901713290297
            ],
            [
              -103.32478331655712,
              20.65901414960296
            ],
            [
              -103.32478598317381,
              20.659034453172907
            ],
            [
              -103.32454836055197,
              20.659038793429758
            ],
            [
              -103.32455024406971,
              20.659136743501577
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Edificio C",
        "tipo": "Edificio" 
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32528515757085,
              20.65889297598794
            ],
            [
              -103.32573342054002,
              20.65889297598794
            ],
            [
              -103.32573342054002,
              20.658759072425312
            ],
            [
              -103.32528515757085,
              20.658759072425312
            ],
            [
              -103.32528515757085,
              20.65889297598794
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Edificio D",
        "tipo": "Edificio"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32495479740791,
              20.658663551632756
            ],
            [
              -103.32574034981295,
              20.658663551632756
            ],
            [
              -103.32574034981295,
              20.65853356219715
            ],
            [
              -103.32495479740791,
              20.65853356219715
            ],
            [
              -103.32495479740791,
              20.658663551632756
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Edificio E",
        "tipo": "Edificio"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32572795000372,
              20.658439137888166
            ],
            [
              -103.32572795000372,
              20.65831729332659
            ],
            [
              -103.32499048164696,
              20.65831729332659
            ],
            [
              -103.32499048164696,
              20.658439137888166
            ],
            [
              -103.32572795000372,
              20.658439137888166
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Edificio F",
        "tipo": "Edificio"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32595356128276,
              20.658542832269575
            ],
            [
              -103.3259723356501,
              20.658648672944068
            ],
            [
              -103.32653822723384,
              20.65860407214474
            ],
            [
              -103.3265205463274,
              20.6584909492948
            ],
            [
              -103.32595356128276,
              20.658542832269575
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Taller1",
        "tipo": "Taller"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32644957366311,
              20.658958615603694
            ],
            [
              -103.32644957366311,
              20.658695188379568
            ],
            [
              -103.32584095466842,
              20.658695188379568
            ],
            [
              -103.32584095466842,
              20.658958615603694
            ],
            [
              -103.32644957366311,
              20.658958615603694
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Taller2",
        "tipo": "Taller"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32646332738058,
              20.659358176770567
            ],
            [
              -103.32646332738058,
              20.6590976068058
            ],
            [
              -103.3258555030314,
              20.6590976068058
            ],
            [
              -103.3258555030314,
              20.659358176770567
            ],
            [
              -103.32646332738058,
              20.659358176770567
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Laboratorio de Computo",
        "tipo": "Laboratorio"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32590018079131,
              20.65972856367499
            ],
            [
              -103.32545598705059,
              20.660298843760344
            ],
            [
              -103.32571682174722,
              20.660472827089222
            ],
            [
              -103.32617392809655,
              20.659904964099724
            ],
            [
              -103.32590018079131,
              20.65972856367499
            ]
          ]
        ],
        "type": "Polygon"
      },
      "id": 10
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Cancha",
        "tipo": "Area"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32568324896457,
              20.659897714771063
            ],
            [
              -103.32568324896457,
              20.65958840976772
            ],
            [
              -103.32543532687698,
              20.65958840976772
            ],
            [
              -103.32543532687698,
              20.659897714771063
            ],
            [
              -103.32568324896457,
              20.659897714771063
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Edificio1",
        "tipo": "Edificio"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32632525574505,
              20.659526993463317
            ],
            [
              -103.32590368843356,
              20.659526993463317
            ],
            [
              -103.32590368843356,
              20.659681466364574
            ],
            [
              -103.32632525574505,
              20.659681466364574
            ],
            [
              -103.32632525574505,
              20.659526993463317
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Biblioteca",
        "tipo": "Edificio"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32674092701008,
              20.65953526880054
            ],
            [
              -103.32697971688549,
              20.659684224807904
            ],
            [
              -103.32720671466848,
              20.659416655580685
            ],
            [
              -103.32696497676984,
              20.659248390154843
            ],
            [
              -103.32674092701008,
              20.65953526880054
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Cooperativa",
        "tipo": "Area"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32586241610939,
              20.65958767926429
            ],
            [
              -103.32586241610939,
              20.659499408999466
            ],
            [
              -103.32574154716005,
              20.659499408999466
            ],
            [
              -103.32574154716005,
              20.65958767926429
            ],
            [
              -103.32586241610939,
              20.65958767926429
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Taller3",
        "tipo": "Taller"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32640485237017,
              20.659361486608844
            ],
            [
              -103.32630756760618,
              20.659485616766588
            ],
            [
              -103.32690012026036,
              20.659880074148987
            ],
            [
              -103.32697971688549,
              20.659769736522748
            ],
            [
              -103.32640485237017,
              20.659361486608844
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nombre": "Taller4",
        "tipo": "Taller"
      },
      "geometry": {
        "coordinates": [
          [
            [
              -103.32680283549635,
              20.659891107907484
            ],
            [
              -103.3263960083005,
              20.659609746822042
            ],
            [
              -103.32630756760618,
              20.659698017022748
            ],
            [
              -103.32672029084799,
              20.66000420388312
            ],
            [
              -103.32680283549635,
              20.659891107907484
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
};

var layerEdificio = {};

//estilos del mapa
var geoJsonLayer = L.geoJSON(geoJsonPoli, {

  //estilo default
  style: function (feature) {
    if (feature.properties.tipo === "perimetro") {
      return { color: '#ff6600', weight: 4, fillOpacity: 0 }
    } else return { fillOpacity: 0, weight: 0 }
  },

  //estilo dinamico
  onEachFeature: function (feature, layer) {

    //ocultar tarjeta y recomendaciones con datos del edificio
    var tarjetaMapa = document.getElementById("tarjetaMapa");

    layer.on('click', function () {

      if (feature.properties.tipo === "perimetro") {
        tarjetaMapa.classList.remove('visible');
      }
    });

    //boton para centrar el mapa
    var botonCentrar = document.getElementById("botonCentrar");
    botonCentrar.addEventListener('click', function () {
      map.setView([20.65934411098098, -103.3258758827752], 19);

      var tarjetaMapa = document.getElementById("tarjetaMapa");
      tarjetaMapa.classList.remove('visible');
    });


    if (feature.properties.tipo === "perimetro") return;

    layerEdificio[feature.properties.nombre] = layer; //guardar layers de los edificios

    //agregar y quitar bordes cuando el mouse entra o sale
    layer.on('mouseover', function () {

      layer.setStyle({ color: '#ff6600', weight: 4 });
    });

    layer.on('mouseout', function () {

      layer.setStyle({ fillOpacity: 0, weight: 0 });
    });

    //mostrar tarjeta con datos del edificio
    layer.on('click', function () {

      var nombreEdificio = feature.properties.nombre;
      var tipoEdificio = feature.properties.tipo;

      //Mostrar aulas por edificio al seleccionar alguno
      actualizarAulas(nombreEdificio);

      document.getElementById("nombreEdificio").innerHTML = nombreEdificio;
      document.getElementById("tipoEdificio").innerHTML = tipoEdificio;

      //Mostrar el formulario
      vistaSimple.style.display = "block";
      formulario.style.display = "none";
      
      tarjetaMapa.classList.add('visible');

      var centroEdificio = layer.getBounds().getCenter();

      map.setView(centroEdificio, 19.5);

    });
  }
}).addTo(map);

//barra de busqueda
var barraBusqueda = document.getElementById("barraBusqueda");

barraBusqueda.addEventListener('input', function(){

  var busqueda = barraBusqueda.value.toLowerCase();

  var contenedorBusqueda = document.getElementById("contenedorBusqueda");
      contenedorBusqueda.innerHTML = '';

  //obtener arreglo del objeto layerEdificio
  Object.keys(layerEdificio).forEach(function(nombre){

    var layer = layerEdificio[nombre];  

    //recomendar busqueda
    if(nombre.toLowerCase().includes(busqueda)){

      var recomendacion = document.createElement('button');
      recomendacion.classList.add('recomendacion'); 

      recomendacion.textContent = nombre;

      contenedorBusqueda.appendChild(recomendacion);
      
      //limpiar recomendaciones
      if(barraBusqueda.value === ''){
        contenedorBusqueda.innerHTML = '';
      }
      
      //al clickear recomendacion mostrar edificio
      recomendacion.addEventListener('click', function(){

        var nombreEdificio = layer.feature.properties.nombre;
        var tipoEdificio = layer.feature.properties.tipo
        var tarjetaMapa = document.getElementById("tarjetaMapa");

        document.getElementById("nombreEdificio").innerHTML = nombreEdificio;
        document.getElementById("tipoEdificio").innerHTML = tipoEdificio;

        //Mostrar aulas en la recomendacion de busqueda
        actualizarAulas(nombreEdificio);

        tarjetaMapa.classList.add('visible');

        var centroEdificio = layer.getBounds().getCenter();

        map.setView(centroEdificio, 19.5);

      });
    }

    //colocar borde si la busqueda coincide con nombre en el arrglo
    if(nombre.toLowerCase() === (busqueda)){

      layer.setStyle({color:'#ff6600', weight: 4});

    }else layer.setStyle({fillOpacity: 0, weight: 0});

  })

});

//invertir coordenadas del geoJsonPoli
const mascaraPoli = geoJsonPoli.features[0].geometry.coordinates[0].map(c => [c[1], c[0]]);

//mascara de todo el mundo
const mascaraMundo = [
    [-90, -180],
    [-90,  180],
    [ 90,  180],
    [ 90, -180]
];

//ocultar todo excepto el poli
L.polygon([mascaraMundo, mascaraPoli], {

    fillColor: '#ffffff',
    fillOpacity: 0.95,
    color: '#ffffff',
    weight: 0
}).addTo(map);

map.setMaxBounds(geoJsonLayer.getBounds());

//reportes













//_______Menu de reportes_________//
// Cerrar menú
const tarjeta = document.getElementById("tarjetaMapa");
const btnCerrar = document.getElementById("Cerrar");

btnCerrar.addEventListener("click", () => {
    tarjeta.classList.remove("visible");
});


//boton para volver a la vista simple
document.getElementById("btnVolver").addEventListener("click", () => {
    formulario.style.display = "none";
    vistaSimple.style.display = "block";
});


//Boton mostrar formulario
const vistaSimple = document.getElementById("vistaSimple");
const formulario = document.getElementById("formularioReporte");
const btnIrReporte = document.getElementById("btnIrReporte");

// Ir al formulario
btnIrReporte.addEventListener("click", () => {
    vistaSimple.style.display = "none";
    formulario.style.display = "block";
});


//Foto (preview / quitar)
const inputFoto = document.getElementById("fotoReporte");
const preview = document.getElementById("previewFoto");
const contenido = document.querySelector(".subirfoto-contenido");
const btnQuitar = document.getElementById("btnQuitarFoto");

// Mostrar preview
inputFoto.addEventListener("change", function () {
    const archivo = this.files[0];

    if (archivo) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";

            contenido.style.display = "none";
            btnQuitar.style.display = "block";
        };

        reader.readAsDataURL(archivo);
    }
});

// Quitar foto
btnQuitar.addEventListener("click", () => {
    inputFoto.value = "";
    preview.src = "";
    preview.style.display = "none";

    contenido.style.display = "flex";
    btnQuitar.style.display = "none";
});

//reportes

//Numero de aulas/laboratorio Por edificio
const aulasPorEdificio = {
  "Edificio A": ["Aula A-1", "Aula A-2", "Aula A-3"],
  "Edificio B": ["Aula B-1", "Aula B-2"],
  "Edificio C": ["Aula C-1", "Aula C-2", "Aula C-3", "Aula C-4"],
  "Edificio D": ["Aula D-1", "Aula D-2", "Aula D-3", "Aula D-4", "Aula D-5",],
  "Biblioteca": [],
  "Laboratorio de Computo": ["Lab 1"],
  "Taller1": [],
  "Taller2": [],
  "Taller3": [],
  "Taller4": []
};


//Actualizacion del Select
function actualizarAulas(nombreEdificio) {
    const select = document.getElementById("aula");

    // limpiar opciones
    select.innerHTML = '';

    // opción por defecto
    const opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.textContent = "Selecciona un Aula";
    opcionDefault.disabled = true;
    opcionDefault.selected = true;
    select.appendChild(opcionDefault);

    const aulas = aulasPorEdificio[nombreEdificio] || [];

    // si no hay aulas
    if (aulas.length === 0) {
        const opcion = document.createElement("option");
        opcion.textContent = "No hay aulas disponibles";
        opcion.disabled = true;
        select.appendChild(opcion);
        return;
    }

    // agregar aulas
    aulas.forEach((aula, index) => {
        const option = document.createElement("option");
        option.value = "aula" + (index + 1);
        option.textContent = aula;
        select.appendChild(option);
    });
}

//FORMULARIO (validación)
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    const aula = document.getElementById("aula").value;
    const tipo = document.querySelector('input[name="tipo"]:checked');
    const descripcion = document.getElementById("descripcionReporte").value;
    const foto = inputFoto.files.length;

    if (!aula || !tipo || !descripcion || !foto) {
        e.preventDefault();
        alert("Completa todos los campos obligatorios");
        return;
    }

    alert("Reporte enviado correctamente");

    // Reset visual después de enviar
    setTimeout(() => {
        form.reset();

        preview.style.display = "none";
        preview.src = "";
        contenido.style.display = "flex";
        btnQuitar.style.display = "none";
    }, 100);
});