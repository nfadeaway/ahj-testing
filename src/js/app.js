import CreditCard from "./CreditCard";

const textField = document.querySelector(".text-field");
const cards = document.querySelectorAll(".card");
const formCard = document.querySelector(".form-card");
const validity = document.querySelector(".validity");

textField.addEventListener("input", renderCardIcon);
formCard.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCardIcon();
  renderCardValidity();
});

const Card = new CreditCard(textField);

function renderCardIcon() {
  if (validity.innerText !== "Валидность:") validity.innerText = "Валидность:";
  const creditCardIssuer = Card.getIssuer();
  if (creditCardIssuer) {
    cards.forEach((card) => {
      if (!card.classList.contains(creditCardIssuer)) {
        card.classList.add("hide");
      } else {
        card.classList.remove("hide");
      }
    });
  } else {
    cards.forEach((card) => card.classList.remove("hide"));
  }
}

function renderCardValidity() {
  if (Card.isLengthValid(Card.getIssuer()) && Card.isLuhnValid()) {
    validity.innerText = "Валидность: Да";
  } else {
    validity.innerText = "Валидность: Нет";
  }
}
