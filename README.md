# etherscan

This is E2E Automation of Etherscan register page

```
npm install
npx playwright install
npm run test:mainnet
```


To run in head-full mode please change value of headless: true to false in prod.config.ts

Currently tests run in parallel this can be changed in header.spec.ts by removing test.describe.configure({ mode: 'parallel' });
Currently tests run on push and PR to main and release-* branch

I've picked Playwright mainly because this is the most widely used test automation framework nowadays for E2E testing, unlike cypress it has capability to use multi-windows (i.e. check and switch tabs).

In order for us to pass reCaptcha we could use https://2captcha.com/ or some other paid tool  additionally we should not test account creation on PROD environment for someone elses app

Test Scenarios:

    - it should open etherscan main page after clicking a logo
    - it should open etherscan T&C page after clicking a link   
    - it should open etherscan unsubscribe info page after clicking a link
    - it should fill form with strong password without any errors
    - it should fill form with medium password any errors
    - it should fill form with weak without any errors
    - it should fill form with strong password with super long username without any errors
    - it should fill form with broken email and prompt an error
    - it should fill form with errors and submit
    - it should check if username can be non-alpha numeric
