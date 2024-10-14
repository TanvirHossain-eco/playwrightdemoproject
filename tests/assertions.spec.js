const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');
let browser;
let page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://kitchen.applitools.com/');
    await page.waitForTimeout(3000);
    // await loginpage(page);
    
  });
  
test.afterAll(async () => {
    await browser.close();
});
test('Assertions Demo 1', async () => {
    // await page.goto('https://kitchen.applitools.com/');
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
// Check element hidden or visible
test('Assertions Demo 2', async () => {
    const visible = await page.locator('text=The Kitchen').isVisible();
    if (visible) {
        console.log('Element is visible');
        await expect(await page.locator('text=The Kitchen')).toBeVisible();
        await page.locator('text=The Kitchen').click();
    }else {
        console.log('Element is hidden');
        await expect(await page.locator('text=The Kitchen')).toBeHidden();
    }
    // await expect(await page.locator('text=The Kitchen')).toBeVisible();
    // await expect(await page.locator('text=The Kitchen')).toBeHidden();
});
// Check element enabled or disabled
test('Assertions Demo 3', async () => {
    const enabled = await page.locator('text=The Kitchen').isEnabled();
    if (enabled) {
        console.log('Element is enabled');
        await expect(await page.locator('text=The Kitchen')).toBeEnabled();
        await page.locator('text=The Kitchen').click();
    }else {
        console.log('Element is disabled');
        await expect(await page.locator('text=The Kitchen')).toBeDisabled();
    }
    // await expect(await page.locator('text=The Kitchen')).toBeEnabled();
    // await expect(await page.locator('text=The Kitchen')).toBeDisabled();
});
// Text Matches Value or Not
test('Assertions Demo 4', async () => {
    const text = await page.locator('text=The Kitchen').innerText();
    if (text === 'The Kitchen') {
        console.log('Text matches');
        await expect(await page.locator('text=The Kitchen')).toHaveText('The Kitchen');
        await page.locator('text=The Kitchen').click();
    }else {
        console.log('Text does not match');
        await expect(await page.locator('text=The Kitchen')).not.toHaveText('The Kitchen');
    }
    // await expect(await page.locator('text=The Kitchen')).toHaveText('The Kitchen');
    // await expect(await page.locator('text=The Kitchen')).not.toHaveText('The Kitchen');
});
// Element Attributes toHave & toHaveClass
test('Assertions Demo 5', async () => {
    const attr = await page.locator('text=The Kitchen').getAttribute('class');
    if (attr === 'chakra-heading css-dpmy2a') {
        console.log('Text matches');
        await expect(await page.locator('text=The Kitchen')).toHaveClass('chakra-heading css-dpmy2a');
        await page.locator('text=The Kitchen').click();
    }else {
        console.log('Text does not match');
        await expect(await page.locator('text=The Kitchen')).not.toHaveClass('chakra-heading css-dpmy2a');
    }
    // await expect(await page.locator('text=The Kitchen')).toHaveClass('the-kitchen');
    // await expect(await page.locator('text=The Kitchen')).not.toHaveClass('the-kitchen');
});
// Check have URL
test('Assertions Demo 6', async () => {
    const url = await page.url();
    if (url === 'https://kitchen.applitools.com/') {
        console.log('URL matches');
        await expect(await page).toHaveURL('https://kitchen.applitools.com/');
        await page.locator('text=The Kitchen').click();
    }else {
        console.log('URL does not match');
        await expect(await page).not.toHaveURL('https://kitchen.applitools.com/');
    }
    // await expect(await page).toHaveURL('https://kitchen.applitools.com/');
    // await expect(await page).not.toHaveURL('https://kitchen.applitools.com/');
});
// Check have Title
test('Assertions Demo 7', async () => {
    const title = await page.title();
    if (title === 'The Kitchen') {
        console.log('Title matches');
        await expect(await page).toHaveTitle('The Kitchen');
        await page.locator('text=The Kitchen').click();
    }else {
        console.log('Title does not match');
        await expect(await page).not.toHaveTitle('The Kitchen');
    }
    // await expect(await page).toHaveTitle('The Kitchen');
    // await expect(await page).not.toHaveTitle('The Kitchen');
});
// Check visual validation with screenshot
test('Assertions Demo 8', async () => {
    await page.waitForTimeout(3000);
    await expect (await page).toHaveScreenshot();
    // await page.locator('text=The Kitchen').click();
});