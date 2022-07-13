"use strict";

export const cloudDB = firebase.firestore();

export const ref = firebase.storage().ref();
let informes = [];
let botonInforme = document.getElementById("boton-nuevo-informe");
let botonBorrar = document.getElementById("borrar");
let botonActualizar = document.getElementById("actualizar");
let botonBuscar = document.getElementById("buscar");
let botonPDF = document.querySelector(".botonesPdfGuardar");

const modal = document.querySelector(".modal");
const image = document.getElementById("imagenInforme");
const subirImagen = document.getElementById("examinar");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
const btnSubirFoto = document.getElementById("boton-fotos");
const resUrl = document.getElementById("resultado_url");
const btnLimpCampos = document.getElementById("limpiarCampos");
const contInforme = document.querySelector(".contenedor");
const btnGuardarInforme = document.getElementById("guardarinforme");
const camposDesplegables = document.querySelector(".camposdesplegables");
const btnAgregarInforme = document.getElementById("agregarinforme");
const areaSearchResults = document.getElementById("searchResult");
const listaDeFechas = document.getElementById("lista-de-fechas");
const panelAlerta = document.getElementById("abrirpanelalerta");
const btnSubirAdjunto = document.getElementById("subir-archivo");
const linkDescargaAdjunto = document.getElementById("link-adjunto");
const inputAdjunto = document.getElementById("adjunto");
const contCargaArchivo = document.getElementById("carga-archivo");
const numProgreso = document.getElementById("progreso");
const borrarAdjunto = document.getElementById("borrarAdjunto");

let paciente = document.querySelector("#paciente");
let fecha = document.querySelector("#fecha");
let edad = document.querySelector("#edad");
let dni = document.querySelector("#dni");
let contacto = document.querySelector("#contacto");
let coloracion = document.querySelector("#coloracion");
let lesionesulc = document.querySelector("#lesionesulc");
let lesionescon = document.querySelector("#lesionescon");
let resultado = document.querySelector("#resultado");
let testDeSchiller = document.querySelector("#testdeschiller");
let lugol = document.querySelector("#lugol");
let observaciones = document.querySelector("#observaciones");
let zonadetransformacion = document.querySelector("#zonadetransformacion");
let imageninforme = document.querySelector("#imagenInforme");

///------------------------Agregar Paciente---------------////

class App {
  constructor() {
    //HANDLERS

    botonInforme.addEventListener("click", this._crearPaciente.bind(this));
    btnGuardarInforme.addEventListener(
      "click",
      this._guardarInforme.bind(this)
    );
    botonBorrar.addEventListener("click", this._borarInforme.bind(this));
    botonActualizar.addEventListener(
      "click",
      this._actualizarInforme.bind(this)
    );

    btnAgregarInforme.addEventListener(
      "click",
      this._agregarInforme.bind(this)
    );
    botonBuscar.addEventListener("click", this._buscarPaciente.bind(this));
    btnLimpCampos.addEventListener("click", this._limpiarCampos.bind(this));

    btnOpenModal.addEventListener("click", this._openModal.bind(this));

    btnCloseModal.addEventListener("click", this._closeModal.bind(this));
    overlay.addEventListener("click", this._closeModal.bind(this));
    camposDesplegables.addEventListener(
      "click",
      this._mostrarCampos.bind(this)
    );

    document.addEventListener("keydown", this._cerrarModalEsc.bind(this));

    btnSubirFoto.addEventListener("click", this._subirImagen.bind(this));
    resUrl.addEventListener("click", this._activarFecha.bind(this));
    listaDeFechas.addEventListener("click", this._renderInforme.bind(this));
    btnSubirAdjunto.addEventListener("click", this._subirArchivo.bind(this));
    borrarAdjunto.addEventListener("click", this._borrarArchivo.bind(this));

    this._agregarListenerDinamico(
      areaSearchResults,
      "click",
      "button",
      this._editarResult.bind(this)
    );

    panelAlerta.addEventListener("click", this._mostrarCampos.bind(this));
  }

