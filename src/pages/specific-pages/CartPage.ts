import { GeneralPage } from '../layouts/GeneralPage';

export class CartPage extends GeneralPage {
    private readonly cartSubtotal = this.page.locator('//tr[@class="cart-subtotal"]/td/span');
    private readonly cartTax = this.page.locator('//tr[contains(@class,"tax-rate")]/td/span');
    private readonly cartTotal = this.page.locator('//tr[@class="order-total"]/td/strong/span');
    private productLink = (product: string) => this.page.locator(`//td[@class="product-name"]/a[.="${product}"]`);
    private productPrice = (product: string) => this.page.locator(`//td[@class="product-name"]/a[.='${product}']/ancestor::tr/td[@class="product-price"]/span`);
    private productQuantity = (product: string) => this.page.locator(`//td[@class="product-name"]/a[.='${product}']/ancestor::tr/td[@class="product-quantity"]//input`);

    
    public async isProductExisted(product: string): Promise<boolean> {
        return await this.productLink(product).isVisible({timeout: 5000});
    }

    public async getProductPrice(product: string): Promise<string> {
        return await this.productPrice(product).textContent() ?? '';
    }

    public async getProductQuantity(product: string): Promise<string> {
        return await this.productQuantity(product).inputValue() ?? '';
    }   

    public async getCartSubTotal(): Promise<number> {
        const cartSubtotalText = await this.cartSubtotal.textContent() ?? '';
        const numericText = cartSubtotalText.replace(/[^0-9.-]+/g, ''); 
        return parseFloat(numericText);
    }

    public async getCartTax(): Promise<number> {
        const cartTaxText = await this.cartTax.textContent() ?? '';
        const numericText = cartTaxText.replace(/[^0-9.-]+/g, ''); 
        return parseFloat(numericText);
    }

    public async getCartTotal(): Promise<number> {
        const cartTotalText = await this.cartTotal.textContent() ?? '';
        const numericText = cartTotalText.replace(/[^0-9.-]+/g, ''); 
        return parseFloat(numericText);
    }
}