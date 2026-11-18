import type { Locator, Page } from '@playwright/test';

// The site has no data-test attributes; locators use ids, classes and name attributes.
export class RegistrationPageLocators {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly consentCheckboxes: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    const form = page.locator('#customer-form');
    this.firstNameInput = form.locator('input[name="firstname"]');
    this.lastNameInput = form.locator('input[name="lastname"]');
    this.emailInput = form.locator('input[name="email"]');
    this.passwordInput = form.locator('input[name="password"]');
    this.consentCheckboxes = form.locator(
      'input[name="psgdpr"], input[name="customer_privacy"]',
    );
    this.saveButton = form.locator('button[data-link-action="save-customer"]');
  }
}
