import { GeneralPage } from '../layouts/GeneralPage';
import { logger } from '../../helpers/logger-helper';

export class CartPage extends GeneralPage {
    private readonly checkOutButton = this.page.locator('//a[contains(@class,"checkout-button")]');
    private productLink = (product: string) => this.page.locator(`//td[@class="product-name"]/a[.='${product}']`);

    
    public async isProductExisted(product: string): Promise<boolean> {
        return await this.productLink(product).isVisible({timeout: 5000});
    }

    public async proceedCheckOut() {
        await this.checkOutButton.click();
    }



}