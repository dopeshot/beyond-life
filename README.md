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

Das Kaufen von Tarifen setzt eine Test-Karte voraus. Alle Angaben sind hier egal, bis auf die Kartennummer:

`4242424242424242` für einen erfolgreichen Kauf

`4000000000009995` für einen fehlgeschlagenen Kauf

## Troubleshooting

Es kann passieren, dass das Webhook secret ausläuft und erneuert wurde. Dadurch muss die enstprechende Env variable geupdated werden.
Um die Variable zu updaten sind die folgenden Schritte nötig:

1. Das neue Webhook secret steht in den Logs des Stripe-Cli. 

```sh
docker logs stripe-cli
```

2. Das Webhook secret updaten (`BACKEND_STRIPE_WEBHOOK_SECRET` in der .env)
