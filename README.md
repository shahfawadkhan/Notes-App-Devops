# 📝 Notes App — MERN + Tailwind

A minimal notes app built for DevOps practice. Add and delete notes. That's it.

## Stack
- **MongoDB** — database
- **Express** — REST API
- **React** — frontend (+ Tailwind CSS)
- **Node.js** — runtime

---

## 🚀 Quick Start

### Option A: Docker Compose (recommended for DevOps practice)

```bash
docker compose up -d --build
```

App runs at **http://localhost:3000**

---

### Option B: Run locally

**Backend:**
```bash
cd backend
cp .env.example .env        # edit MONGO_URI if needed
npm install
npm run dev                  # runs on :5000
```

**Frontend:**
```bash
cd frontend
npm install
npm start                    # runs on :3000
```

---

## API Endpoints

| Method | Route           | Description     |
|--------|-----------------|-----------------|
| GET    | /api/notes      | Get all notes   |
| POST   | /api/notes      | Create a note   |
| DELETE | /api/notes/:id  | Delete a note   |
| GET    | /health         | Health check    |

**POST body:**
```json
{ "title": "My Note", "content": "Hello world" }
```

---

## 🐳 DevOps Things to Practice

- **Docker** — multi-stage builds, networking, volumes
- **Docker Compose** — orchestrate 3 services (mongo, backend, frontend)
- **CI/CD** — GitHub Actions workflow in `.github/workflows/ci.yml`
- **Nginx** — reverse proxy config in `frontend/nginx.conf`
- **Environment variables** — `.env` / Docker env config
- **Health checks** — `/health` endpoint

---

## Project Structure

```
notes-app/
├── backend/
│   ├── models/Note.js
│   ├── routes/notes.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── .github/workflows/ci.yml
```
