import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("Тест интерфейса виджета проверки карт", async () => {
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
});
