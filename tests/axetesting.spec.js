const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');
// Import AXE-core library for accessibility testing
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility testing demo using Playwright and Axe', () => {

  let browser;
  let page;

  // Set up the browser and page before all tests
  test.beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();

    // Navigate to the site and perform login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Wait for inventory page to load
    // await page.waitForURL('https://www.saucedemo.com/inventory.html');
  });

  // Close the browser after all tests are done
  test.afterAll(async () => {
    await browser.close();
  });

  // Test for accessibility on the products page
  test('Products Page Accessibility Scan', async () => {
    const axeScanResults1 = await new AxeBuilder({page})
    // .include('#react-burger-menu-btn')
    // .disableRules(['empty-heading', 'heading-order'])
    .analyze();

    // Attach the accessibility scan results
    test.info().attach('axe-scan-results', {
      body: JSON.stringify(axeScanResults1, null, 2),
      contentType: 'application/json'
    });

    // Assert no accessibility violations
    expect(axeScanResults1.violations).toEqual([]);
  });

  // Test for Z-A sorting and accessibility scan
  test('Filtering Z-A Accessibility Scan', async () => {
    // Select sorting option Z-A
    await page.locator('.product_sort_container').selectOption('za');
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedProductNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedProductNames); // Verify Z-A sorting

    // Perform AXE accessibility scan
    const axeScanResults2 = await new AxeBuilder({page})
    .analyze();

    // Attach the accessibility scan results
    test.info().attach('axe-scan-results-za', {
      body: JSON.stringify(axeScanResults2, null, 2),
      contentType: 'application/json'
    });

    // Assert no accessibility violations
    expect(axeScanResults2.violations).toEqual([]);
  });

  // Test for High-Low sorting and accessibility scan
  test('Filtering High-Low Accessibility Scan', async () => {
    // Select sorting option High-Low
    await page.locator('.product_sort_container').selectOption('hilo');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const cleanedPrices = prices.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...cleanedPrices].sort((a, b) => b - a);
    expect(cleanedPrices).toEqual(sortedPrices); // Verify High-Low sorting

    // Perform AXE accessibility scan
    const axeScanResults3 = await new AxeBuilder({page})
    .analyze();

    // Attach the accessibility scan results
    test.info().attach('axe-scan-results-hilo', {
      body: JSON.stringify(axeScanResults3, null, 2),
      contentType: 'application/json'
    });

    // Assert no accessibility violations
    expect(axeScanResults3.violations).toEqual([]);
  });

});


// Old Version Codes
// const { chromium } = require('playwright');
// // 1. Install the npm Playwright package
// const {test, expect} = require('@playwright/test');
// // 2. npm install @axe-core/playwright
// // 3. Import library
// const AxeBuilder = require('@axe-core/playwright').default;

// test.describe('Accessibility testing demo using Playwright', () => {

//     let browser;
//     let page;

//     test.beforeAll(async () => {
//         browser = await chromium.launch();
//         const context = await browser.newContext();
//         page = await context.newPage();
//         await page.goto('https://www.saucedemo.com/');
//         await page.fill('#user-name', 'standard_user');
//         await page.fill('#password', 'secret_sauce');
//         await page.locator('#login-button').click();
//         // await loginpage(page);
        
//     });
    
//     test.afterAll(async () => {
//         await browser.close();
//     });
    
//     // // Login Page Accessibility Testing
//     // test('Login Page Accessibility Scan', async ({page}, testInfo1) => {
//     //     await page.goto('https://www.saucedemo.com/');
//     //     // await page.fill('#user-name', 'standard_user');
//     //     // await page.fill('#password', 'secret_sauce');
//     //     // await page.locator('#login-button').click();
        
//     //     // 4.1. Full Page review
//     //     const axeScanResults1 = await new AxeBuilder({page})
//     //     // .disableRules(['empty-heading', 'heading-order'])
//     //     .analyze();

//     //     // 5.1. Attach Log
//     //     await testInfo1.attach('axe-scan-results1', {
//     //         body: JSON.stringify(axeScanResults1, null, 2),
//     //         contentType: 'application/json'
//     //     });

//     //     // 6.1. Assert
//     //     expect(axeScanResults1.violations).toEqual([]);
        
//     // });

//     // Products Page Accessibility Testing
//     test('Products Page Accessibility Scan', async ({page}, testInfo2) => {
//         // await page.goto('https://www.saucedemo.com/');
//         // await page.fill('#user-name', 'standard_user');
//         // await page.fill('#password', 'secret_sauce');
//         // await page.locator('#login-button').click();
//         // await page.locator('#react-burger-menu-btn').waitFor();
//         await page.waitForURL('https://www.saucedemo.com/inventory.html');
        
//         // 4.2. Full Page review
//         const axeScanResults2 = await new AxeBuilder({page})
//         // .include('#react-burger-menu-btn')
//         // .disableRules(['empty-heading', 'heading-order'])
//         .analyze();

//         // 5.2. Attach Log
//         await testInfo2.attach('axe-scan-results2', {
//             body: JSON.stringify(axeScanResults2, null, 2),
//             contentType: 'application/json'
//         });

//         // 6.2. Assert
//         expect(axeScanResults2.violations).toEqual([]);
        
//     });


//     // Filtering Z-A Accessibility Testing
    
