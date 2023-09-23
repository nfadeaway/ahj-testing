export default class CreditCard {
  constructor(el) {
    this.el = el;
  }

  getIssuer() {
    if (this.el.value.startsWith("4")) return "visa";
    if (this.el.value.startsWith("34") || this.el.value.startsWith("37"))
      return "amex";
    if (this.el.value.startsWith("220")) return "mir";
    if (
      Number(this.el.value.slice(0, 4)) >= 3528 &&
      Number(this.el.value.slice(0, 4)) <= 3589
    )
      return "jcb";
    if (
      (Number(this.el.value.slice(0, 2)) >= 51 &&
        Number(this.el.value.slice(0, 2)) <= 55) ||
      (Number(this.el.value.slice(0, 6)) >= 222100 &&
        Number(this.el.value.slice(0, 6)) <= 272099)
    ) {
      return "mastercard";
    }
    if (
      this.el.value.startsWith("6011") ||
      this.el.value.startsWith("65") ||
      (Number(this.el.value.slice(0, 3)) >= 644 &&
        Number(this.el.value.slice(0, 3)) <= 649) ||
      (Number(this.el.value.slice(0, 6)) >= 622126 &&
        Number(this.el.value.slice(0, 6)) <= 622925)
    ) {
      return "discover";
    }
    if (
      this.el.value.startsWith("36") ||
      (Number(this.el.value.slice(0, 3)) >= 300 &&
        Number(this.el.value.slice(0, 3)) <= 305)
    ) {
      return "diners";
    }
    console.log("false");
    return false;
  }

  isLengthValid(issuer) {
    const numberLengthData = {
      visa: [13, 16, 19],
      amex: [15],
      mir: [16, 17, 18, 19],
      jcb: [16, 17, 18, 19],
      mastercard: [16],
      discover: [16, 17, 18, 19],
      diners: [14, 15, 16, 17, 18, 19],
    };
    return issuer
      ? numberLengthData[issuer].includes(this.el.value.length)
      : false;
  }

  isLuhnValid() {
    let arr = this.el.value
      .split("")
      .reverse()
      .map((x) => Number(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
      (acc, val, i) =>
        i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
      0,
    );
    sum += lastDigit;
    return sum % 10 === 0;
  }
}
