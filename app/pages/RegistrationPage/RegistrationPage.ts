import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { RegistrationPageLocators } from './RegistrationPageLocators';
import type { RegistrationData } from './RegistrationPage.types';

export class RegistrationPage extends BasePage {
  url = '/index.php?controller=registration';

  private readonly locators: RegistrationPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new RegistrationPageLocators(page);
  }

  async register(user: RegistrationData): Promise<void> {
    await this.locators.firstNameInput.fill(user.firstName);
    await this.locators.lastNameInput.fill(user.lastName);
    await this.locators.emailInput.fill(user.email);
    await this.locators.passwordInput.fill(user.password);
    for (const checkbox of await this.locators.consentCheckboxes.all()) {
      await checkbox.check();
    }
    await this.locators.saveButton.click();
  }
}
