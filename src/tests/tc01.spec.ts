import { test, expect } from '../fixtures/base-fixture';

test('user can login and logout', async ({ homePage, myAccountPage }) => {

  await homePage.openAUT();
  await homePage.assertUrlContains('automationtesting');
});