//     test('Filtering Z-A Accessibility Scan', async ({page}, testInfo3) => {
//         // await page.goto('https://www.saucedemo.com/');
//         // await page.fill('#user-name', 'standard_user');
//         // // await page.fill('#password', 'secret_sauce');
//         // await page.locator('#login-button').click();
//         await page.locator('.product_sort_container').selectOption('za');
//         const productNames = await page.locator('.inventory_item_name').allTextContents();
//         const sortedProductNames = [...productNames].sort().reverse();
//         expect(productNames).toEqual(sortedProductNames); // Verify Z-A sorting
//         await page.waitForTimeout(2000);
//         // expect(page).toHaveScreenshot('z-a_filtering.png', { maxDiffPercentage: 50 }); // Z-A Filtering Visual Testing
//         // await page.waitForTimeout(3000);
//         // Continue with the rest of the steps...

//         // 4.3. Full Page review
//         const axeScanResults3 = await new AxeBuilder({page})
//         // .include('#react-burger-menu-btn')
//         // .disableRules(['empty-heading', 'heading-order'])
//         .analyze();

//         // 5.3. Attach Log
//         await testInfo3.attach('axe-scan-results3', {
//             body: JSON.stringify(axeScanResults3, null, 2),
//             contentType: 'application/json'
//         });

//         // 6.3. Assert
//         expect(axeScanResults3.violations).toEqual([]);

//     });

//     // Filtering High-Low Accessibility Testing
//     test('Filtering High-Low Accessibility Scan', async ({page}, testInfo4) => {
//         // await page.locator('#login-button').click();
//         await page.locator('.product_sort_container').selectOption('hilo');
//         const prices = await page.locator('.inventory_item_price').allTextContents();
//         const cleanedPrices = prices.map(price => parseFloat(price.replace('$', ''))); // removed the $ sign only
//         const sortedPrices = prices.map(p => parseFloat(p.replace('$', ''))).sort((a, b) => b - a);
//         expect(cleanedPrices).toEqual(sortedPrices); // Verify High-Low price sorting
//         // await page.waitForTimeout(2000);
//         // expect(page).toHaveScreenshot('hilo_filtering.png', { maxDiffPercentage: 50 }); // Hilo Filtering Visual Testing
//         await page.waitForTimeout(3000);
//         // Continue with the rest of the steps...

//         // 4.4. Full Page review
//         const axeScanResults4 = await new AxeBuilder({page})
//         // .include('#react-burger-menu-btn')
//         // .disableRules(['empty-heading', 'heading-order'])
//         .analyze();

//         // 5.4. Attach Log
//         await testInfo4.attach('axe-scan-results4', {
//             body: JSON.stringify(axeScanResults4, null, 2),
//             contentType: 'application/json'
//         });

//         // 6.4. Assert
//         expect(axeScanResults4.violations).toEqual([]);

        
//     });

//     // // Step 3: Add multiple items to the card 
//     // test('Test Case 3: Add Multiple Items to the cart', async () => {
//     //     await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
//     //     await page.waitForTimeout(3000);
//     //     await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
//     //     // Verify the item is added to the cart
//     //     await page.locator('.shopping_cart_link').click();
//     //     const cartItems = await page.locator('.cart_item').count();
//     //     expect(cartItems).toBe(2); // Verify that 2 items are in the cart
//     //     await page.waitForTimeout(2000);
//     //     expect(page).toHaveScreenshot('cart-page.png', { maxDiffPercentage: 50 }); // Cart Page Visual Testing
//     //     await page.waitForTimeout(3000);    
//     //     // Continue with the rest of the steps...
//     // });

//     // // Step 4: Validate Checkout Journey
//     // test('Test Case 4: Validate Checkout Journey', async () => {
//     //     await page.locator('.shopping_cart_link').click();
//     //     const cartBadge = await page.locator('.cart_item').count();
//     //     if (cartBadge === 0) {
//     //         console.log('Cart is empty, adding products...'); 
//     //         // Go to the product page
//     //         await page.locator('#continue-shopping').click();     
//     //         await page.waitForTimeout(3000); 
//     //         // Add two products to the cart
//     //         await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click(); // Add first item
//     //         await page.waitForTimeout(3000);
//     //         await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
//     //         // Navigate back to the cart page
//     //         await page.locator('.shopping_cart_link').click();
//     //         await page.waitForTimeout(3000);
//     //       } else {
//     //         console.log('Cart has items, proceeding with checkout...');
//     //       }
//     //     await page.locator('.checkout_button').click();
//     //     await page.waitForTimeout(3000);
//     //     await page.locator('#first-name').fill('Tanvir');
//     //     await page.locator('#last-name').fill('Sharif');
//     //     await page.locator('#postal-code').fill('12345');
//     //     await page.waitForTimeout(2000);
//     //     await page.locator('#continue').click();
//     //     const totalPrice = await page.locator('.summary_total_label').textContent();
//     //     expect(totalPrice).toContain('$'); // Verify total price is displayed
//     //     await page.waitForTimeout(2000);
//     //     expect(page).toHaveScreenshot('checkout-page.png', { maxDiffPercentage: 50 }); // Checkout Page Visual Testing
//     //     await page.waitForTimeout(3000);
//     //     await page.locator('#finish').click();
//     //     const successMessage = await page.locator('.complete-header').textContent();
//     //     expect(successMessage).toBe('Thank you for your order!'); // Verify order completion
//     //     await page.waitForTimeout(2000);
//     //     expect(page).toHaveScreenshot('order-completion.png', { maxDiffPercentage: 50 }); // Order Completion Visual Testing
//     //     await page.waitForTimeout(3000);
//     //     await page.locator('#back-to-products').click();
//     //     // await page.waitForTimeout(3000);
//     //     await page.locator('#react-burger-menu-btn').click();
//     //     await page.waitForTimeout(1000);
//     //     await page.locator('#logout_sidebar_link').click();    
//     //     // End the rest of the steps...
//     // });

// });