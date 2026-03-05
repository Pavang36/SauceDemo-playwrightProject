import { test } from '../fixtures/test-fixtures';
import loginData from '../test-data/loginData.json';

type LoginData = {
  type: string;
  username: string;
  password: string;
};

const users = loginData as LoginData[];

for (const user of users) {

  test(`Login Test - ${user.type}`, async ({ loginPage, inventoryPage }) => {

    await loginPage.open();
    await loginPage.login(user.username, user.password);

    if (user.type === 'valid') {
      await loginPage.verifyLoginSuccess();
      await inventoryPage.verifyInventoryPageLoaded();
    } else {
      await loginPage.verifyLoginError();
    }

  });

}