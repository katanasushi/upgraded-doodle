import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 5 * 60 * 1000,
  use: {
    baseURL: 'http://metadata-server-mock.herokuapp.com/metadata/',
    headless: false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: false,
    video: 'on-first-retry',
    bypassCSP: false,
    trace: 'on',
    screenshot: 'only-on-failure',
    reporter: process.env.CI ? 'github' : 'list',
    },
};

export default config;
