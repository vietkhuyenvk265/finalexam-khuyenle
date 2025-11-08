import { test, expect } from '../fixtures/base-fixture'; 
import { CartVerify } from '../verifies/cart-verify';

test('verify user can ddd multiple books to cart and verify total price calculation', async ({ homePage, shopPage, cartPage }) => {

  const product1 = ['Functional Programming in JS', '250.00', '1'];
  const product2 = ['HTML5 WebApp Develpment', '180.00', '1'];

  //Step 1.	Navigate to the "Shop" page
  await homePage.openAUT();
  await homePage.selectHeaderMenu('Shop');

  //Step 2.	Add two random books (each from a different category) by clicking "ADD TO BASKET" button for each
  await shopPage.addProductToBasket([product1[0], product2[0]]);

  //Step 3.	Verify that the cart icon displays the correct number of items (2).
  expect(await shopPage.isCartQuantityEqualTo('2 items')).toBeTruthy();

  //Step 4.	Verify that the cart subtotal equals the sum of the added book prices.
  //expect(await shopPage.isCartQuantityEqualTo('430.00')).toBeTruthy();

  //Step 5.	Click on the "Cart" icon in the header to open the Cart page.
  await shopPage.goToCart();

  //Step 6.	Verify that all added books appear in the cart with correct details (Product Name, Unit Price, Quantity).
  const cartVerify = new CartVerify(cartPage);

  cartVerify.verifyProductInCart(product1[0], product1[1], product1[2]);
  cartVerify.verifyProductInCart(product2[0], product2[1], product2[2]);

  //Step 7.	Verify price calculations:
    //VP1. Subtotal = Sum of all item prices × quantity.
  expect(await cartPage.getCartSubTotal()).toBe('₹430.00');
    
    //VP2. Tax is displayed (if applicable).  
  
  expect(await cartPage.getCartTax()).toBe('₹8.60');
  
    //VP3. Total = Subtotal + Tax (if any).
  expect(await cartPage.getCartTotal()).toBe('₹438.60');
  

  


});