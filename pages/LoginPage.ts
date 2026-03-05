import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    await this.navigate('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await this.page.waitForURL('**/inventory.html');
    await expect(this.page).toHaveURL(/inventory/);
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('Epic sadface');
  }
}