import 'dotenv/config'; 
import { test, expect } from '@playwright/test';
import { TechTest } from '../main/base/techTest';

let tt: TechTest;

test.beforeEach(async ({ page }) => {
  tt = new TechTest('http://3.8.242.61', page);
  await tt.goto('/');
  await tt.login(process.env.EMAIL!, process.env.PASSWORD!);
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Home Page - Ten10TechTest/);
});

[
  { interestRate: '6%', duration: 'daily', interestAmount: '1.23', totalPayable: '7501.23' },
  { interestRate: '8%', duration: 'monthly', interestAmount: '60.00', totalPayable: '7560.00' },
  { interestRate: '10%', duration: 'yearly', interestAmount: '750.00', totalPayable: '8250.00' }
].forEach(({ interestRate, duration, interestAmount, totalPayable }) => {
  test(`user searches for interest rate ${interestRate} and duration ${duration}`, async () => {
    const getStartedLink = await tt.getByRole('button', { name: 'Select Interest Rate' });
    await getStartedLink.click();
    const interestValueCheckbox = await tt.getByRole('checkbox', { name: `${interestRate}` });
    await interestValueCheckbox.check();

    const durationLink = await tt.getByRole('link', { name: `${duration}` });
    await tt.page.locator('body').click(); // Click outside to close the dropdown
    await durationLink.click();

    const consentButton = await tt.getByRole('checkbox', { name: 'Please accept this mandatory' });
    await consentButton.check();

    const calculateButton = await tt.getByRole('button', { name: 'Calculate' });
    await calculateButton.click();

    const interestAmountText = await tt.getByRole('heading', { name: 'Interest Amount:' });
    await expect(interestAmountText).toBeVisible();
    await expect(interestAmountText).toHaveText(`Interest Amount: ${interestAmount}`);

    const totalAmountText = await tt.getByRole('heading', { name: 'Total Amount with Interest:' });
    await expect(totalAmountText).toBeVisible();
    await expect(totalAmountText).toHaveText(`Total Amount with Interest: ${totalPayable}`);
  });
});

test('logo is displayed', async () => {
  const logo = await tt.getByAltText('Logo', { exact: true });
  await expect(logo).toBeVisible();
});

test('user can logout', async () => {
  const logoutButton = await tt.getByRole('button', { name: 'Logout' });
  await logoutButton.click();
  const loginButton = await tt.getByRole('button', { name: 'Log in' });
  await expect(loginButton).toBeVisible();
});

// failing test, user is able to calculate without accepting terms
test('user must accept terms to calculate', async () => {
  const getStartedLink = await tt.getByRole('button', { name: 'Select Interest Rate' });
  await getStartedLink.click();
  const interestValueCheckbox = await tt.getByRole('checkbox', { name: '6%' });
  await interestValueCheckbox.check();
  await tt.page.locator('body').click(); // Click outside to close the dropdown

  const calculateButton = await tt.getByRole('button', { name: 'Calculate' });
  await calculateButton.click();

  const errorMessage = await tt.getByRole('alert');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('You must accept the terms and conditions before calculating.');
});

// failing test, user sees no error message when clicking calculate without selecting interest rate
test('error message if no interest rate selected', async () => {
  const consentButton = await tt.getByRole('checkbox', { name: 'Please accept this mandatory' });
  await consentButton.check();

  const calculateButton = await tt.getByRole('button', { name: 'Calculate' });
  await calculateButton.click();

  const errorMessage = await tt.getByRole('alert');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Please select an interest rate.');
});