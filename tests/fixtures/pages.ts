import { test as base } from '@playwright/test';
import { existingUser } from '@data/users';
import type { RegistrationData } from '@pages';
import { LoginPage, RegistrationPage, MyAccountPage } from '@pages';

type PageFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  myAccountPage: MyAccountPage;
  registeredUser: RegistrationData;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  // Ensures the user exists: try to sign in, and register only if that fails.
  registeredUser: async (
    { loginPage, registrationPage, myAccountPage, context },
    use,
  ) => {
    await loginPage.open();
    await loginPage.login(existingUser.email, existingUser.password);
    if (!(await loginPage.isLoginSuccessful())) {
      await registrationPage.open();
      await registrationPage.register(existingUser);
      if (!(await loginPage.isLoggedIn())) {
        // A parallel worker may have registered the same user first.
        await loginPage.open();
        await loginPage.login(existingUser.email, existingUser.password);
      }
      await myAccountPage.expectLoggedIn(
        `${existingUser.firstName} ${existingUser.lastName}`,
      );
    }
    // Start the test from a signed-out state.
    await context.clearCookies();
    await use(existingUser);
  },
});

export { expect } from '@playwright/test';
