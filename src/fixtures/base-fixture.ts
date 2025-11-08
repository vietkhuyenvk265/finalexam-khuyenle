import { test as base } from '@playwright/test';
import { HomePage } from '../pages/specific-pages/HomePage';
import { ShopPage } from '../pages/specific-pages/ShopPage';
import { CartPage } from '../pages/specific-pages/CartPage';

type MyFixtures = {
  homePage: HomePage;
  shopPage: ShopPage;
  cartPage: CartPage;
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


});

export { expect } from '@playwright/test';
