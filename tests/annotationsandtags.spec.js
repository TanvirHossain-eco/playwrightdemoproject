const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

test.describe('Annotations and Tags', () => {
    let browser;
    let page;

    test.beforeEach(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.saucedemo.com/');
        // await loginpage(page);
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.waitForTimeout(3000);
        await page.click('#login-button');
        
    });
    
    test.afterAll(async () => {
        await browser.close();
    });

    // Step 1: Verify the sorting order displayed for Z-A on the “All Items” page.
    test.skip('Test Case 1: Filter Sorting Order Z-A', async () => {
        await page.locator('.product_sort_container').selectOption('za');
        const productNames = await page.locator('.inventory_item_name').allTextContents();
        const sortedProductNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedProductNames); // Verify Z-A sorting
        await page.waitForTimeout(2000);
        // Continue with the rest of the steps...
    });
    // Step 2: Test Failed
    test('not yet ready', async () => {
        test.fail();
      });

    // Step 3: Test Fixed
    test.fixme('test to be fixed', async () => {
    });

    // Step 4: Test Slow
    test('slow test', async () => {
        test.slow();
    });

    // // Step 5: Test Only
    // test.only('focus this test', async () => {
    //     // Run only focused tests in the entire project
    // });

    // Step 6: Conditional Skip
    test('Conditional Skip', async ({ browserName }) => {
        test.skip(browserName === 'firefox', 'Still working on it');
    });
    
    
    // Step 7: Test Smoke Tags
    test('Test full report @smoke', async () => {
        // ...
    });

    // Step 8: Test Sanity Tags
    test('Test full report @sanity', async () => {
        // ...
    });

    // Step 9: Test Fast Tags
    test('Test full report @fast', async () => {
        // ...
    });

    // Step 10: Test Slow Tags
    test('Test full report @slow', async () => {
        // ...
    });



});