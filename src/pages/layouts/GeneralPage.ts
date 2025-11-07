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
    await this.cartLink.click();
  }
}