  //FIN HANDLERS
  _mostrarFormularioDeCarga() {
    contInforme.classList.remove("hidden");
  }
  //FUNCIONES DE BASE DE DATOS
  _crearPaciente() {
    try {
      if (!dni.value || !fecha.value)
        throw new Error(`No se puede generar un informe sin DNI y Fecha `);

      cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).set({
        nombre: paciente.value,
        dni: dni.value,
        edad: edad.value,
        fecha: fecha.value,
        contacto: contacto.value,
        coloracion: coloracion.value,
        lesionesUlcerosas: lesionesulc.value,
        lesionesCondilomatosas: lesionescon.value,
        resultado: resultado.value,
        testDeSchiller: testDeSchiller.value,
        lugol: lugol.value,
        observaciones: observaciones.value,
        zonadetransformacion: zonadetransformacion.value,
      });

      this._clear();
      this._mostrarFormularioDeCarga();
      this._ocultarSearch();

      if (areaSearchResults.classList.contains("hidden")) {
        console.log("borra");
        this._resetearInputs();
        linkDescargaAdjunto.classList.add("hidden");
        borrarAdjunto.classList.add("hidden");
      }

      console.log(cloudDB);
    } catch (err) {
      alert(`${err}.Hubo un error al crear el informe`);
    }
  }

  _guardarInforme() {
    if (!dni.value || !fecha.value)
      throw new Error(`No se puede generar un informe sin DNI y Fecha `);
    try {
      cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).update({
        nombre: paciente.value,
        dni: dni.value,
        edad: edad.value,
        fecha: fecha.value,
        contacto: contacto.value,
        coloracion: coloracion.value,
        lesionesUlcerosas: lesionesulc.value,
        lesionesCondilomatosas: lesionescon.value,
        resultado: resultado.value,
        testDeSchiller: testDeSchiller.value,
        lugol: lugol.value,
        observaciones: observaciones.value,
        zonadetransformacion: zonadetransformacion.value,
        imagen: imageninforme.src,
      });

      alert("El informe se guardo con éxito");
    } catch {
      (err) => {
        alert(`${err}.Hubo un error al crear el informe`);
      };
    }

    console.log(fecha);
  }

  _agregarInforme() {
    if (!dni.value || !fecha.value)
      throw new Error(`No se puede generar un informe sin DNI y Fecha `);
    try {
      cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).set({
        nombre: paciente.value,
        dni: dni.value,
        edad: edad.value,
        fecha: fecha.value,
        contacto: contacto.value,
        coloracion: coloracion.value,
        lesionesUlcerosas: lesionesulc.value,
        lesionesCondilomatosas: lesionescon.value,
        resultado: resultado.value,
        testDeSchiller: testDeSchiller.value,
        lugol: lugol.value,
        observaciones: observaciones.value,
        zonadetransformacion: zonadetransformacion.value,
        imagen: imageninforme.src,
      });

      alert(
        `El informe con fecha ${fecha.value} se agrego al DNI ${dni.value}`
      );
    } catch {
      (err) => {
        alert(`${err}.Hubo un error al crear el informe`);
      };
    }
  }

  _actualizarInforme() {
    try {
      if (!dni.value || !fecha.value)
        throw new Error(
          `El informe no puede ser actualizado sin fecha o dni validos `
        );
      cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).update({
        nombre: paciente.value,
        dni: dni.value,
        edad: edad.value,
        fecha: fecha.value,
        contacto: contacto.value,
        coloracion: coloracion.value,
        lesionesUlcerosas: lesionesulc.value,
        lesionesCondilomatosas: lesionescon.value,
        resultado: resultado.value,
        testDeSchiller: testDeSchiller.value,
        lugol: lugol.value,
        observaciones: observaciones.value,
        zonadetransformacion: zonadetransformacion.value,
        imagen: imageninforme.src,
      });

      alert(
        `El informe con fecha ${fecha.value} del DNI ${dni.value} se actualizó correctamente`
      );
    } catch (err) {
      alert(
        `${err} No se pudo actualizar el informe con fecha ${fecha.value} del DNI ${dni.value} `
      );
    }
  }

  _borarInforme() {
    try {
      cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).delete({
        nombre: paciente.value,
        dni: dni.value,
        edad: edad.value,
        fecha: fecha.value,
        contacto: contacto.value,
        coloracion: coloracion.value,
        lesionesUlcerosas: lesionesulc.value,
        lesionesCondilomatosas: lesionescon.value,
        resultado: resultado.value,
        testDeSchiller: testDeSchiller.value,
        lugol: lugol.value,
        observaciones: observaciones.value,
        zonadetransformacion: zonadetransformacion.value,
        imagen: imageninforme.src,
      });

      this._eliminarImagen();

      let archivo = borrarAdjunto.dataset.ref;
      let refBorrar = ref.child(archivo);
      refBorrar.delete().then(() => {
        console.log(`El archivo ${refBorrar} fue borrado exitosamente.`);
        alert(`El archivo ${refBorrar} fue borrado exitosamente.`);
      });

      linkDescargaAdjunto.classList.add("hidden");
      borrarAdjunto.classList.add("hidden");
      inputAdjunto.innerText = "";
      subirImagen.value = "";
      cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).update({
        adjunto: "",
        nombreAdjunto: "",
      });

      alert(
        `El informe con fecha ${fecha.value} del DNI ${dni.value} se eliminó correctamente`
      );
    } catch {
      (err) => {
        alert(`${err}.Hubo un error al intentar borrar el informe`);
      };
    }

    this._clear();

    this._limpiarCampos();
  }

  //INICIO IMAGENES Y ARCHIVOS ADJUNTOS [SUBIDA Y MANIPULACIÓN]

  async _subirImagen() {
    try {
      if (!subirImagen.value)
        throw new Error(`Debe seleccionar un archivo para subir`);
      const file = subirImagen.files[0];
      const name = file.name + "-" + file.type.slice(1, 4);
      file.value = name;

      const metadata = {
        contentType: file.type,
      };

      const task = ref
        .child(`imagenes/${dni.value}/${fecha.value}.${file.type.slice(1, 4)}`)
        .put(file, metadata);

      console.log(metadata);
      console.log(task);

      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("La imagen fue subida con éxito");
          this._closeModal();

          image.style.display = "block";
          image.dataset.b = `imagenes/${dni.value}/${
            fecha.value
          }.${file.type.slice(1, 4)}`;
          console.log(image);
          image.src = url;
          cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).update({
            imagen: image.src,
            pathImagen: image.dataset.b,
          });
        });
    } catch {
      (err) => {
        console.error(`${err}`);
        alert(`Hubo un error al intentar subir la imagen: ${err.message}`);
      };
    }
  }

  async _subirArchivo() {
    try {
      if (!inputAdjunto.value)
        throw new Error(`Debe seleccionar un archivo para adjuntar`);

      console.log("sube");

      let archivo = inputAdjunto.files[0];
      let adjunto = ref.child(
        `adjuntos/${dni.value}/${fecha.value}.${archivo.type.slice(1, 4)}`
      );
      let nombreAdjunto = archivo.name + "-" + archivo.type.slice(1, 4);
      let metadataAdjunto = {
        contentType: archivo.type,
      };

      adjunto.put(archivo).on(`state_change`, (snapshot) => {
        console.log(snapshot);
        let progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progreso);
        numProgreso.classList.remove("hidden");
        numProgreso.innerHTML = `${progreso}% subiendo`;
      });

      adjunto
        .put(archivo, metadataAdjunto)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);

          console.log(
            `El archivo ${nombreAdjunto} ${metadataAdjunto} fue adjuntado correctamente`
          );

          numProgreso.classList.add("hidden");
          linkDescargaAdjunto.setAttribute("href", url);
          linkDescargaAdjunto.setAttribute("download", url);
          linkDescargaAdjunto.classList.remove("hidden");
          borrarAdjunto.classList.remove("hidden");
          borrarAdjunto.dataset.ref = `adjuntos/${dni.value}/${
            fecha.value
          }.${archivo.type.slice(1, 4)}`;
          linkDescargaAdjunto.innerText = nombreAdjunto;
          if (!linkDescargaAdjunto.classList.contains("hidden")) {
            let segundoLink = ` <a class="link-archivo hidden" id="link-adjunto" href="${url} " target="_blank">${nombreAdjunto} </a> `;
            contCargaArchivo.insertAdjacentHTML("afterend", segundoLink);
          }

          cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).update({
            adjunto: linkDescargaAdjunto.href,
            nombreAdjunto: nombreAdjunto,
            pathAdjunto: borrarAdjunto.dataset.ref,
          });

          adjunto.getMetadata().then((metadata) => {
            console.log(metadata);
          });

          alert(`El archivo ${nombreAdjunto} a sido subido con éxito`);
        });
    } catch {
      (err) => {
        alert(`${err}`);
      };
    }
  }

  async _borrarArchivo(e) {
    try {
      console.log(e.target);
      console.log(e.target.dataset.ref);
      let refBorrar = ref.child(borrarAdjunto.dataset.ref);

      console.log(`borrando ${refBorrar}`);

      refBorrar.delete().then(() => {
        console.log(`El archivo ${refBorrar} fue borrado exitosamente.`);
        alert(`El archivo ${refBorrar} fue borrado exitosamente.`);
      });

      linkDescargaAdjunto.classList.add("hidden");
      borrarAdjunto.classList.add("hidden");
      inputAdjunto.innerText = "";
      cloudDB.collection(`Paciente ${dni.value}`).doc(fecha.value).update({
        adjunto: "",
        nombreAdjunto: "",
      });
    } catch {
      (err) => {
        alert(`${err}`);
      };
    }
  }

  //FIN IMÁGENES Y ARCHIVOS ADJUNTOS

  //FIN EDICION DE BASE DE DATOS

  //FUNCION DE SEARCH
  async _buscarPaciente() {
    try {
      if (!dni.value)
        throw new Error(
          `El informe no existe o hay un error en los datos de busqueda `
        );

      this._ocultarSearch();
      this._ocultarForm();

      informes = [];
      let html = "";

      let fechas = [];

      await cloudDB
        .collection(`Paciente ${dni.value}`)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc, i) => {
            if (dni.value != doc.data().dni)
              throw new Error(`El DNI buscado no existe en la base de datos`);
            console.log(doc);
            console.log(doc.data());
            console.log(doc.id);

            informes.push(doc.data());
            fechas.push(doc.id);

            html += `
            <li class="fechainf" data-k=${i}><a class="buscar" href="#" dataset-w=${i}>${doc.id}</a></li>
      
        `;
          });
        });

      console.log(fechas);
      console.log(informes);
      console.log(html);
      this._clear();

      listaDeFechas.insertAdjacentHTML("beforeend", html);
      this._renderInforme(informes, areaSearchResults);
    } catch {
      (err) => {
        alert(`${err.message}`);
      };
    }
  }

  //FUNCIONES HELPERS (CAMBIOS DE VISTAS, RENDER DE INFORMES)
  _openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  _closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  _cerrarModalEsc(e) {
    if (e.key === "Escape" && !modal.classList.contains(".hidden")) {
      _closeModal(this);
    }
  }

  _limpiarCampos() {
    paciente.value = "";
    fecha.value = "";
    dni.value = "";
    edad.value = "";
    contacto.value = "";
    coloracion.value = "";
    lesionesulc.value = "";
    lesionescon.value = "";
    resultado.value = "";
    zonadetransformacion.value = "";
    testDeSchiller.value = "";
    lugol.value = "";
    observaciones.value = "";
    imageninforme.src = "";

    imageninforme.style.display = "none";
    inputAdjunto.value = "";
  }

  _eliminarImagen() {
    let dataImagenBorrar = image.dataset.b;
    let refChild = ref.child(dataImagenBorrar);
    console.log("borrando imagen");

    refChild.delete().then(() => {
      console.log(`La imagen ${dataImagenBorrar} fue eliminada exitosamente.`);
      alert(`La imagen ${dataImagenBorrar} fue eliminada exitosamente.`);
    });
  }

  _mostrarCampos(e) {
    console.log(e);
    if (e.target.classList.contains("botonDesp")) {
      const cDesple = e.target.nextElementSibling;
      console.log(cDesple);
      cDesple.classList.add("desplegable");
      cDesple.classList.remove("hidden-desple");
    }

    console.log(e.target);
  }

  _mostrarSearch() {
    areaSearchResults.classList.remove("hidden");
    areaSearchResults.classList.add("resultadosSearch");
  }

  _ocultarForm() {
    contInforme.classList.add("hidden");
  }

  _ocultarSearch() {
    areaSearchResults.classList.add("hidden");
    areaSearchResults.classList.remove("resultadosSearch");
  }

  _clear() {
    areaSearchResults.innerHTML = "";
    listaDeFechas.innerHTML = "";
  }

  _activarFecha(e) {
    if (e.target.classList.contains("buscar")) {
      const btnfechas = e.target.parentElement;
      const cont = btnfechas.parentElement;
      const arraylinks = cont.children;
      console.log(arraylinks);

      for (let i = 0; i < arraylinks.length; i++) {
        arraylinks[i].addEventListener("click", function () {
          let current = document.getElementsByClassName("active");
          if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
          }

          this.className += " active";
          if (!contInforme.classList.contains("hidden")) {
            contInforme.classList.add("hidden");

            console.log("funca");
          }
        });
      }
    }
  }

  _renderInforme(e, array, location) {
    if (e.target.classList.contains("buscar")) {
      e.preventDefault(e);
      this._mostrarSearch();

      console.log(array);
      console.log(location);
      let html = "";

      let w = e.target.parentElement;
      let x = Number(w.dataset.k);

      informes.forEach((el, i) => {
        console.log(el);
        console.log(x, i);
        console.log(typeof x, typeof i);
        console.log(x === i);
        if (x === i)
          html = `<div class="cont-datos">
      <h1 class="rotulo">${informes[`${i}`].nombre} </h1>
      <h2 class="rotulo"> DNI ${informes[`${i}`].dni} </h2>
      <h2 class="rotulo"> Fecha Informe ${informes[`${i}`].fecha} </h2>
      <h3 class="rotulo">  ${informes[`${i}`].edad} años </h3>
      <h3 class="rotulo">${informes[`${i}`].contacto}</h3>
    </div>
   
    
    
    <div class="imagenPaciente">
      <img class="dataImagen" src="${informes[`${i}`].imagen}" alt="" data-b="${
            informes[`${i}`].pathImagen
          } ">
    </div>
    

    
    <div class="cont">
    <h2 class="tituloSearch">Vulvoscopia</h2>
    
    <h4 class="rotulo">Coloracion:</h4> <p class="data">${
      informes[`${i}`].coloracion
    } </p>
    <h4 class="rotulo">Lesiones Ulceradas:</h4> <p class="data"> ${
      informes[`${i}`].lesionesUlcerosas
    }</p>
    <h4 class="rotulo">Lesiones Condilomatosas:</h4> <p class="data"> ${
      informes[`${i}`].lesionesCondilomatosas
    } </p>
    </div>
    
    <div class="cont">
    
      <h2 class="tituloSearch">Colposcopia</h2>
    
      <h4 class="rotulo">Resultado:</h4> <p class="data"> ${
        informes[`${i}`].resultado
      }  </p>
      <h4 class="rotulo">Zona de Transformación:</h4> <p class="data">${
        informes[`${i}`].zonadetransformacion
      }  </p>
    
    </div>
    
    
    <div class="cont">
      <h2 class="tituloSearch">Test de Schiller</h2>
    
      <h4 class="rotulo">Resultado:</h4> <p class="data"> ${
        informes[`${i}`].testDeSchiller
      } </p>
      <h4 class="rotulo">Lugol:</h4> <p class="data"> ${
        informes[`${i}`].lugol
      } </p>
    
    </div>

    <div class="cont">
    
  
    <h4 class="rotulo">Archivo Adjunto</h4> <a class="link" href="${
      informes[`${i}`].adjunto
    }" data-ref="${informes[`${i}`].pathAdjunto}">${
            informes[`${i}`].nombreAdjunto
          }  </a>
    
  
  </div>


    
    <div class="cont">
      <h2 class="tituloSearch">Observaciones</h2>
    
    <p class="data">${informes[`${i}`].observaciones} </p>
    
    
            </div>



            
            <div class="botonesRes">

            <button class="botones-comandos" id="actualizar" type="button" name="actualizar" value="Actualizar Informe"
            title="Actualiza la información" data-id="${i}"  ><img src=" ${
            botonActualizar.firstElementChild.attributes[0].nodeValue
          } " alt=""></button>

           
 
          
          <button class="botones-comandos" id="generarPdf" type="button" name="Generar PDF" value="Generar PDF"
    title="Genera un PDF del informe"data-id="${informes[`${i}`]}" ><img src="${
            botonPDF.firstElementChild.attributes[0].nodeValue
          }" alt=""></button>
          
          
          
          </div>
          
          `;
      });
      areaSearchResults.innerHTML = "";
      areaSearchResults.insertAdjacentHTML("beforeend", html);
    }
  }

  _agregarListenerDinamico(dom, tipo, selector, callback) {
    dom.addEventListener(tipo, (e) => {
      if (e.target.matches(selector)) callback(e);
    });
  }

  //MANIPULACIÓN DE LOS RESULTADOS (EDIT, AGREGAR INFORME, BORRAR)

  _editarResult(e) {
    this._ocultarSearch();
    this._mostrarFormularioDeCarga();

    try {
      const data = e.target.dataset.id;
      console.log(e);
      console.log(e.target);
      console.log(data);

      paciente.value = informes[`${data}`].paciente;
      fecha.value = informes[`${data}`].fecha;
      edad.value = informes[`${data}`].edad;
      dni.value = informes[`${data}`].dni;
      contacto.value = informes[`${data}`].contacto;
      coloracion.value = informes[`${data}`].coloracion;
      lesionesulc.value = informes[`${data}`].lesionesulc;
      lesionescon.value = informes[`${data}`].lesionescon;
      resultado.value = informes[`${data}`].resultado;
      testDeSchiller.value = informes[`${data}`].testDeSchiller;
      lugol.value = informes[`${data}`].lugol;
      observaciones.value = informes[`${data}`].observaciones;
      zonadetransformacion.value = informes[`${data}`].zonadetransformacion;
      imageninforme.src = informes[`${data}`].imagen;
      imageninforme.style.display = "block";
      imageninforme.dataset.b = informes[`${data}`].pathImagen;
      borrarAdjunto.dataset.ref = informes[`${data}`].pathAdjunto;
      console.log(imageninforme.src);
    } catch {}
  }

  _resetearInputs() {
    edad.value = "";
    paciente.value = "";
    contacto.value = "";
    coloracion.value = "";
    lesionesulc.value = "";
    lesionescon.value = "";
    resultado.value = "";
    testDeSchiller.value = "";
    lugol.value = "";
    observaciones.value = "";
    zonadetransformacion.value = "";
    imageninforme.src = "";
    imageninforme.style.display = "none";
    inputAdjunto.value = "";
    subirImagen.value = "";
  }

  //FIN MANIP RESULTS
}

const app = new App();

export default new App();
