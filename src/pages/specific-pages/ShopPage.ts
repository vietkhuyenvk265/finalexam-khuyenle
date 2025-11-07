import { GeneralPage } from '../layouts/GeneralPage';
import { logger } from '../../helpers/logger-helper';

export class ShopPage extends GeneralPage {
    protected productLocator = (product: string) => this.page.locator(`//a[h3='${product}']`);
    protected addProductButton = (product: string) => this.page.locator(`//a[h3='${product}']/following-sibling::a[.='Add to basket']`);

    public async addProductToBasket(product: string[]) {
        for (const item of product) {
            await this.addProductButton(item).click();
            logger.info(`Product ${item} is added to basket`);
            
        }
    }

}