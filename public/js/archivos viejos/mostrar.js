const desplegarCampos = function (caja) {
  var despliegue = document.getElementById(caja);

  if (despliegue.style.display == "none") {
    despliegue.style.display = "flex";
  } else {
    despliegue.style.display = "none";
  }
};
