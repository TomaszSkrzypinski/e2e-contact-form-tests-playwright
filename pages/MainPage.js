import { expect } from '@playwright/test';
import { ContactPage } from './ContactPage.js';

export class MainPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.baseUrl = 'https://lex4you.pl';
    this.title = 'Lex4you - Kancelaria prawnopodatkowa';

    // Locators
    this.rejectCookiesBtn = page.locator('#CybotCookiebotDialogBodyButtonDecline');
    this.contactMenuLink = page.getByLabel('Główne menu').getByRole('link', { name: 'Kontakt' });
  }

  // Actions (methods)
  async goToContactPage() {
    await this.page.goto(this.baseUrl);

    if (await this.rejectCookiesBtn.isVisible({ timeout: 3000 })) {
      await this.rejectCookiesBtn.click();
    }

    await this.contactMenuLink.click();
    await expect(this.page).toHaveURL(ContactPage.contactPageUrl);
  }
}
