import { test as base } from '@playwright/test';
import { HomePage } from '../pages/specific-pages/HomePage';
import { MyAccountPage } from '../pages/specific-pages/MyAccountPage';

type MyFixtures = {
  homePage: HomePage;
  myAccountPage: MyAccountPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage); 
  },

  myAccountPage: async ({ page }, use) => {
    const myAccountPage = new MyAccountPage(page);
    await use(myAccountPage); 
  },
});

export { expect } from '@playwright/test';
