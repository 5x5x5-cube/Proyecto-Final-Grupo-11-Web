import { defineConfig, devices } from '@playwright/test';

const backendUrl = process.env.E2E_BACKEND_URL;
const localUrl = 'http://localhost:4173';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: backendUrl || localUrl,
    // EKS ALB uses a self-signed certificate; without this, Chromium rejects navigation
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Only start the local preview server when no external backend URL is provided
  ...(!backendUrl && {
    webServer: {
      command: 'yarn preview',
      url: localUrl,
      reuseExistingServer: !process.env.CI,
    },
  }),
});
