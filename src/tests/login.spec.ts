import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { TechTest } from '../main/base/techTest';

let tt: TechTest 

// test.beforeEach(async ({ page }) => {
//     
//     await tt.goto('/', page);
// });

test('user can login', async ({ page }) => {
   const tt = new TechTest('http://3.8.242.61', page);
await tt.goto('/');
await tt.login(process.env.EMAIL!, process.env.PASSWORD!);
});

test('user enters invalid login details', async ({ page }) => {
    await tt.goto('/', page);

    await tt.login(page, 'invalid@duck.com', 'wrongpassword');
    const errorMessage = await tt.getByText(page, 'Invalid login attempt.');
    await expect(errorMessage).toBeVisible();
    });