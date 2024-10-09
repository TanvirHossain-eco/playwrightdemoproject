const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');
let browser;
let page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    // await loginpage(page);
    
  });
  
test.afterAll(async () => {
    await browser.close();
});
test('Assertions Demo', async () => {
    await page.goto('https://kitchen.applitools.com');
    // await page.waitForTimeout(3000);
    // await page.pause();
    // Assertions
    // Check selected Check element has duplicate text or not
    await expect(await page.locator('text=The Kitchen')).toHaveCount(1);
    // if element has duplicate text then it will throw an error or else
    // it will click on the element
    if (await page.locator('text=The Kitchen').count() > 1) {
        console.log('Error: Element has duplicate text');
    }else{
        console.log('Element is unique');
        await page.locator('text=The Kitchen').click();
    }



});