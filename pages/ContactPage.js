import { expect } from '@playwright/test';
export class ContactPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  static contactPageUrl = /.*kontakt.*/;

  constructor(page) {
    this.page = page;

    this.companyNameText = 'LEX4YOU Skwierczyńska sp.k.';
    this.companyPostCodeAndCityText = '93-119 Łódź';
    this.companyStreetText = 'ul. Nieszawska 20/26';
    this.companyNipText = 'NIP: 7282887146';
    this.companyRegonText = 'REGON: 529136968';
    this.companyKrsText = 'KRS: 0001115679';
    this.officeEmailText = 'biuro@lex4you.pl';
    this.officePhoneText = '42 235 30 80';
    this.accountingEmailText = 'ksiegowosc@lex4you.pl';
    this.accountingPhoneText = '42 235 30 90';
    this.workingHoursText = 'Poniedziałek – piątek (8.00 – 15.00)';
    this.emptyFormFieldErrorText = 'Pole obowiązkowe';
    this.formFieldErrorColor = 'rgb(255, 0, 0)';
    this.incorrectEmailFormatErrorText = 'Wpisz prawidłowy mail, aby wysłać wiadomość.';

    this.sendFormButton = page.locator('#gform_submit_button_1');
    this.nameInput = page.locator('#input_1_2');
    this.surnameInput = page.locator('#input_1_3');
    this.emailInput = page.locator('#input_1_5');
    this.phoneInput = page.locator('#input_1_16');
    this.messageInput = page.locator('#input_1_1');
    this.nameInputError = page.locator('#validation_message_1_2');
    this.emailInputError = page.locator('#validation_message_1_5');
    this.phoneInputError = page.locator('#validation_message_1_16');
    this.messageInputError = page.locator('#validation_message_1_1');
    this.successMessage = page.locator('#gform_confirmation_message_1, .gform_confirmation_message');
  }

  async clickSubmit() {
    await this.sendFormButton.click();
  }

  async verifyFormNotSent() {
    await expect(this.successMessage).not.toBeVisible();
    await expect(this.page).toHaveURL(ContactPage.contactPageUrl);
  }

  async fillContactForm(name, surname, email, phone, message) {
    await this.nameInput.clear();
    await this.nameInput.fill(name);

    await this.surnameInput.clear();
    await this.surnameInput.fill(surname);

    await this.emailInput.clear();
    await this.emailInput.fill(email);

    await this.phoneInput.clear();
    await this.phoneInput.fill(phone);

    await this.messageInput.clear();
    await this.messageInput.fill(message);
  }
}
