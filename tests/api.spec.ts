import { test , expect } from '@playwright/test'
import { coins } from './helpers/data/coins_data';
import { properties , malformedProperties } from './helpers/data/consts'
import * as fun from './helpers/data/functions'

test.describe.parallel('Positive Flow', () => {
    coins.forEach(data => {
        test(`it should @get metadata for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}`)                
                const responseBody = JSON.parse(await response.text())

                //Assertions
                fun.checkResponsePositive(200,response)
                fun.checkResponseWithData(responseBody,data)
                // expect.soft(responseBody).toStrictEqual(data);
                // expect.soft(responseBody.subject).toBe(data.subject)
                // expect.soft(responseBody.url.value).toBe(data.url.value)
                // expect.soft(responseBody.name.value).toBe(data.name.value)
                // expect.soft(responseBody.ticker.value).toBe(data.ticker.value)
                // expect.soft(responseBody.decimals.value).toBe(data.decimals.value)
                // expect.soft(responseBody.policy).toBe(data.policy)
                // expect.soft(responseBody.logo.value).toBe(data.logo.value)
                // expect.soft(responseBody.description.value).toBe(data.description.value)
            }),

            test.fixme(`it should @post with empty response for non-existent property for ${data.name.value}`, async ({request}) => {
                const response = await request.post('query', {
                    data: malformedProperties
                });
                const responseBody = JSON.parse(await response.text())


                //Assertions
                fun.checkResponsePositive(200,response)
                expect.soft(responseBody.ticker.value).not.toBe(undefined)

            }),

            test(`it should @get and check signatures in metadata for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}`)
                const responseBody = JSON.parse(await response.text())

                //Assertions
                fun.checkResponsePositive(200,response)

                //Signatures check
                fun.checkSignatures(responseBody,data);
                // expect.soft(responseBody.url.signatures[0].signature).toStrictEqual(data.url.signatures[0].signature);
                // expect.soft(responseBody.name.signatures[0].signature).toStrictEqual(data.name.signatures[0].signature);
                // expect.soft(responseBody.ticker.signatures[0].signature).toStrictEqual(data.ticker.signatures[0].signature);
                // expect.soft(responseBody.decimals.signatures[0].signature).toStrictEqual(data.decimals.signatures[0].signature);
                // expect.soft(responseBody.logo.signatures[0].signature).toStrictEqual(data.logo.signatures[0].signature);
                // expect.soft(responseBody.description.signatures[0].signature).toStrictEqual(data.description.signatures[0].signature);
            }),

            test(`it should @get and check publicKeys in metadata for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}`)
                const responseBody = JSON.parse(await response.text())

                //Assertions
                fun.checkResponsePositive(200,response)

                //PK check
                fun.checkPK(responseBody,data);
                // expect.soft(responseBody.url.signatures[0].publicKey).toStrictEqual(data.url.signatures[0].publicKey);
                // expect.soft(responseBody.name.signatures[0].publicKey).toStrictEqual(data.name.signatures[0].publicKey);
                // expect.soft(responseBody.ticker.signatures[0].publicKey).toStrictEqual(data.ticker.signatures[0].publicKey);
                // expect.soft(responseBody.decimals.signatures[0].publicKey).toStrictEqual(data.decimals.signatures[0].publicKey);
                // expect.soft(responseBody.logo.signatures[0].publicKey).toStrictEqual(data.logo.signatures[0].publicKey);
                // expect.soft(responseBody.description.signatures[0].publicKey).toStrictEqual(data.description.signatures[0].publicKey);

            })
            properties.forEach(properties => {

                test(`it should @get property of ${properties} for ${data.name.value}`, async ({request}) => {
                //Fetch data from the API
                const response = await request.get(`${data.subject}/properties/${properties}`)
                const responseBody = JSON.parse(await response.text())
                const responseValue = data[properties].value;

                //Assertions
                fun.checkResponsePositive(200,response)

                expect.soft(responseBody.value).toBe(responseValue);
                })},

                test(`it should @get metadata and name, description and url properties for ${data.name.value}`, async ({request}) => {
                const response = await request.post('query', {
                    data: {
                        subjects: [`${data.subject}`],
                        properties: ["name", "description", "url"]
                    }
                });
                const responseBody = JSON.parse(await response.text())

                //Assertions
                fun.checkResponsePositive(200,response)
                fun.checkPropertiesSet(responseBody, data)
                // expect.soft(responseBody.subjects[0].name.value).toBe(data.name.value)
                // expect.soft(responseBody.subjects[0].decimals.value).toBe(data.decimals.value)
                // expect.soft(responseBody.subjects[0].description.value).toBe(data.description.value)
                // expect.soft(responseBody.subjects[0].url.value).toBe(data.url.value)
            }
            ));
    });

})