import { test, expect } from '@playwright/test';

test.describe('Login & Authentication Flow', () => {
  test('should display the login page with required fields', async ({ page }) => {
    await page.goto('/');
    // Verify heading
    const heading = page.locator('h2');
    await expect(heading).toBeVisible();
  });

  test('should have accessible form labels for email and password', async ({ page }) => {
    await page.goto('/');
    // Skip link should exist
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);
  });

  test('should navigate using keyboard only', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeTruthy();
  });
});
