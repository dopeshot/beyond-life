# beyond-life

[![frontend codecov](https://codecov.siebtesleben.de/badges/frontend-coverage.svg)](https://codecov.siebtesleben.de/main/frontend/index.html) [![backend codecov](https://codecov.siebtesleben.de/badges/backend-coverage.svg)](https://codecov.siebtesleben.de/main/backend/index.html)

## Quick start

To run the application locally simply run:

```sh
docker compose up -d
```

**Stripe:**
To perform test payments (not real ones), Stripe data has to be provided in the `.env` file.
secrets, items and price_ids can be found in the [Stripe Dashboard](https://dashboard.stripe.com/test/dashboard).

The frontend also needs the public secret

**Note:** `docker compose` is merely an alias for `docker-compose` which only exists in newer versions. Omitting the dash may not work for older docker versions.

The docker compose setup exposes a Mailserver for testing. The [web interface](http://localhost:5001/) of said server can be used to verify the mail functionality.

## Start for devs

When developing having all components up and running is mostly unnecessary.
To run all components BUT one simply run:

```sh
docker compose up -d --scale=<service name>=0
```

So for example:

```sh
docker compose up -d --scale=frontend=0
```

## Troubleshooting

The webhook secrets might expire or change...this leads to 503 errors for the payments webhook in the backend.
To get the new key:

1. Get the new webhook secrets. It is in the very first logline of the stripe cli container.

```sh
docker logs stripe-cli
```

2. Update the `BACKEND_STRIPE_WEBHOOK_SECRET` with the new webhook secret value
