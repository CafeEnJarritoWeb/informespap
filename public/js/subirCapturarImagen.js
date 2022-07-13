// Subir Imagenes

/*let imageninformeT = document
  .getElementById("imagenInforme")
  .getAttribute("src");
const imageninformeV = imageninformeT.src;*/

function subirImagen() {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#examinar").files[0];
  const name = +new Date() + "-" + file.name;

  const metadata = {
    contentType: file.type,
  };

  const task = ref.child(name).put(file, metadata);

  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      console.log(url);
      alert("La imagen fue subida con éxito");
      const image = document.querySelector("#imagenInforme");
      document.getElementById("imagenInforme").style.display = "block";
      image.src = url.href;
      cloudDB.collection("Pacientes").doc(dniV).update({
        imagen: image.src,
      });
    });
}

//Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains(".hidden")) {
    closeModal();
  }
});
