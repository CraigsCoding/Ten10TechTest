import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { TechTest } from '../main/base/techTest';

let tt: TechTest

test.beforeEach(async ({ page }) => {
    tt = new TechTest('http://3.8.242.61', page);
    await tt.goto('/');
});


test('user can login', async ({ page }) => {
    await tt.login(process.env.EMAIL!, process.env.PASSWORD!);
});

test('user enters invalid login details', async ({ page }) => {
    await tt.login('invalid@duck.com', 'wrongpassword');
    const errorMessage = await tt.getByText('Invalid login attempt.');
    await expect(errorMessage).toBeVisible();
});