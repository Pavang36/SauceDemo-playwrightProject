import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

  private cartTitle: Locator;
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;
  private cartItems: Locator;
  private productName: Locator;
  private productPrice: Locator;

  constructor(page: Page) {
    super(page);

    this.cartTitle = page.locator('.title');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.productName = page.locator('.inventory_item_name');
    this.productPrice = page.locator('.inventory_item_price');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartItems = page.locator('.cart_item');
  }

  async verifyCartPageLoaded() {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async verifyCartHasItems() {
    await expect(this.cartItems).toHaveCount(1);
  }

  async validateProductDetails() {
    const name = await this.productName.textContent();
    const price = await this.productPrice.textContent();

    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();

    console.log('Product Name:', name);
    console.log('Product Price:', price);
  }

  async getAllCartProducts() {
  const names = await this.productName.allTextContents();
  const prices = await this.productPrice.allTextContents();

  return {
    product_names: names.join(' | '),
    product_prices: prices.join(' | ')
  };
}

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}