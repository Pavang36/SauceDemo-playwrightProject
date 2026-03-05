import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private cancelButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillCheckoutInfo(data: {
  firstName: string;
  lastName: string;
  postalCode: string;
}) {
  await this.page.getByPlaceholder('First Name').fill(data.firstName);
  await this.page.getByPlaceholder('Last Name').fill(data.lastName);
  await this.page.getByPlaceholder('Zip/Postal Code').fill(data.postalCode);
}

  async clickContinue() {
    await this.continueButton.click();
  }

  async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
  }
}