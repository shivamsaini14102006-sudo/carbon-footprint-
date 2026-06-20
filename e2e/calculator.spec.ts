import { test, expect } from '@playwright/test';

test.describe('CarbonWise E2E - Sustainability Mission', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the calculator page
    await page.goto('http://localhost:3000/calculator');
  });

  test('should calculate carbon footprint correctly', async ({ page }) => {
    // Fill in transportation data
    await page.fill('#car-km', '100');
    await page.fill('#bus-km', '50');
    
    // Switch to Food tab
    await page.click('role=tab[name="🍔 Food"]');
    await page.fill('#meat-meals', '5');
    
    // Switch to Energy tab
    await page.click('role=tab[name="⚡ Energy"]');
    await page.fill('#electricity-kwh', '200');

    // Trigger calculation
    await page.click('button:has-text("Calculate Footprint")');

    // Verify results appear
    const resultsSection = page.locator('section[aria-label="Calculation results"]');
    await expect(resultsSection).toBeVisible();

    // Verify Carbon Score Card is updated
    const scoreText = page.locator('article[aria-label*="Your carbon score"]');
    await expect(scoreText).toBeVisible();
  });

  test('should show personalized recommendations after calculation', async ({ page }) => {
    await page.fill('#car-km', '500'); // High transport
    await page.click('button:has-text("Calculate Footprint")');

    // Confirm recommendation card exists
    const recCard = page.locator('article[aria-labelledby*="rec-title"]');
    await expect(recCard).toBeVisible();
    await expect(recCard).toContainText('Transport');
  });

  test('accessibility check - dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check for skip link
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toBeInViewport({ ratio: 0 }); // Hidden initially but exists
    
    // Check for main landmark
    await expect(page.locator('main#main-content')).toBeVisible();
  });
});
