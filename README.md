# API Tests for http://metadata-server-mock.herokuapp.com/metadata/

API Tests for http://metadata-server-mock.herokuapp.com/metadata/

```
npm install
npx playwright install
npm run test:mainnet
```


## Bugs for task

1. /metadata/{incorrect_subject} should yield 400 series error code instead of 200, because the server should understand what resource the client is asking for, but it doesn't have that resource.
    - `HTTP 200` - We got the state for you; it's in the response body.
    - `HTTP 204` - We got the state for you; it's blank.
    - `HTTP 400` - We can't tell what resource you're asking about. Fix your URL.
    - `HTTP 500` - We malfunctioned. Not your fault.
2. When POST-ing to query endpoint with only different than ‘decimals’ property we get decimals properties for all of the other properties
3.