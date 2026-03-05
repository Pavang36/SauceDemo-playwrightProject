import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {

  async validateSuccessMessage() {
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }

  async backToHome() {
    await this.page.getByRole('button', { name: 'Back Home' }).click();
  }
}