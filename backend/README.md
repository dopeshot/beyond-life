# Beyond life backend

Das Backend selbst läuft auf Port [3001](http://localhost:3001), für Dokumentation der Endpunkte siehe Swagger [/swagger](http://localhost:3001/swagger).

## Quick start

** ACHTUNG **: Auch hier sind die Stripe env daten nötig. In der env für den docker compose stack sind diese durch `BACKEND_` gekennzeichnet.

Run 

```sh
cp sample.env .env && npm i && npm run start:dev
```
