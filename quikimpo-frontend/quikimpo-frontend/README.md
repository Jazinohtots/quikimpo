# QuikImpo Frontend

React + TypeScript + Tailwind frontend for QuikImpo Freight & Logistics,
calling the Django REST API in the `quikimpo-main` backend.

## Setup

```bash
npm install
cp .env.example .env   # edit VITE_API_BASE_URL if your backend isn't on :8000
npm run dev
```

Runs at http://localhost:5173 by default.

## Pages

- `/` — Home (hero, services, FAQ pulled from `/api/faqs/`)
- `/about` — About
- `/services` — Services
- `/quote` — Quote request form → POSTs to `/api/quote/`
- `/contact` — Contact form → POSTs to `/api/contact/`
- `/tracking` — Shipment tracker → GETs `/api/tracking/<number>/`
- AI chat widget on every page → POSTs to `/api/ai-chat/`

## Note

This frontend has no login/portal — the Django backend (as uploaded) doesn't
have user accounts wired up, so there's nothing for a login page to protect
yet. If you want a client portal later, that needs auth added on the Django
side first (e.g. `djangorestframework-simplejwt`), then a matching React
login/portal can be added.
