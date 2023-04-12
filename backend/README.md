# Beyond life backend

## Quick start

Run

```sh
cp sample.env .env && npm i && npm run start:dev
```

## Primsa & DB stuff

After changing the schema within the prisma folder use the following command to update type defintions for the prisma client used within Nestjs:

```sh
npm run prisma:update
```

When interacting with prisma use the prisma cli `npx prisma`. See also the [docs](https://www.prisma.io/docs/reference/api-reference/command-reference).


