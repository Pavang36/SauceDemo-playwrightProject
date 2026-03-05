import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CheckoutOverviewPage extends BasePage {

  private overviewTitle: Locator;
  private finishButton: Locator;
  private cancelButton: Locator;
  private paymentInfo:Locator;
  private shippingInfo:Locator;
  private itemTotal: Locator;
  private tax: Locator;
  private total: Locator;


  constructor(page: Page) {
    super(page);

    this.overviewTitle = page.locator('.title');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
  }

  async verifyOverviewPageLoaded() {
    await expect(this.overviewTitle).toHaveText('Checkout: Overview');
  }

   async captureCheckoutSummary() {
    
    const paymentInfoText = await this.paymentInfo.textContent();
    const shippingInfoText = await this.shippingInfo.textContent();
    const itemTotalText = await this.itemTotal.textContent();
    const taxText = await this.tax.textContent();
    const totalText = await this.total.textContent();

      return {
    payment_info: paymentInfoText?.replace('Payment Information: ', '').trim(),
    shipping_info: shippingInfoText?.replace('Shipping Information: ', '').trim(),
    item_total: itemTotalText?.replace('Item total: ', '').trim(),
    tax: taxText?.replace('Tax: ', '').trim(),
    total: totalText?.replace('Total: ', '').trim()
  }
   };
  async clickFinish() {
    await this.finishButton.click();
  }
}