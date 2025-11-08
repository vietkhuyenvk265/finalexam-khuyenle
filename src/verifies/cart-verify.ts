import { GeneralPage } from '../pages/layouts/GeneralPage';
import { logger } from '../helpers/logger-helper';
import { CartPage } from '../pages/specific-pages/CartPage';

export class CartVerify {
    private cartPage: CartPage;
    constructor(cartPage: CartPage) {
        this.cartPage = cartPage;
    }

    public async verifyProductInCart(product: string, price: string, quantity: string): Promise<void> {
        const isProductExist = await this.cartPage.isProductExisted(product);
        if (!isProductExist) {
            throw new Error(`Product with title "${product}" is not found in the cart.`);
        }   
        else {
            const actualPrice = await this.cartPage.getProductPrice(product);
            const actualQuantity = await this.cartPage.getProductQuantity(product);

            if (!actualPrice.trim().includes(price.trim())) {
                throw new Error(`Price mismatch for product "${product}". Expected: "${price}", Actual: "${actualPrice}"`);
            }

            if (actualQuantity !== quantity) {
                throw new Error(`Quantity mismatch for product "${product}". Expected: "${quantity}", Actual: "${actualQuantity}"`);
            }
            logger.info(`Product "${product}" is verified in the cart with correct price and quantity.`);       
        }
    }
}
