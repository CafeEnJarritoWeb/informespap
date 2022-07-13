


var database = firebase.database()

var paciente, fecha, edad, dni, pap, colposcopia, vulvoscopia, culdoscopia, coloracion, lesionesulc, lesionescon, resultado, tipo1, tipo2, tipo3, positivo, negativo, indefinido, testDeSchiller, lugol;


let botonInforme = document.getElementById('boton-nuevo-informe')
let botonBorrar = document.getElementById('borrar')
let botonActualizar = document.getElementById('actualizar')
let botonBuscar = document.getElementById('buscar')







function Ready() {

  paciente = document.getElementById('paciente').value;
  fecha = document.getElementById('fecha').value;
  edad = document.getElementById('edad').value;
  dni = document.getElementById('dni').value;
  pap = document.getElementById('pap').value;
  colposcopia = document.getElementById('colposcopia').value;
  vulvoscopia = document.getElementById('vulvoscopia').value;
  culdoscopia = document.getElementById('culdoscopia').value;
 coloracion = document.getElementById('coloracion').value;
 lesionesulc = document.getElementById('lesionesulc').value;
  lesionescon = document.getElementById('lesionescon').value;
  resultado = document.getElementById('resultado').value;
  tipo1 = document.getElementById('1').value;
  tipo2 = document.getElementById('2').value;
  tipo3 = document.getElementById('3').value;
  positivo = document.getElementById('positivo').value;
  negativo = document.getElementById('negativo').value;
  indefinido = document.getElementById('indefinido').value;
  testDeSchiller = document.getElementById('testdeschiller').value;
  lugol = document.getElementById('lugol').value;
  observaciones = document.getElementById('observaciones').value;

}


 document.getElementById('boton-nuevo-informe').onclick = function nuevoInforme() {

   Ready();

   firebase.database().ref('paciente/'+dni).set({

     paciente: paciente,
     dni: dni,
     edad: edad,
     fecha:fecha,
     colposcopia: colposcopia,
     vulvoscopia: vulvoscopia,
     culdoscopia: culdoscopia,
    coloracion: coloracion,
    lesionesulc: lesionesulc,
     lesionescon:lesionescon,
     resultado:resultado,
     tipo1:tipo1,
     tipo2:tipo2,
     tipo3:tipo3,
     positivo:positivo,
     negativo:negativo,
     indefinido:indefinido,
     testDeSchiller: testDeSchiller,
     lugol:lugol,
     observaciones:observaciones,


   });





 }

 //-----------------seleccion de info--------/////


document.getElementById('buscar').onclick = function buscar(){

Ready();

firebase.database().ref('paciente/'+dni).on('value',function(snapshot){

document.getElementById('paciente').value = snapshot.val().paciente;
 document.getElementById('fecha').value = snapshot.val().fecha;
 document.getElementById('edad').value = snapshot.val().edad;
 document.getElementById('dni').value = snapshot.val().dni;
 document.getElementById('pap').value = snapshot.val().pap;
 document.getElementById('colposcopia').value = snapshot.val().colposcopia;
 document.getElementById('vulvoscopia').value = snapshot.val().vulvoscopia;
 document.getElementById('culdoscopia').value = snapshot.val().culdoscopia;
 document.getElementById('coloracion').value = snapshot.val().coloracion;
 document.getElementById('lesionesulc').value = snapshot.val().lesionesulc;
 document.getElementById('lesionescon').value = snapshot.val().lesionescon;
 document.getElementById('resultado').value = snapshot.val().resultado;
 document.getElementById('1').value = snapshot.val().tipo1;
 document.getElementById('2').value = snapshot.val().tipo2;
 document.getElementById('3').value = snapshot.val().tipo3;
 document.getElementById('positivo').value = snapshot.val().positivo;
 document.getElementById('negativo').value = snapshot.val().negativo;
 document.getElementById('indefinido').value = snapshot.val().indefinido;
 document.getElementById('testdeschiller').value = snapshot.val().testDeSchiller;
 document.getElementById('lugol').value = snapshot.val().lugol;
 document.getElementById('observaciones').value = snapshot.val().observaciones;
});


}



//----------Proceso de actualización -------////



document.getElementById('actualizar').onclick = function actualizar() {

  Ready();

  firebase.database().ref('paciente/'+dni).update({

    paciente: paciente,
    edad: edad,
    fecha:fecha,
    colposcopia: colposcopia,
    vulvoscopia: vulvoscopia,
    culdoscopia: culdoscopia,
   coloracion: coloracion,
   lesionesulc: lesionesulc,
    lesionescon:lesionescon,
    resultado:resultado,
    tipo1:tipo1,
    tipo2:tipo2,
    tipo3:tipo3,
    positivo:positivo,
    negativo:negativo,
    indefinido:indefinido,
    testDeSchiller: testDeSchiller,
    lugol:lugol,
    observaciones:observaciones,


  });





}

////------------------Proceso de agregado de informes -----------------/////

document.getElementById('agregarinforme').onclick = function agregar(){

Ready();

var fecha = document.getElementById('fecha').value
var dni = document.getElementById('dni').value
var db = firebase.database()
var dbRef = db.ref("dni");

dbRef.on("child_added",firebase.database().ref('paciente/'+dni+fecha).push({
  paciente: paciente,
  edad: edad,
  fecha:fecha,
  colposcopia: colposcopia,
  vulvoscopia: vulvoscopia,
  culdoscopia: culdoscopia,
  coloracion: coloracion,
  lesionesulc: lesionesulc,
  lesionescon:lesionescon,
  resultado:resultado,
  tipo1:tipo1,
  tipo2:tipo2,
  tipo3:tipo3,
  positivo:positivo,
  negativo:negativo,
  indefinido:indefinido,
  testDeSchiller: testDeSchiller,
  lugol:lugol,
  observaciones:observaciones,

}));
}

/// ----------------------Proceso de borrado ---------------////




document.getElementById('borrar').onclick = function borrar() {

  Ready();

  firebase.database().ref('paciente/'+dni).remove();


}




////---------------------Fotos ---------------------////


var imgName, imgUrl;
var files = [];
var reader = new FileReader();
