import puppeteer from "puppeteer";

describe("Page start", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: false,
    });
    page = await browser.newPage();
  });

  test("Тест на валидность карт", async () => {
    await page.goto("http://localhost:9000");
    await page.waitForSelector(".form-card");
    const amex = await page.$(".amex");
    const visa = await page.$(".visa");
    const input = await page.$(".text-field");
    const submit = await page.$(".submit-button");
    const validity = await page.$(".validity");
    await input.type("371449635398431");
    await submit.click();
    expect(await validity.evaluate((node) => node.innerText)).toBe(
      "Валидность: Да",
    );
    expect(await amex.evaluate((node) => node.classList.contains("hide"))).toBe(
      false,
    );
    await input.evaluate((node) => (node.value = ""));
    await input.type("4242424242424241");
    expect(await validity.evaluate((node) => node.innerText)).toBe(
      "Валидность:",
    );
    await submit.click();
    expect(await validity.evaluate((node) => node.innerText)).toBe(
      "Валидность: Нет",
    );
    expect(await visa.evaluate((node) => node.classList.contains("hide"))).toBe(
      false,
    );
    expect(await amex.evaluate((node) => node.classList.contains("hide"))).toBe(
      true,
    );
  }, 20000);

  afterEach(async () => {
    await browser.close();
  });
});
