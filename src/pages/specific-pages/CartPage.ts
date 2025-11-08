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

    public async getCartSubTotal(): Promise<string> {
        return await this.cartSubtotal.textContent() ?? '';
    }

    public async getCartTax(): Promise<string> {
        return await this.cartTax.textContent() ?? '';
    }

    public async getCartTotal(): Promise<string> {
        return await this.cartTotal.textContent() ?? '';
    }
}