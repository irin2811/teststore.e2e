import { expect, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MyAccountPageLocators } from './MyAccountPageLocators';

export class MyAccountPage extends BasePage {
  url = '/index.php?controller=my-account';

  private readonly locators: MyAccountPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new MyAccountPageLocators(page);
  }

  async signOut(): Promise<void> {
    await this.locators.signOutLink.click();
  }

  async expectLoggedIn(fullName: string): Promise<void> {
    await expect(this.locators.accountLink).toContainText(fullName);
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.locators.signInLink).toBeVisible();
    await expect(this.locators.signOutLink).toHaveCount(0);
  }
}
