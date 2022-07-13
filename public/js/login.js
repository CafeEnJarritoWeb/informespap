


let btt = document.getElementById('login')
let off = document.getElementById('logout')
let name = document.getElementById('name')
let pic = document.getElementById('pic')
let email = document.getElementById('email')

if (off) {
  off.addEventListener("click", (e)=>{e.preventDefault();
  desloguear();
  })
}

if (btt) {
  btt.addEventListener("click", (e)=>{e.preventDefault();
  logearConGoogle()})

}





let usuario = {};

function logearConGoogle() {

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(result=>{ console.log("logueo", result.user.email);
usuario = result;

if (result) {
  window.location ="paneldecontrol.html"

}


lokearUsuario();
}).catch(error=> console.log(error.mensaje))




}

function desloguear() {

firebase.auth().signOut().then(function () {
console.log("nos deslogueamos")
deslokearUsuario()


}).catch(function (err) {
console.log(err, "error loco")

})
}

function lokearUsuario() {
if (btt) {
  btt.style.display = "none";
}
if (off) {
  off.style.display ="block" ;
}
if (name) {
  name.innerHTML = usuario.user.displayName;
}
if (pic) {
  pic.src = usuario.user.photoURL;

}

if (email) {
  email.innerHTML = usuario.user.email;
}


}


function deslokearUsuario() {
if (btt) {
  btt.style.display = "block";
}

if (off) {
  off.style.display ="none" ;
}

if (name) {
  name.innerHTML = "Bienvenide";
}
if (pic) {

  pic.src = "iconos/utero_completo.png";

}

if (email) {
    email.innerHTML = "No se encuentra logueade";
}
}


document.addEventListener("DOMContentLoaded" , ()=>{
firebase.auth().onAuthStateChanged(user =>{
if (user) {
usuario = {"user":user};



lokearUsuario()
}




})




})
