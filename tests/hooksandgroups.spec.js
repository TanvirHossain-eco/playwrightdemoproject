const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

// test.describe.configure({ mode: 'parallel' });
test.describe('Hooks and Groups', () => {
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

    // test('Test Case 1: Login', async () => {
    //     await page.waitForTimeout(3000);
    //     await page.fill('#user-name', 'standard_user');
    //     await page.fill('#password', 'secret_sauce');
    //     await page.waitForTimeout(3000);
    //     await page.click('#login-button');
    //     await page.waitForTimeout(3000);
    //     // Verify login success...
    // });

    test('Test Case 2: Products Filtering', async () => {
        await page.locator('.product_sort_container').selectOption('za');
        const productNames = await page.locator('.inventory_item_name').allTextContents();
        const sortedProductNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedProductNames); // Verify Z-A sorting
        await page.waitForTimeout(2000);
        // Verify login success...
    });

    test('Test Case 3: Add to Cart', async () => {
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.waitForTimeout(3000);
        await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
        // Verify the item is added to the cart
        // await page.locator('.shopping_cart_link').click();
        // const cartItems = await page.locator('.cart_item').count();
        // expect(cartItems).toBe(2); // Verify that 2 items are in the cart
        // await page.waitForTimeout(2000);
    });

    test('Test Case 4: Logout', async () => {
        await page.locator('.shopping_cart_link').click();
        await page.waitForTimeout(3000);
        await page.locator('#continue-shopping').click();
        await page.waitForTimeout(3000);
        await page.locator('#react-burger-menu-btn').click();
        await page.waitForTimeout(1000);
        await page.locator('#logout_sidebar_link').click();   
    });
});