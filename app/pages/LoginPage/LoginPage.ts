import { expect, type Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LoginPageLocators } from './LoginPageLocators';

export class LoginPage extends BasePage {
  url = '/index.php?controller=authentication';

  private readonly locators: LoginPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginPageLocators(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.locators.emailInput.fill(email);
    await this.locators.passwordInput.fill(password);
    await this.locators.signInButton.click();
  }

  /** Waits for the login attempt to resolve and reports whether it succeeded. */
  async isLoginSuccessful(): Promise<boolean> {
    await this.locators.loggedInAccountLink
      .or(this.locators.errorAlert)
      .first()
      .waitFor();
    return this.locators.loggedInAccountLink.isVisible();
  }

  /** Waits for the page to settle after registration and reports whether the user is signed in. */
  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForLoadState('load');
    return this.locators.loggedInAccountLink.isVisible();
  }

  async goToRegistration(): Promise<void> {
    await this.locators.createAccountLink.click();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.locators.signInButton).toBeVisible();
  }

  async expectAuthenticationError(): Promise<void> {
    await expect(this.locators.errorAlert).toContainText(
      'Authentication failed',
    );
  }
}
