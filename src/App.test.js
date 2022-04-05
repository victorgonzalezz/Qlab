import puppeteer from "puppeteer";

let browser, page;

const valid_values = {
  cardName: "Victor Gonzalez",
  cardNumber: "4111111111111111",
  cardExpirationMonth: "05",
  cardExpirationYear: "2024",
  cardSecurityCode: "333",
};

// Complete form and submit
async function fillForm(values, page) {
  await page.click("input#cardNumber");
  await page.type("input#cardNumber", values.cardNumber);

  await page.click("input#cardName");
  await page.type("input#cardName", values.cardName);

  await page.click("input#cardExpirationMonth");
  await page.type("input#cardExpirationMonth", values.cardExpirationMonth);
  await page.click("input#cardExpirationYear");

  await page.type("input#cardExpirationYear", values.cardExpirationYear);
  await page.click("input#cardSecurityCode");

  await page.type("input#cardSecurityCode", values.cardSecurityCode);

  await page.click("button#validateButton");
}

// Create values object depending on which field is empty
function emptyField(index, field) {
  let values = Object.create(valid_values);
  switch (index) {
    case 0:
      values.cardNumber = field;
      break;
    case 1:
      values.cardName = field;
      break;
    case 2:
      values.cardExpirationMonth = field;
      break;
    case 3:
      values.cardExpirationYear = field;
      break;
    case 4:
      values.cardSecurityCode = field;
      break;
    default:
      break;
  }
  return values;
}

describe("test card animations", () => {
  const field = [
    "input#cardNumber",
    "input#cardName",
    "input#cardExpirationMonth",
    "input#cardExpirationYear",

    "input#cardSecurityCode",
  ];

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  test.each(field)("focus on card front", async (field) => {
    await page.click(field);
    let cardAnimation = await page.$eval(
      "div.rccs__card",
      (card) => card.classList
    );
    expect(cardAnimation[2]).toBeFalsy();
  });

  test("focus on cvc", async () => {
    await page.click("input#cardSecurityCode");
    let cardAnimation = await page.$eval(
      "div.rccs__card",
      (card) => card.classList
    );
    expect(cardAnimation[2]).toBe("rccs__card--flipped");
  });

  afterEach(async () => {
    await browser.close();
  });
});

describe("test empty fields", () => {
  const errors = [
    [0, "Credit card number is not complete"],
    [1, "Cardholder name is not complete"],

    [2, "Credit card expiration date is not complete"],
    [3, "Credit card CVC is not complete"],
  ];

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  test("submit empty form", async () => {
    await page.click("button#validateButton");
    let alertMessage = await page.$eval(
      "div#alertMessage",
      (alert) => alert.textContent
    );
    expect(alertMessage).toBe("Cardholder name is not complete");
  });

  test.each(errors)("submit empty field", async (index, err) => {
    let values = emptyField(index, "");
    await fillForm(values, page);

    let alertMessage = await page.$eval(
      "div#alertMessage",
      (alert) => alert.textContent
    );
    expect(alertMessage).toBe(err);
  });

  afterEach(async () => {
    await browser.close();
  });
});

describe("test valid fields", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  test("submit valid card", async () => {
    let values = Object.create(valid_values);
    await fillForm(values, page);

    let alertMessage = await page.$eval(
      "div#alertMessage",
      (alert) => alert.textContent
    );
    expect(alertMessage).toBe("Credit Card is valid");
  });

  afterEach(async () => {
    await browser.close();
  });
});

describe("test invalid fields", () => {
  const errors = [
    [0, "Credit card number is invalid", "411111111111111111111111"],
    [1, "Cardholder name is invalid", "4111111111111111"],
    [2, "Credit card expiration date is invalid", "050"],
    [3, "Credit card expiration date is invalid", "20232"],
    [4, "Credit card CVC is invalid", "0"],
  ];

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  test.each(errors)("submit empty field", async (index, err, val) => {
    let values = emptyField(index, val);
    await fillForm(values, page);

    let alertMessage = await page.$eval(
      "div#alertMessage",
      (alert) => alert.textContent
    );
    expect(alertMessage).toBe(err);
  });

  afterEach(async () => {
    await browser.close();
  });
});
