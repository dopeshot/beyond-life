# beyond-life

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

The docker compose setup exposes a Mailserver for testing. The [web interface](http://localhost:5000/) of said server can be used to verify the mail functionality.
