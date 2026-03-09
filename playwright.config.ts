import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  timeout: 60000,
  fullyParallel: true,
  workers: 3,

  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: false,
    launchOptions: {
      slowMo: 1000 
  },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

  },

    reporter: [
    ['list'],
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never' 
    }],
    ['allure-playwright']
  ],

   projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ]
});