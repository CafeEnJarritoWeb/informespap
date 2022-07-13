import { cloudDB } from "./guardarinformesfirestore.js";
//import App from "./guardarinformesfirestore.js";
import { ref } from "./guardarinformesfirestore.js";
import { PanelDeControl } from "./PanelDeControl";

console.log(cloudDB, ref);
export const btnBuscarPanel = document.getElementById("boton_buscar");

export let dni = document.getElementById("searchfield");

new PanelDeControl();

console.log(PanelDeControl);
