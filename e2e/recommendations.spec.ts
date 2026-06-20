import { test, expect } from '@playwright/test';

test.describe('Recommendations E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the recommendation card on dashboard', async ({ page }) => {
    const recCard = page.locator('article[aria-labelledby*="rec-title"]');
    await expect(recCard).toBeVisible();
  });

  test('should show recommendation title and description', async ({ page }) => {
    const recCard = page.locator('article[aria-labelledby*="rec-title"]');
    await expect(recCard).toContainText('Switch to Public Transport');
    await expect(recCard).toContainText('Replacing just two car trips');
  });

  test('should display estimated savings', async ({ page }) => {
    const recCard = page.locator('article[aria-labelledby*="rec-title"]');
    await expect(recCard).toContainText('120 kg');
    await expect(recCard).toContainText('CO₂/yr');
  });

  test('should display priority badge', async ({ page }) => {
    const badge = page.locator('article[aria-labelledby*="rec-title"] span:has-text("High Impact")');
    await expect(badge).toBeVisible();
  });

  test('should display difficulty level', async ({ page }) => {
    const recCard = page.locator('article[aria-labelledby*="rec-title"]');
    await expect(recCard).toContainText('Difficulty: MEDIUM');
  });
});
