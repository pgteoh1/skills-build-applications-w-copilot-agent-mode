# Octofit Tracker Frontend

This React 19 + Vite app is the presentation tier for Octofit Tracker.

## Environment

Define `VITE_CODESPACE_NAME` in a local environment file such as `.env.local` when you want the app to call the backend through a GitHub Codespaces URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is unset, the app safely falls back to relative `/api/.../` endpoints instead of generating an invalid `https://undefined-8000...` URL.

## Commands

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
