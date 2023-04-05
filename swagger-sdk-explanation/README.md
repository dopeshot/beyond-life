# Swagger sdk

Assuming that the backend is running, we can grab the OpenAPI spec from the backend and generate a client SDK.

There are different scripts to accomplish this, in this example I used the [openapi-typescript](https://github.com/drwpow/openapi-typescript).

## Usage
  
```sh
npx openapi-typescript http://localhost/3001/swagger-yaml --output ./src/api.d.ts
// or
npm run fetch
```

See the [api](./src/api.d.ts) for a sample sdk and [index.ts](./src/index.ts) for the usage.