# Beyond Life / Siebtes Leben

[![frontend codecov](https://codecov.siebtesleben.de/badges/frontend-coverage.svg)](https://codecov.siebtesleben.de/main/frontend/index.html) [![backend codecov](https://codecov.siebtesleben.de/badges/backend-coverage.svg)](https://codecov.siebtesleben.de/main/backend/index.html)


## Repository klonen

```sh
git clone --branch submission git@github.com:dopeshot/beyond-life.git && cd beyond-life && docker compose pull
```

## Quick start

Die meisten ENV-Variablen haben default Werte gesetzt. Die einzige Ausnahme stellt Stripe dar. 
Die enstprechende Datei findest du im Anhang der Email an dich, als auch in den [Docs](https://behind.siebtesleben.de/docs/getting-started).

Sollte es Probleme mit dem Webhook secret geben, dann siehe [Troubleshooting](#troubleshooting).

Das Starten des Backends erfolgt daraufhin durch:

```sh
docker compose up -d
```

| Service          | Lokal                          | Deployment                                                |
| ---------------- | ------------------------------ | --------------------------------------------------------- |
| Frontend         | [Lokal](http://localhost:3000) | [Deployment](https://siebtesleben.de)                     |
| Backend          | [Lokal](http://localhost:3001) | [Deployment](https://api.siebtesleben.de)                 |
| SMTP Server      | [Lokal](http://localhost:5001) | ❌                                                         |
| Stripe Dashboard | ❌                              | [Stripe.com](https://dashboard.stripe.com/test/dashboard) |

**Es ist möglich, dass die Live-Version nicht identisch zu der Version auf dem submision branch ist!**


Nach dem initialen Starten des Docker-Compose Setups befindet sich ein user account in der Datenbank mit den folgenden Credentials:

*Email*: devops@totally.rocks

*Passwort*: WeAllLoveDevOps

## Stripe

Das Kaufen von Tarifen setzt eine Test-Karte voraus. Alle Angaben sind hier egal, bis auf die Kartennummer:

`4242424242424242` für einen erfolgreichen Kauf

`4000000000009995` für einen fehlgeschlagenen Kauf

**Die Login Daten für das [Stripe Dashboard](https://dashboard.stripe.com/test/dashboard) sind ebenfalls in den [Docs](https://behind.siebtesleben.de/docs/getting-started).**

## Troubleshooting

Es kann passieren, dass das Webhook secret ausläuft und erneuert wurde. Dadurch muss die enstprechende Env variable geupdated werden.
Um die Variable zu updaten sind die folgenden Schritte nötig:

1. Das neue Webhook secret steht in den Logs des Stripe-Cli. 

```sh
docker logs stripe-cli
```

2. Das Webhook secret updaten (`BACKEND_STRIPE_WEBHOOK_SECRET` in der .env)
