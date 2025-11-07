import { test as base } from '@playwright/test';
import { HomePage } from '../pages/specific-pages/HomePage';
import { ShopPage } from '../pages/specific-pages/ShopPage';
import { CartPage } from '../pages/specific-pages/CartPage';
import { CheckOutPage } from '../pages/specific-pages/CheckOutPage';

type MyFixtures = {
  homePage: HomePage;
  shopPage: ShopPage;
  cartPage: CartPage;
  checkOutPage: CheckOutPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage); 
  },

  shopPage: async ({ page }, use) => {
    const shopPage = new ShopPage(page);
    await use(shopPage); 
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage); 
  },

  checkOutPage: async ({ page }, use) => {
    const checkOutPage = new CheckOutPage(page);
    await use(checkOutPage); 
  },

});

export { expect } from '@playwright/test';
