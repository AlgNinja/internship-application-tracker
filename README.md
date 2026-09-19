# Internship Application Tracker

I wanted to take a step back and really understand how the frontend and backend connect, and why one would want to use a frontend framework. I used vanilla js to handled the frontend, and I didn't use AI (except for making the README, and a bit of css). This is a project that I will use to track my internship applications, so it's pretty minimal but enough to be practical

## Prerequisites

- Node.js installed
- PostgreSQL running locally
- Docker optional, if you want to run Postgres via Docker Compose

## 1) Install dependencies

Open a terminal in the project root and install the backend dependencies:

```bash
cd backend
npm install
```

## 2) Set up environment variables

Create a `.env` file inside the `backend` folder and fill in:

```env
PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

## 3) Start PostgreSQL

Create a .env file in the root directory and fill in these values
DB_NAME=
DB_USER=
DB_PASSWORD=

then type in:
```bash
docker-compose up -d
```

## 4) Start the backend server

From the `backend` folder:

```bash
node server.js
```

Or with auto-reload:

```bash
npm run dev
```

The server should start on the port in your `.env` file (for example, `http://localhost:3000`).

## Notes

- The app serves static frontend files from the `frontend` folder.
- The backend exposes API routes under `/api/applications`.
- The `applications` table is created automatically when the server starts if it does not already exist.
