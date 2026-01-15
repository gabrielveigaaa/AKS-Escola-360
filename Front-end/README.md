# Escola360 Frontend

Minimal plain-JS Vite frontend scaffold using Tailwind and Axios (no React).

Quick start


1. Install dependencies

```bash
cd Front-end
npm install
```

2. Run dev server

```bash
npm run dev
```

The frontend expects the backend API at `http://localhost:3000/api` by default. You can change this by creating a `.env` file with the Vite variable `VITE_API_URL`.

Example `.env` in `Front-end/`:

```
VITE_API_URL=http://localhost:3000/api
```

Notes:
- This project uses plain JavaScript for maintainability; the UI is in `index.html` and `src/app.js`.
- CRUD pages are generic and will attempt to infer fields from the API response. For more tailored forms, we'll add per-entity field definitions on request.
 - This project uses plain JavaScript for maintainability; the UI is in `index.html`.
 - CRUD pages are generic and will attempt to infer fields from the API response. For more tailored forms, we'll add per-entity field definitions on request.
