let menuContent = document.querySelector(".header__links");
let btnHamburger = document.querySelector(".header__hamburger");
let inputURL = document.querySelector("#input-url");
let btnSubmit = document.querySelector("#button-submit");
let urlOutput = document.querySelector(".url__output");

btnHamburger.addEventListener("click", toggleMenu);
function toggleMenu() {
  menuContent.classList.toggle("active");
  btnHamburger.classList.toggle("active");
}

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  async function createCard() {
    let data = await shortenURL();
    let card = document.createElement("div");
    console.log(data);
    card.classList.add("card");
    card.classList.add("flex");

    card.innerHTML = `
    <div class="card__link-top">${data.result.original_link}</div>
    <div class="card__link-bottom">${data.result.full_short_link}</div>
    <div class="button button--block button--cyan button--copy" data-index=${Date.now()}>Copy</div>
`;

    urlOutput.append(card);

    // add copy functionality to each buttons' cards
    let btnCopies = document.querySelectorAll(".button--copy");
    btnCopies.forEach((button) => {
      let shortenedURL = button.previousElementSibling.textContent;
      button.addEventListener("click", () => {
        button.classList.add("copied");
        button.innerText = "Copied!";
        alert(`${shortenedURL} is now copied to clipboard!`);
      });
    });
  }

  createCard();

  inputURL.value = "";
});

async function shortenURL() {
  let loader = document.createElement("div");
  loader.classList.add("loading");
  loader.innerHTML = `
  <span class="circle circle-1"></span>
  <span class="circle circle-2"></span>
  <span class="circle circle-3"></span>
  `;
  urlOutput.append(loader);

  let response = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${inputURL.value}`
  );
  if (!response.ok) {
    alert("Link is invalid!! Please try again.");
  }
  let data = await response.json();
  loader.remove();
  return data;
}
