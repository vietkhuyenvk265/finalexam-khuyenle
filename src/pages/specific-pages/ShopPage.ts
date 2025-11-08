import { GeneralPage } from '../layouts/GeneralPage';
import { logger } from '../../helpers/logger-helper';

export class ShopPage extends GeneralPage {
    private productLocator = (product: string) => this.page.locator(`//a[h3='${product}']`);
    private addProductButton = (product: string) => this.page.locator(`//a[h3='${product}']/following-sibling::a[.='Add to basket']`);
    private readonly sortByDropdown = this.page.locator('select[name="orderby"]');

    public async addProductToBasket(product: string[]) {
        for (const item of product) {
            await this.addProductButton(item).click();
            logger.info(`Product ${item} is added to basket`);
        }
    }

    public async sortProductsBy(option: string) {
        await this.sortByDropdown.selectOption({ label: option });
    }

}