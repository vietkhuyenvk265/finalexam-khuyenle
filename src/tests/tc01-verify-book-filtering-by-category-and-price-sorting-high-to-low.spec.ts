import { test, expect } from '../fixtures/base-fixture';
import { UtilsHelper } from '../helpers/utils-helper';

test('verify book filtering by category and price sorting_high to low',
  async ({ homePage, shopPage}) => {

    const filterCategory = 'HTML';
    //Step 1. Navigate to the "Shop" page
    await homePage.openAUT();
    await homePage.selectHeaderMenu('Shop');

    //Step 2. Click on the "HTML" category
    await shopPage.selectFilterCategory(filterCategory);

    //Step 3. From the "Sort by" dropdown, select "Sort by price: high to low"
    await shopPage.sortProductsBy('Sort by price: high to low');

    //Step 4. Verify the results as described below 
      //VP1: The page URL contains "?orderby=price-desc"
    expect(await shopPage.assertUrlContains('orderby=price-desc'));

      //VP2: The displayed book prices are sorted in descending order (highest to lowest)
    const prices = await shopPage.getAllProductPrices();
    expect(UtilsHelper.isSortedHighToLow(prices)).toBeTruthy();

      //VP3: All displayed books belong to the "HTML" category (titles contain "HTML")
    expect(await shopPage.areAllProductsContainedKeyword(filterCategory)).toBeTruthy();

  });