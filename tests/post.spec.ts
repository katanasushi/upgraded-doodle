import { test , expect } from '@playwright/test'
import { coins } from './helpers/data/coins_data';
import { durationLimit, malformedUrl , nonExistantSubject  } from './helpers/data/consts'


test.describe.parallel('Negative flow', () => {

    test.afterEach(async ({ }, testInfo) => {
        if (testInfo.duration > durationLimit )
          throw(`Response time higher than 500 ms`);
      });

    test('it should @post !200 status code for non-existent subject', async ({request}) => {
        const response = await request.post('query', {
            data: nonExistantSubject
        });

        //Assertions
        expect.soft(response.status()).not.toBe(500);
        expect.soft(response.ok()).not.toBeFalsy();
    }),
    test('it should @get and give adequate error message in response for non-existent property', async ({request}) => {
        const response = await request.get(malformedUrl);
        const responseBody = await response.text();

        //Assertions
        expect.soft(response.ok()).toBeTruthy();
        expect.soft(responseBody).toBe("Requested property '💣' not found");
    }),
    test('it should @get and give adequate error message in response status code for non-existent subject', async ({request}) => {
        const response = await request.get('💣');
        const responseBody = await response.text();
        //Assertions
        expect.soft(response.ok()).toBeTruthy();
        expect.soft(responseBody).toBe("Requested subject '💣' not found");
    }),
    test('it should @get and give adequate error message in response status code for malformed url', async ({request}) => {
        const response = await request.get('/:/');
        const responseBody = await response.text();
        //Assertions
        expect.soft(response.status()).toBe(404);
        expect.soft(responseBody).toBe('GET /:/');

    })
})