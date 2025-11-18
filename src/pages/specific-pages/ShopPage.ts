import { GeneralPage } from '../layouts/GeneralPage';
import { logger } from '../../helpers/logger-helper';
import { UtilsHelper } from '../../helpers/utils-helper';

export class ShopPage extends GeneralPage {
    private addProductButton = (product: string) => this.page.locator(`//a[h3='${product}']/following-sibling::a[.='Add to basket']`);
    private filterCategory = (category: string) => this.page.locator(`//ul[@class="product-categories"]//a[.="${category}"]`);
    private specificProductPrice = (productName: string) => this.page.locator(`//a[h3='${productName}']//span[@class="woocommerce-Price-amount amount"]`).last();
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

    public async getRandomProductByCategory(category: string): Promise<string> {
        await this.selectFilterCategory(category);
        const productNamesList = await this.getAllProductNames();
        const randomProduct = UtilsHelper.getRandomElement(productNamesList); 
        if (randomProduct) {
            logger.info(`Random product in category "${category}" is ${randomProduct}`);   
            return randomProduct;
        }
        throw new Error(`No products found in category "${category}".`);
    }

    public async getProductPriceByName(productName: string): Promise<number> {
        const priceText = await this.specificProductPrice(productName).textContent();
        if (priceText) {
            const numericText = priceText.replace(/[^0-9.-]+/g, '');
            const price = parseFloat(numericText);
            logger.info(`Price of product "${productName}" is ${price}`);
            return price;
        }
        throw new Error(`Price not found for product "${productName}".`);
    }
}