import { test, expect } from '../fixtures/base-fixture';

test('user can login and logout', async ({ homePage, shopPage, cartPage }) => {

  await homePage.openAUT();
  await homePage.selectHeaderMenu('Shop');

  const products = ['Android Quick Start Guide', 'Functional Programming in JS'];
  await shopPage.addProductToBasket(products);

  await shopPage.goToCart();
  expect(await cartPage.isProductExisted('Android Quick Start Guide')).toBeTruthy();
  expect(await cartPage.isProductExisted('Functional Programming in JS')).toBeTruthy();

});