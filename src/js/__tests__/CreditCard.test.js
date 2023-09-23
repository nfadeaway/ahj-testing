import CreditCard from "../CreditCard";

test("Тест метода getIssuer класса CreditCard", () => {
  const inputField = document.createElement("input");
  inputField.value = "371449635398431";
  const card = new CreditCard(inputField);
  expect(card.getIssuer()).toEqual("amex");
  inputField.value = "5555555555554444";
  expect(card.getIssuer()).toEqual("mastercard");
  inputField.value = "6011111111111117";
  expect(card.getIssuer()).toEqual("discover");
  inputField.value = "30569309025904";
  expect(card.getIssuer()).toEqual("diners");
  inputField.value = "4111111111111111";
  expect(card.getIssuer()).toEqual("visa");
  inputField.value = "2201382000000013";
  expect(card.getIssuer()).toEqual("mir");
  inputField.value = "3530111333300000";
  expect(card.getIssuer()).toEqual("jcb");
  inputField.value = "99999635398431";
  expect(card.getIssuer()).toEqual(false);
});

test("Тест метода isLengthValid класса CreditCard", () => {
  const inputField = document.createElement("input");
  inputField.value = "371449635398431";
  const card = new CreditCard(inputField);
  expect(card.isLengthValid(card.getIssuer())).toEqual(true);
  inputField.value = "99999635398431";
  expect(card.isLengthValid(card.getIssuer())).toEqual(false);
});

test("Тест метода isLuhnValid класса CreditCard", () => {
  const inputField = document.createElement("input");
  inputField.value = "371449635398431";
  const card = new CreditCard(inputField);
  expect(card.isLuhnValid()).toEqual(true);
  inputField.value = "99999635398431";
  expect(card.isLuhnValid()).toEqual(false);
});
