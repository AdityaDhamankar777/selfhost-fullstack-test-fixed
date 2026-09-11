# Selfhost Full-Stack Deployment Test

Small React + Express project for testing deployment on Coolify.

## Project structure

- `backend/` - Node.js + Express API
- `frontend/` - React + Vite frontend
- `docker-compose.yml` - local Docker testing

## Run locally

### Backend

```bash
cd backend
npm install
npm start
```

Backend: `http://localhost:4000`

Health check: `http://localhost:4000/api/health`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

The frontend reads `VITE_API_URL` during the Vite build.

## Coolify deployment

Create TWO applications from the same GitHub repository.

### Backend application

- Repository: `AdityaDhamankar777/selfhost-fullstack-test`
- Branch: `main`
- Build Pack: `Dockerfile`
- Base Directory: `/backend`
- Dockerfile Path: `/Dockerfile`
- Container Port: `4000`
- Environment variable: `PORT=4000`

### Frontend application

- Repository: `AdityaDhamankar777/selfhost-fullstack-test`
- Branch: `main`
- Build Pack: `Dockerfile`
- Base Directory: `/frontend`
- Dockerfile Path: `/Dockerfile`
- Container Port: `5173`
- Build-time environment variable: `VITE_API_URL=https://YOUR-BACKEND-DOMAIN`

Replace `YOUR-BACKEND-DOMAIN` with the public URL generated for the backend in Coolify.

Important: do not use `http://localhost:4000` for the deployed frontend. In a user's browser, localhost means the user's own computer.
