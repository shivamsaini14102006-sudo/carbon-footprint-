import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the Carbon Score card', async ({ page }) => {
    const scoreCard = page.locator('article[aria-label*="carbon score"]');
    await expect(scoreCard).toBeVisible();
  });

  test('should render the Emission Hotspots section with actionable insights', async ({ page }) => {
    const hotspotSection = page.locator('section[aria-labelledby="hotspot-heading"]');
    await expect(hotspotSection).toBeVisible();

    // Verify insight note is rendered for top emitter
    const insightNote = hotspotSection.locator('[role="note"]');
    await expect(insightNote).toBeVisible();
    await expect(insightNote).toContainText('Replacing');
  });

  test('should render the Carbon Savings Tracker', async ({ page }) => {
    const savings = page.locator('article[aria-labelledby="savings-heading"]');
    await expect(savings).toBeVisible();
    await expect(savings).toContainText('You have saved');
    await expect(savings).toContainText('kg CO₂');
  });

  test('should render the Habit Streak component', async ({ page }) => {
    const streak = page.locator('article[aria-labelledby="streak-heading"]');
    await expect(streak).toBeVisible();
    await expect(streak).toContainText('Sustainable Transport');
  });

  test('should render the Emission History chart', async ({ page }) => {
    const historySection = page.locator('section[aria-labelledby="history-heading"]');
    await expect(historySection).toBeVisible();
    await expect(historySection).toContainText('Emission Trends');
  });

  test('should render Carbon Twin with multi-scenario tabs', async ({ page }) => {
    const twinCard = page.locator('article[aria-labelledby="twin-heading"]');
    await expect(twinCard).toBeVisible();

    // Verify scenario tabs
    const tabs = twinCard.locator('[role="tab"]');
    await expect(tabs).toHaveCount(3);

    // Click the second scenario
    await tabs.nth(1).click();
    await expect(twinCard).toContainText('Vegetarian Diet');
  });

  test('should have accessible skip link', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);
    await expect(skipLink).toHaveAttribute('class', /sr-only/);
  });

  test('should display goal card with progress', async ({ page }) => {
    const goalSection = page.locator('section[aria-label="Sustainability goals"]');
    await expect(goalSection).toBeVisible();
  });
});
