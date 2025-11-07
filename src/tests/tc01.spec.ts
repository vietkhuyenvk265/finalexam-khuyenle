import { test, expect } from '../fixtures/base-fixture';

test('user can login and logout', async ({ homePage, shopPage, cartPage, checkOutPage }) => {

  const billingInfoPath = 'src/data/valid-billing.json';

  await homePage.openAUT();
  await homePage.selectHeaderMenu('Shop');

  const products = ['Android Quick Start Guide'];
  await shopPage.addProductToBasket(products);

  await shopPage.goToCart();
  expect(await cartPage.isProductExisted('Android Quick Start Guide')).toBeTruthy();

  await cartPage.proceedCheckOut();

  await checkOutPage.placeAnOrder(billingInfoPath,'Direct Bank Transfer');



  


});