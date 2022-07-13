import { cloudDB } from "./guardarinformesfirestore.js";
import { btnBuscarPanel, dni } from "./buscarpaneldecontrol";

export class PanelDeControl {
  constructor() {
    //HANDLERS
    btnBuscarPanel.addEventListener(
      "click",
      this.buscarEnPanelDeControl.bind(this)
    );
  }

  _buscarEnPanelDeControl() {
    cloudDB
      .collection(`Paciente ${dni.value}`)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.data().dni;
          doc.data().paciente;
          doc.data().fecha;
        });
        console.log(doc.data().dni);
      });
    _renderResultados();
  }

  _renderResultados() {
    var tbody = document.getElementById("cuerpo_tabla");
    var trow = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.innerHTML = dni;
    td2.innerHTML = paciente;
    td3.innerHTML = fecha;
    td4.innerHTML = edad;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    tbody.appendChild(trow);
  }
}
