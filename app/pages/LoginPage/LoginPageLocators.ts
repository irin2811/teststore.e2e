import type { Locator, Page } from '@playwright/test';

// The site has no data-test attributes; locators use ids, classes and name attributes.
export class LoginPageLocators {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorAlert: Locator;
  readonly createAccountLink: Locator;
  readonly loggedInAccountLink: Locator;

  constructor(page: Page) {
    const form = page.locator('#login-form');
    this.emailInput = form.locator('input[name="email"]');
    this.passwordInput = form.locator('input[name="password"]');
    this.signInButton = form.locator('#submit-login');
    this.errorAlert = page.locator('.alert.alert-danger');
    this.createAccountLink = page.locator('.no-account a');
    this.loggedInAccountLink = page.locator('#_desktop_user_info a.account');
  }
}
