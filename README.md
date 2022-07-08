# API Tests for 

## http://metadata-server-mock.herokuapp.com/metadata/

API Tests for http://metadata-server-mock.herokuapp.com/metadata/

```
npm install
npx playwright install
npm run test:mainnet
```
## About

BaseURL resides in `prod.config.ts`. 
All tests run in parallel, there are two suits, one is for positive flow and one for negative.
Assumed that since its lightweight it should be fast, because of that 500ms response time is set.
Tests run on nightly basis but also can be ran manually via actions. If you want to run only `GET` you should type `@get` in tags.
By default there are 5 runners assigned, but this amount can also be changed in actions when running manually.

## Bugs

1. `metadata/{incorrect_subject}` should yield 400 series error code instead of 200, because the server should understand what resource the client is asking for, but it doesn't have that resource.
    - `HTTP 200` - We got the state for you; it's in the response body.
    - `HTTP 204` - We got the state for you; it's blank.
    - `HTTP 400` - We can't tell what resource you're asking about. Fix your URL.
    - `HTTP 500` - We malfunctioned. Not your fault.
2. When doing `POST` to `/query` endpoint decimals property is always returned, even if property is made up.
3. Sometimes response times are above 500ms

