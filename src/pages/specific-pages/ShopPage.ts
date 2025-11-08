import { GeneralPage } from '../layouts/GeneralPage';
import { logger } from '../../helpers/logger-helper';

export class ShopPage extends GeneralPage {
    private addProductButton = (product: string) => this.page.locator(`//a[h3='${product}']/following-sibling::a[.='Add to basket']`);
    private filterCategory = (category: string) => this.page.locator(`//ul[@class="product-categories"]//a[.="${category}"]`);
    private readonly sortByDropdown = this.page.locator('select[name="orderby"]');
    private readonly productNames = this.page.locator('//h3');
    private readonly productPrices = this.page.locator('//span[@class="woocommerce-Price-amount amount"]');

    public async addProductToBasket(product: string[]) {
        for (const item of product) {
            await this.page.waitForLoadState('load');
            await this.addProductButton(item).click();
            logger.info(`Product ${item} is added to basket`);
        }
    }

    public async selectFilterCategory(category: string) {
        await this.filterCategory(category).click();
        logger.info(`Filter applied for category: ${category}`);

    }

    public async sortProductsBy(option: string) {
        await this.sortByDropdown.selectOption({ label: option });
        logger.info(`Products sorted by: ${option}`);
    }

    public async getAllProductNames(): Promise<string[]> {
        await this.page.waitForLoadState('load');
        const productNamesList = await this.productNames.allTextContents()
        return productNamesList;
    }

    public async areAllProductsContainedKeyword(keyword: string): Promise<boolean> {
        const productNamesList = await this.getAllProductNames();
        logger.info(`List of product names: ${productNamesList.join(', ')}`);
        return productNamesList.every(name => name.includes(keyword));
    }

    public async getAllProductPrices(): Promise<number[]> {
        await this.page.waitForLoadState('load');
        const priceTexts = await this.productPrices.allTextContents();  
        const prices = priceTexts.map(text => {
            const numericText = text.replace(/[^0-9.-]+/g, ''); 
            return parseFloat(numericText);
        });
        return prices;
    }

}