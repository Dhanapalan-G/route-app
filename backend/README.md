# Backend (Node + Express)

## Setup
1. `cp .env.example .env` and fill Firebase Admin credentials.
2. `npm install`
3. `npm run dev` (or `npm start`)

## Endpoints
- `GET /` health
- `POST /api/echo` public
- `GET /api/secure/profile` (requires `Authorization: Bearer <Firebase ID token>`)
- `GET /api/route?a=lngA,latA&b=lngB,latB` proxies OSRM (requires auth)

