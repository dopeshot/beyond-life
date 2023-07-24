# beyond-life

![frontend codecov](.github/badges/frontend-coverage.svg)

## Quick start

To run the application locally simply run:

```sh
docker compose up -d
```

**Note:** `docker compose` is merely an alias for `docker-compose` which only exists in newer versions. Omitting the dash may not work for older docker versions.

The docker compose setup exposes a Mailserver for testing. The [web interface](http://localhost:5000/) of said server can be used to verify the mail functionality.
