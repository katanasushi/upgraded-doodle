import { expect } from '@playwright/test';


 export function checkSignatures(responseBody, data){
    expect.soft(responseBody.url.signatures[0].signature).toStrictEqual(data.url.signatures[0].signature);
    expect.soft(responseBody.name.signatures[0].signature).toStrictEqual(data.name.signatures[0].signature);
    expect.soft(responseBody.ticker.signatures[0].signature).toStrictEqual(data.ticker.signatures[0].signature);
    expect.soft(responseBody.decimals.signatures[0].signature).toStrictEqual(data.decimals.signatures[0].signature);
    expect.soft(responseBody.logo.signatures[0].signature).toStrictEqual(data.logo.signatures[0].signature);
    expect.soft(responseBody.description.signatures[0].signature).toStrictEqual(data.description.signatures[0].signature);

  };
export function checkPK (responseBody,data){
  expect.soft(responseBody.url.signatures[0].publicKey).toStrictEqual(data.url.signatures[0].publicKey);
  expect.soft(responseBody.name.signatures[0].publicKey).toStrictEqual(data.name.signatures[0].publicKey);
  expect.soft(responseBody.ticker.signatures[0].publicKey).toStrictEqual(data.ticker.signatures[0].publicKey);
  expect.soft(responseBody.decimals.signatures[0].publicKey).toStrictEqual(data.decimals.signatures[0].publicKey);
  expect.soft(responseBody.logo.signatures[0].publicKey).toStrictEqual(data.logo.signatures[0].publicKey);
  expect.soft(responseBody.description.signatures[0].publicKey).toStrictEqual(data.description.signatures[0].publicKey);
}

export function checkResponseWithData(responseBody, data){
  expect.soft(responseBody).toStrictEqual(data);
  expect.soft(responseBody.subject).toBe(data.subject)
  expect.soft(responseBody.url.value).toBe(data.url.value)
  expect.soft(responseBody.name.value).toBe(data.name.value)
  expect.soft(responseBody.ticker.value).toBe(data.ticker.value)
  expect.soft(responseBody.decimals.value).toBe(data.decimals.value)
  expect.soft(responseBody.policy).not.toBe(data.policy)
  expect.soft(responseBody.logo.value).toBe(data.logo.value)
  expect.soft(responseBody.description.value).toBe(data.description.value)
}

export function checkResponsePositive(statuscode: number, response) {
  expect(response.status()).toBe(statuscode)
  expect.soft(response.ok()).toBeTruthy();
}

export function checkPropertiesSet (responseBody, data) {
  expect.soft(responseBody.subjects[0].name.value).toBe(data.name.value)
  expect.soft(responseBody.subjects[0].decimals.value).toBe(data.decimals.value)
  expect.soft(responseBody.subjects[0].description.value).toBe(data.description.value)
  expect.soft(responseBody.subjects[0].url.value).toBe(data.url.value)
}