import { test , expect } from '@playwright/test'
import { coins } from './helpers/data/coins_data';
import { properties , malformedProperties } from './helpers/data/consts'

test.describe.parallel('Positive Flow', () => {
    test.afterEach(async ({ }, testInfo) => {
        if (testInfo.duration > 500)
          throw(`Response time higher than 500 ms`);
      });
    //Iterate trough coins
    coins.forEach(data => {
        test(`it should @get metadata for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}`)                
                const responseBody = await response.json()

                //Assertions
                expect.soft(response.ok()).toBeTruthy();
                expect.soft(responseBody).toStrictEqual(data);
                expect.soft(responseBody.subject).toBe(data.subject)
                expect.soft(responseBody.url.value).toBe(data.url.value)
                expect.soft(responseBody.name.value).toBe(data.name.value)
                expect.soft(responseBody.ticker.value).toBe(data.ticker.value)
                expect.soft(responseBody.decimals.value).toBe(data.decimals.value)
                expect.soft(responseBody.policy).toBe(data.policy)
                expect.soft(responseBody.logo.value).toBe(data.logo.value)
                expect.soft(responseBody.description.value).toBe(data.description.value)
            }),

            test(`it should @post with empty response for non-existent property for ${data.name.value}`, async ({request}, testInfo) => {
                
                //Mark as failing
                //await testInfo.fail();

                //Fetch data from the API
                const response = await request.post('query', {
                    data: malformedProperties
                });
                const responseBody = await response.json()

                //Assertions
                expect.soft(response.ok()).toBeTruthy();
                expect.soft(responseBody.subjects[0].decimals).toBeUndefined();
                expect.soft(responseBody.subjects[0].url).toBeUndefined();
                expect.soft(responseBody.subjects[0].name).toBeUndefined();
                expect.soft(responseBody.subjects[0].ticker).toBeUndefined();
                expect.soft(responseBody.subjects[0].decimals).toBeUndefined();
                expect.soft(responseBody.subjects[0].logo).toBeUndefined();
                expect.soft(responseBody.subjects[0].description).toBeUndefined();


            }),

            test(`it should @get and check signatures in metadata for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}`)
                const responseBody = await response.json()

                //Assertions
                expect.soft(response.ok()).toBeTruthy();

                //Signatures check
                expect.soft(responseBody.url.signatures[0].signature).toStrictEqual(data.url.signatures[0].signature);
                expect.soft(responseBody.name.signatures[0].signature).toStrictEqual(data.name.signatures[0].signature);
                expect.soft(responseBody.ticker.signatures[0].signature).toStrictEqual(data.ticker.signatures[0].signature);
                expect.soft(responseBody.decimals.signatures[0].signature).toStrictEqual(data.decimals.signatures[0].signature);
                expect.soft(responseBody.logo.signatures[0].signature).toStrictEqual(data.logo.signatures[0].signature);
                expect.soft(responseBody.description.signatures[0].signature).toStrictEqual(data.description.signatures[0].signature);
            }),

            test(`it should @get and check publicKeys in metadata for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}`)
                const responseBody = await response.json()

                //Assertions
                expect.soft(response.ok()).toBeTruthy();

                //PK check
                expect.soft(responseBody.url.signatures[0].publicKey).toStrictEqual(data.url.signatures[0].publicKey);
                expect.soft(responseBody.name.signatures[0].publicKey).toStrictEqual(data.name.signatures[0].publicKey);
                expect.soft(responseBody.ticker.signatures[0].publicKey).toStrictEqual(data.ticker.signatures[0].publicKey);
                expect.soft(responseBody.decimals.signatures[0].publicKey).toStrictEqual(data.decimals.signatures[0].publicKey);
                expect.soft(responseBody.logo.signatures[0].publicKey).toStrictEqual(data.logo.signatures[0].publicKey);
                expect.soft(responseBody.description.signatures[0].publicKey).toStrictEqual(data.description.signatures[0].publicKey);

            })
            //Iterate trough properties & coin data
            properties.forEach(properties => {

                test(`it should @get property of ${properties} for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}/properties/${properties}`)
                const responseBody = await response.json()
                const responseValue = data[properties].value;

                //Assertions
                expect.soft(response.ok()).toBeTruthy();

                expect.soft(responseBody.value).toBe(responseValue);
                })},

                test(`it should @get metadata and name, description and url properties for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.post('query', {
                    data: {
                        subjects: [`${data.subject}`],
                        //Set list of properties so not using properties variable
                        properties: ["name", "description", "url"]
                    }
                });
                const responseBody = await response.json()

                //Assertions
                expect.soft(response.ok()).toBeTruthy();
                expect.soft(responseBody.subjects[0].name.value).toBe(data.name.value)
                expect.soft(responseBody.subjects[0].decimals.value).toBe(data.decimals.value)
                expect.soft(responseBody.subjects[0].description.value).toBe(data.description.value)
                expect.soft(responseBody.subjects[0].url.value).toBe(data.url.value)
            }
            ));
    });

})