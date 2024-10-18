
// 1. Install the npm Playwright package
const {test, expect} = require('@playwright/test');
// 2. npm install @axe-core/playwright
// 3. Import library
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility testing demo using Playwright', () => {
    
    test('General Accessibility Scan Should Pass', async ({page}, testInfo) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.locator('#login-button').click();
        
        // 4. Full Page review
        const axeScanResults = await new AxeBuilder({page})
        // .disableRules(['empty-heading', 'heading-order'])
        .analyze();

        // 5. Attach Log
        await testInfo.attach('axe-scan-results', {
            body: JSON.stringify(axeScanResults, null, 2),
            contentType: 'application/json'
        });

        // 6. Assert
        expect(axeScanResults.violations).toEqual([]);
        
    });
})