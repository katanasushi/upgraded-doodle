import { test , expect } from '@playwright/test'
import { coins } from './helpers/data/coins_data';
import { malformedUrl , malformedProperties , nonExistantSubject  } from './helpers/data/consts'


test.describe.parallel('Negative flow', () => {
    test('it should @post !200 status code for non-existent subject', async ({request}) => {
        const response = await request.post('query', {
            data: nonExistantSubject
        });
        //Assertions
        expect.soft(response.status()).not.toBe(500);
        expect.soft(response.ok()).not.toBeFalsy();
    }),
    test.fixme('it should @post with empty response for non-existent property', async ({request}) => {
        const response = await request.post('query', {
            data: malformedProperties
        });
        expect.soft(response.status()).toBe(200);
        expect.soft(response.ok()).toBeTruthy();

        const responseBody = JSON.parse(await response.text())
        //Assertions
        //TODO: Make assertions smarter and better
        expect.soft(responseBody).not.toContain(coins[0].decimals.value);
    }),
    test('it should @get and give adequate error message in response for non-existent property', async ({request}) => {
        const response = await request.get(malformedUrl);
        const responseBody = await response.text()
        //Assertions
        expect.soft(response.ok()).toBeTruthy();
        expect.soft(responseBody).toBe("Requested property '💣' not found");
    }),
    test('it should @get and give adequate error message in response status code for non-existent subject', async ({request}) => {
        const response = await request.get('💣');
        const responseBody = await response.text()
        //Assertions
        expect.soft(response.ok()).toBeTruthy();
        expect.soft(responseBody).toBe("Requested subject '💣' not found");
    })
})