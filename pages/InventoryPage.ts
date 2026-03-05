import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

  private pageTitle: Locator;
  private sortDropdown: Locator;
  private shoppingCartIcon: Locator;
  private menuButton: Locator;
  private logoutLink: Locator;
  private firstAddToCartButton: Locator;
  private cartBadge: Locator;
  private secondAddToCartButton: Locator;


  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.shoppingCartIcon = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.firstAddToCartButton = page.locator('.inventory_item button').first();
    this.secondAddToCartButton = page.locator('.inventory_item button').nth(1);
    this.cartBadge = page.locator('.shopping_cart_badge');

    
  }

  async verifyInventoryPageLoaded() {
    await expect(this.pageTitle).toHaveText('Products');
  }

   async selectSorting(value: string) {
    await expect(this.sortDropdown).toBeVisible();
    await this.sortDropdown.selectOption({ value });
  }

private getAddToCartButton(productName: string): Locator {
  const formattedName = productName
    .toLowerCase()
    .replace(/ /g, '-');

  return this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
}

  async addProductToCart(productName: string) {
    await this.getAddToCartButton(productName).click();
  }
  


  async verifyCartBadgeCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async openCart() {
    await this.shoppingCartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}