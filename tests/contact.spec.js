// @ts-check
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage.js';
import { ContactPage } from '../pages/ContactPage.js';

/** @type {MainPage} */
let mainPage;
/** @type {ContactPage} */
let contactPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  contactPage = new ContactPage(page);

  await mainPage.goToContactPage();
});

test('should display all company contact details correctly', async () => {
  await expect(contactPage.page.getByText(contactPage.companyNameText, { exact: true })).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.companyPostCodeAndCityText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.companyStreetText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.companyNipText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.companyRegonText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.companyKrsText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.officeEmailText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.officePhoneText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.accountingEmailText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.accountingPhoneText)).toBeVisible();
  await expect(contactPage.page.getByText(contactPage.workingHoursText)).toBeVisible();
});

test('check validations when empty contact form is sent', async () => {
  await contactPage.clickSubmit();

  await contactPage.verifyFormNotSent();

  await expect(contactPage.nameInputError).toBeVisible();
  await expect(contactPage.emailInputError).toBeVisible();
  await expect(contactPage.phoneInputError).toBeVisible();
  await expect(contactPage.messageInputError).toBeVisible();
  await expect(contactPage.nameInputError).toHaveText(contactPage.emptyFormFieldErrorText);
  await expect(contactPage.emailInputError).toHaveText(contactPage.emptyFormFieldErrorText);
  await expect(contactPage.phoneInputError).toHaveText(contactPage.emptyFormFieldErrorText);
  await expect(contactPage.messageInputError).toHaveText(contactPage.emptyFormFieldErrorText);
  await expect(contactPage.nameInputError).toHaveCSS('color', contactPage.formFieldErrorColor);
  await expect(contactPage.emailInputError).toHaveCSS('color', contactPage.formFieldErrorColor);
  await expect(contactPage.phoneInputError).toHaveCSS('color', contactPage.formFieldErrorColor);
  await expect(contactPage.messageInputError).toHaveCSS('color', contactPage.formFieldErrorColor);
});

test('check validations for invalid email format', async () => {
  const invalidEmails = ['test@test.p', 'test@test', 'tt.tt.tt', 'test@example.'];

  for (const badEmail of invalidEmails) {
    await contactPage.fillContactForm('Jan', 'Kowalski', badEmail, '500600700', 'This is a test message.');

    await contactPage.clickSubmit();

    await contactPage.verifyFormNotSent();

    await expect(contactPage.emailInputError).toBeVisible();
    await expect(contactPage.nameInputError).not.toBeVisible();
    await expect(contactPage.phoneInputError).not.toBeVisible();
    await expect(contactPage.messageInputError).not.toBeVisible();
    await expect(contactPage.emailInputError).toHaveText(contactPage.incorrectEmailFormatErrorText);
    await expect(contactPage.emailInputError).toHaveCSS('color', contactPage.formFieldErrorColor);
  }
});
