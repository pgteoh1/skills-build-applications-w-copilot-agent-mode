# OctoFit Tracker Frontend

React 19 + Vite presentation tier for OctoFit Tracker.

## Environment variable requirement

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running in GitHub Codespaces.

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

With that variable set, the frontend calls API endpoints in this format:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

For example:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
```

If `VITE_CODESPACE_NAME` is not set, the app uses a safe local fallback:

```text
http://localhost:8000/api/[component]/
```

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
