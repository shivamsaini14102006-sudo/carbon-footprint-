import { test, expect } from '@playwright/test';

test.describe('Carbon Calculator E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
  });

  test('should render the calculator page with tab navigation', async ({ page }) => {
    const tablist = page.locator('[role="tablist"]');
    await expect(tablist).toBeVisible();

    const tabs = tablist.locator('[role="tab"]');
    await expect(tabs).toHaveCount(4);
  });

  test('should allow filling in transportation data', async ({ page }) => {
    const carInput = page.locator('#car-km');
    await expect(carInput).toBeVisible();
    await carInput.fill('100');
    await expect(carInput).toHaveValue('100');
  });

  test('should switch tabs to food category', async ({ page }) => {
    await page.click('role=tab[name="🍔 Food"]');
    const foodPanel = page.locator('#panel-food');
    await expect(foodPanel).not.toHaveAttribute('hidden');
  });

  test('should switch tabs to energy category', async ({ page }) => {
    await page.click('role=tab[name="⚡ Energy"]');
    const energyPanel = page.locator('#panel-energy');
    await expect(energyPanel).not.toHaveAttribute('hidden');
  });

  test('should switch tabs to shopping category', async ({ page }) => {
    await page.click('role=tab[name="🛍️ Shopping"]');
    const shoppingPanel = page.locator('#panel-shopping');
    await expect(shoppingPanel).not.toHaveAttribute('hidden');
  });

  test('should calculate carbon footprint and display results', async ({ page }) => {
    await page.fill('#car-km', '100');
    await page.fill('#bus-km', '50');

    await page.click('role=tab[name="🍔 Food"]');
    await page.fill('#meat-meals', '5');

    await page.click('role=tab[name="⚡ Energy"]');
    await page.fill('#electricity-kwh', '200');

    await page.click('button:has-text("Calculate Footprint")');

    // Wait for results
    const resultsSection = page.locator('section[aria-label="Calculation results"]');
    await expect(resultsSection).toBeVisible({ timeout: 10000 });
  });

  test('should show recommendation after calculation', async ({ page }) => {
    await page.fill('#car-km', '500');
    await page.click('button:has-text("Calculate Footprint")');

    const resultsSection = page.locator('section[aria-label="Calculation results"]');
    await expect(resultsSection).toBeVisible({ timeout: 10000 });

    // Verify recommendation card in results
    const recCard = page.locator('article[aria-labelledby*="rec-title"]');
    await expect(recCard).toBeVisible();
  });

  test('should have proper ARIA attributes on form inputs', async ({ page }) => {
    const carInput = page.locator('#car-km');
    await expect(carInput).toHaveAttribute('type', 'number');
    await expect(carInput).toHaveAttribute('min', '0');
  });

  test('should display calculate button with correct aria label', async ({ page }) => {
    const calculateBtn = page.locator('button[aria-label="Calculate your carbon footprint"]');
    await expect(calculateBtn).toBeVisible();
  });
});
