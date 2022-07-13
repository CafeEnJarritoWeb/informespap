const navLinks = document.querySelectorAll(".link-navegacion");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = link.parentNode;
    const activeLink = parent.querySelector(".es-activo");

    activeLink.classList.remove("es-activo");
    link.classList.add("es-activo");
  });
});
