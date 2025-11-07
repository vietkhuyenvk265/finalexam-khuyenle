import { GeneralPage } from '../layouts/GeneralPage';
import { logger } from '../../helpers/logger-helper';

export class CartPage extends GeneralPage {
    protected productLink = (product: string) => this.page.locator(`//td[@class="product-name"]/a[.='${product}']`);

    public async isProductExisted(product): Promise<boolean> {
        return await this.productLink(product).isVisible();
    }



}