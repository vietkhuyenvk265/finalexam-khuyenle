import { test, expect } from '../fixtures/base-fixture';
import { CartVerify } from '../verifies/cart-verify';

test('verify user can ddd multiple books to cart and verify total price calculation', async ({ homePage, shopPage, cartPage }) => {


  //Step 1.	Navigate to the "Shop" page
  await homePage.openAUT();
  await homePage.selectHeaderMenu('Shop');

  //Step 2.	Add two random books (each from a different category) by clicking "ADD TO BASKET" button for each
  const randomJsProduct = await shopPage.getRandomProductByCategory('JavaScript');
  const randomJsProductPrice = await shopPage.getProductPriceByName(randomJsProduct);
  await shopPage.addProductToBasket([randomJsProduct]);


  const randomHtmlProduct = await shopPage.getRandomProductByCategory('HTML');
  const randomHtmlProductPrice = await shopPage.getProductPriceByName(randomHtmlProduct);
  await shopPage.addProductToBasket([randomHtmlProduct]);

  //Step 3.	Verify that the cart icon displays the correct number of items (2).
  expect(await shopPage.isCartQuantityEqualTo('2 items')).toBeTruthy();

  //Step 4.	Verify that the cart subtotal equals the sum of the added book prices.
  const expectedSubtotal = randomJsProductPrice + randomHtmlProductPrice;
  expect(await shopPage.isCartSubTotalEqualTo(expectedSubtotal)).toBeTruthy();
  console.log('Expected Subtotal:', expectedSubtotal);

  //Step 5.	Click on the "Cart" icon in the header to open the Cart page.
  await shopPage.goToCart();

  //Step 6.	Verify that all added books appear in the cart with correct details (Product Name, Unit Price, Quantity).
  const cartVerify = new CartVerify(cartPage);

  cartVerify.verifyProductInCart(randomJsProduct, randomJsProductPrice, 1);
  cartVerify.verifyProductInCart(randomHtmlProduct, randomHtmlProductPrice, 1);

  //Step 7.	Verify price calculations:
  //VP1. Subtotal = Sum of all item prices × quantity.
  expect(await cartPage.getCartSubTotal()).toBe(expectedSubtotal);

  //VP2. Tax is displayed (if applicable).  

  const tax = await cartPage.getCartTax();
  expect(tax).toBeGreaterThanOrEqual(0);

  //VP3. Total = Subtotal + Tax (if any).
  expect(await cartPage.getCartTotal()).toBe(expectedSubtotal + tax);
  console.log('Cart Tax:', tax);
  console.log('Cart Total:', await cartPage.getCartTotal());

});