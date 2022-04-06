import puppeteer from "puppeteer";

const MaterialSelect = async (page, cssSelector, newSelectedValue) => {
  await expect(page).toClick(cssSelector);
  await expect(page).toClick(`li[data-value="${newSelectedValue}"]`);
}

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

  if (values.cardExpirationMonth) {
    await page.click('[data-testid="cardExpirationMonth"]');
    await page.click(`[data-testid="cardExpirationMonthOption-${values.cardExpirationMonth}"]`);
  }
  
  if (values.cardExpirationYear) {
    await page.click('[data-testid="cardExpirationYear"]');
    await page.click(`[data-testid="cardExpirationYearOption-${values.cardExpirationYear}"]`);
  }

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
    '[data-testid="cardExpirationMonth"]',
    '[data-testid="cardExpirationYear"]',
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
    [1, "Name is not complete"],
    [4, "CVV is not complete"],
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
    expect(alertMessage).toBe("Credit card number is not complete");
  });

  test.each(errors)("submit empty field", async (_index, err) => {
    let values = emptyField(err[0], "");
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
    [1, "Name is invalid", "4111111111111111"],
    [2, "CVC is invalid", "0"],
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