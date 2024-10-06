// const { test, expect } = require('@playwright/test');
// const { chromium, webkit, firefox } = require('playwright');
// test.describe.configure({ mode: 'serial' });
// let browser;
// let page;
// test.beforeAll(async () => {
// browser = await chromium.launch();
// const context = await browser.newContext();
// page = await context.newPage();
// await page.goto('https://www.saucedemo.com/');
// });
// test.afterAll(async () => {
// await browser.close();
// });
// test('Test Case 1: Login', async () => {
//     await page.fill('#user-name', 'standard_user');
//     await page.fill('#password', 'secret_sauce');
//     await page.click('#login-button');
//     // Verify login success...
// });
    
// test('Test Case 2: Filter and Add to Cart', async () => {
//     await page.selectOption('.product_sort_container', 'za');
//     await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
//     // Continue with the rest of the steps...
// });



// const { test, expect } = require('@playwright/test');

// let context;
// let page;

// test.beforeEach(async () => {
//   context = await require('playwright').chromium.launchPersistentContext('', {
//     headless: false,
//   });
//   page = await context.newPage();
//   await page.goto('https://www.saucedemo.com/');
// });

// test.afterEach(async () => {
//   await context.close(); // Close the context after each test
// });

// test('Test Case 1: Login', async () => {
//   await page.fill('#user-name', 'standard_user');
//   await page.fill('#password', 'secret_sauce');
//   await page.click('#login-button');
//   // Verify login success...
// });

// test('Test Case 2: Filter and Add to Cart', async () => {
//   await page.selectOption('.product_sort_container', 'za');
//   await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
//   // Continue with the rest of the steps...
// });



const { test, expect } = require('@playwright/test');
test.describe.configure({ mode: 'serial' });

let browser;
let page;

test.beforeAll(async () => {
  browser = await require('playwright').chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');
});

test.afterAll(async () => {
  await browser.close();
});

test('Test Case 1: Login', async () => {
  await page.goto('https://www.saucedemo.com/');
  await page.waitForTimeout(3000);
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForTimeout(3000);
  // Verify login success...
});

test('Test Case 2: Filter and Add to Cart', async () => {
  await page.selectOption('.product_sort_container', 'za');
  await page.waitForTimeout(3000);
  await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
  await page.waitForTimeout(3000);
  // Continue with the rest of the steps...
});





// const { test, expect } = require('@playwright/test')

// test('My First Test', async({page}) => {
//     await page.goto('https://google.com')
//     await expect(page).toHaveTitle('Google')
//     await delay(3000)
// })