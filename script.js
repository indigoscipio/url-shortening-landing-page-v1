let menuContent = document.querySelector(".header__links");
let btnHamburger = document.querySelector(".header__hamburger");

btnHamburger.addEventListener("click", toggleMenu);
function toggleMenu() {
  menuContent.classList.toggle("active");
}
