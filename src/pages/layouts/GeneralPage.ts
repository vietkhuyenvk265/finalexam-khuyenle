import { Locator } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class GeneralPage extends AbstractPage {
  protected headerMenu = (menuName: string) => this.page.locator(`//ul[@id="main-nav"]//a[.="${menuName}"]`);
  protected readonly cartQuantityLabel = this.page.locator('//li[@id="wpmenucartli"]//span[@class="cartcontents"]');
  protected readonly cartTotalLabel = this.page.locator('//li[@id="wpmenucartli"]//span[@class="amount"]');
  protected readonly cartLink = this.page.locator('//li[@id="wpmenucartli"]');

  public async selectHeaderMenu(menu: string) {
    await this.headerMenu(menu).click();
  }

  public async goToCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('load');
  }

  public async isCartQuantityEqualTo(expectedQuantity: string): Promise<boolean> {
    await this.cartQuantityLabel.waitFor({ state: 'visible', timeout: 5000 });
    //Sometimes, the cart still not updated immediately after adding products, so we need to wait a bit
    await this.page.waitForTimeout(1000);
    const actualQuantity = await this.cartQuantityLabel.textContent();
    return actualQuantity?.trim() === expectedQuantity;
  }

  public async isCartSubTotalEqualTo(expectedTotal: number): Promise<boolean> {
    await this.cartTotalLabel.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(1000);
    const actualTotal = await this.cartTotalLabel.textContent();
    const numericText = actualTotal?.replace(/[^0-9.-]+/g, '');
    const actualTotalNumber = numericText ? parseFloat(numericText) : 0;
    return actualTotalNumber === expectedTotal;
  }
}