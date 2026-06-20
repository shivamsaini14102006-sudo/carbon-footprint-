import { test, expect } from '@playwright/test';

test.describe('Goals E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render goal card on dashboard', async ({ page }) => {
    const goalSection = page.locator('section[aria-label="Sustainability goals"]');
    await expect(goalSection).toBeVisible();
  });

  test('should display goal title', async ({ page }) => {
    const goalSection = page.locator('section[aria-label="Sustainability goals"]');
    await expect(goalSection).toContainText('Reduce Transportation Emissions');
  });

  test('should show goal progress indicator', async ({ page }) => {
    const progressbar = page.locator('section[aria-label="Sustainability goals"] [role="progressbar"]');
    await expect(progressbar).toBeVisible();
  });

  test('should display goal status badge', async ({ page }) => {
    const goalSection = page.locator('section[aria-label="Sustainability goals"]');
    await expect(goalSection).toContainText('Active');
  });

  test('should show target date', async ({ page }) => {
    const goalSection = page.locator('section[aria-label="Sustainability goals"]');
    // Verify date-related content exists
    const dateText = goalSection.locator('text=/\\d{4}/');
    await expect(dateText.first()).toBeVisible();
  });
});
