# beyond-life

[![frontend codecov](https://codecov.siebtesleben.de/badges/frontend-coverage.svg)](https://codecov.siebtesleben.de/main/frontend/index.html) [![backend codecov](https://codecov.siebtesleben.de/badges/backend-coverage.svg)](https://codecov.siebtesleben.de/main/backend/index.html)

## Quick start

Die meisten ENV-Variablen haben default Werte gesetzt. Die einzige Ausnahme stellt stripe dar. Die Stripe env Daten, sowie die Login Daten sollten in der Email gewesen sein.
Sollte es hierbei Probleme geben siehe [Troubleshooting](#Troubleshooting).

Sobald die .env im Repo liegt kann das docker compose setup mit folgendem Befehl gestartet werden:

```sh
docker compose up -d
```

Daraufhin kannst du:
 - das [Frontend](http://localhost:3000) aufrufen
 - das [SMTP Server Panel](http://localhost:5001) aufrufen
 - das [Stripe Dashboard](https://dashboard.stripe.com/test/dashboard) (nicht direkt Teil des docker compose Stacks)


## Troubleshooting

The webhook secrets might expire or change...this leads to 503 errors for the payments webhook in the backend.
To get the new key:

1. Get the new webhook secrets. It is in the very first logline of the stripe cli container.

```sh
docker logs stripe-cli
```

2. Update the `BACKEND_STRIPE_WEBHOOK_SECRET` with the new webhook secret value
