import { test } from '@playwright/test';
import checkoutData from '../test-data/checkoutData.json';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { writeFinalExcel } from  '../utils/excelUtil'
import loginData from '../test-data/loginData.json'

test.describe('SauceDemo End-to-End Flow - Multi User Single Test', () => {

  test('E2E Flow - 2 Users in One Test', async ({ page }) => {

    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkoutInfo = new CheckoutInformationPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);

    const excelRows: any[] = [];

    const user1 = checkoutData[0];

    const validUser = loginData.find(user => user.type === 'valid');

    await page.goto('https://www.saucedemo.com/');
    
     if (!validUser) {
      throw new Error('Valid user not found in loginData.json');
       }
    await login.login(validUser.username, validUser.password);
    await page.waitForURL('**/inventory.html');

    await inventory.selectSorting('za');

    await inventory.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventory.addProductToCart('Sauce Labs Bike Light');

    await inventory.verifyCartBadgeCount('2');
    await inventory.openCart();

    const cartProducts1 = await cart.getAllCartProducts();

    await cart.clickCheckout();
    await checkoutInfo.fillCheckoutInfo(user1);
    await checkoutInfo.clickContinue();

    const summary1 = await overview.captureCheckoutSummary();
    
    console.log('Cart Products:', await cart.getAllCartProducts());
    excelRows.push({
      ...cartProducts1,
      ...summary1
    });

    await overview.clickFinish();
    await complete.validateSuccessMessage();
    await complete.backToHome();

    const user2 = checkoutData[1];

    await page.waitForURL('**/inventory.html');
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.verifyCartBadgeCount('1');
    await inventory.openCart();

    const cartProducts2 = await cart.getAllCartProducts();

    await cart.clickCheckout();
    await checkoutInfo.fillCheckoutInfo(user2);
    await checkoutInfo.clickContinue();

    const summary2 = await overview.captureCheckoutSummary();

    excelRows.push({
      ...cartProducts2,
      ...summary2
    });

    await overview.clickFinish();
    writeFinalExcel(excelRows, test.info().project.name);

  });

});