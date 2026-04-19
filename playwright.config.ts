import { defineConfig, devices } from '@playwright/test';

// E2E_BACKEND_URL: when set, signals that a real backend is available.
// If it looks like a frontend URL (has a path or is CloudFront), use it as baseURL.
// Otherwise, use the local preview server as baseURL.
const backendUrl = process.env.E2E_BACKEND_URL;
const localUrl = 'http://localhost:4173';
const isRemoteFrontend =
  backendUrl && (backendUrl.includes('cloudfront') || backendUrl.includes(':4173'));
const baseURL = isRemoteFrontend ? backendUrl : localUrl;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: !backendUrl,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: backendUrl ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
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
  // Start the local preview server when using local frontend
  ...(baseURL === localUrl && {
    webServer: {
      command: 'yarn preview',
      url: localUrl,
      reuseExistingServer: !process.env.CI,
    },
  }),
});
