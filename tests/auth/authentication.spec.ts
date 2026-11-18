import { test } from '@fixtures';
import { createUniqueUser } from '@data/users';

test.describe('User authorization', { tag: ['@e2e', '@auth'] }, () => {
  test('[E2E-AUTH-01] registered user can sign in and sign out', async ({
    registrationPage,
    loginPage,
    myAccountPage,
  }) => {
    // The shop has no seeded account, so register a fresh user via the UI.
    const user = createUniqueUser();
    await registrationPage.open();
    await registrationPage.register(user);
    await myAccountPage.expectLoggedIn(`${user.firstName} ${user.lastName}`);

    await myAccountPage.signOut();
    await myAccountPage.expectLoggedOut();

    await loginPage.open();
    await loginPage.login(user.email, user.password);
    await myAccountPage.expectLoggedIn(`${user.firstName} ${user.lastName}`);
  });

  test('[E2E-AUTH-03] existing user can sign in with valid credentials', async ({
    registeredUser,
    loginPage,
    myAccountPage,
  }) => {
    await loginPage.open();
    await loginPage.login(registeredUser.email, registeredUser.password);
    await myAccountPage.expectLoggedIn(
      `${registeredUser.firstName} ${registeredUser.lastName}`,
    );
  });

  test('[E2E-AUTH-04] signed-in user can sign out after login', async ({
    registeredUser,
    loginPage,
    myAccountPage,
  }) => {
    await loginPage.open();
    await loginPage.login(registeredUser.email, registeredUser.password);
    await myAccountPage.expectLoggedIn(
      `${registeredUser.firstName} ${registeredUser.lastName}`,
    );
    await myAccountPage.signOut();
    await myAccountPage.expectLoggedOut();
  });

  test('[E2E-AUTH-02] sign in with wrong password shows an error', async ({
    loginPage,
  }) => {
    await loginPage.open();
    await loginPage.login('nobody@example.com', 'WrongPass123');
    await loginPage.expectAuthenticationError();
  });
});
