# CipherSQLStudio

SQL learning platform for beginners — practice queries on MongoDB sandbox, get AI hints (no spoilers), and see results in a table.

**Frontend**: React (Vite) + Monaco Editor + SCSS  
**Backend**: Node.js + Express + MongoDB  
**AI Hints**: Groq API (free tier)

## Features
- Assignment list with title, difficulty, description
- Attempt page: question, sample data, SQL editor, results table, hint button
- Secure SELECT-only queries
- Mobile-responsive design

## Folder Structure

```text
cipher-sql-studio/
│
├── backend/
│   │
│   ├── node_modules/
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package-lock.json
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md
Setup Instructions
Prerequisites

Node.js 18+
MongoDB (local or MongoDB Atlas free tier)

Backend Setup

cd backend
Install dependencies:Bashnpm install express cors dotenv mongoose axios
Copy .env.example → .env and fill:textPORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/ciphersql_db
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
Start backend:npm start

Frontend Setup

cd frontend
Install dependencies:Bashnpm install @monaco-editor/react axios sass react-router-dom
Copy .env.example → .env:textVITE_API_URL=http://localhost:3000/api
Start frontend:npm run dev Open: http://localhost:5173

Environment Variables
Backend (.env)

PORT → Server port (default 3000)
MONGO_URL → MongoDB connection string
GROQ_API_KEY → Groq API key for hints
FRONTEND_URL → CORS allowed origin

Frontend (.env)

VITE_API_URL → Backend API base URL

Screenshots
Assignment List Page

Attempt Page<img width="1897" height="870" alt="assignment-page png" src="https://github.com/user-attachments/assets/05de0d87-de5a-400d-87dc-4adcd8f8f431" />

<img src="screenshots/attempt-page.png" alt="Attempt Page">
