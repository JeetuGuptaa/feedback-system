# User Feedback System

A simple full-stack application to collect, store, and display user feedback with filtering, sorting, pagination.

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (via Mongoose)
- **Frontend:** Vite, React, Ant Design, Tailwind CSS, React Router
- **HTTP Client:** Axios

---

## Folder Structure

```
feedback-system/
├── backend/                # Express API server
│   ├── controllers/        # Route handlers
│   │   └── feedbackController.js
│   ├── models/             # Mongoose schemas
│   │   └── Feedback.js
│   ├── routes/             # Express routers
│   │   └── feedback.js
│   ├── config/             # Shared constants
│   │   └── constants.js
│   ├── .env                # Environment variables (MONGO_URI, PORT)
│   ├── package.json        # Backend dependencies & scripts
│   └── server.js           # App entrypoint

└── frontend/               # React + Vite client
    ├── index.html          # HTML template
    ├── package.json        # Frontend dependencies & scripts
    ├── vite.config.js      # Vite configuration
    ├── tailwind.config.js  # Tailwind setup
    ├── postcss.config.js   # PostCSS setup
    └── src/
        ├── main.jsx        # React entrypoint
        ├── App.jsx         # Layout & routing
        ├── services/       # Axios instance
        │   └── api.js
        ├── pages/          # Top-level routes
        │   ├── FeedbackPage.jsx
        │   └── DashboardPage.jsx
        └── components/     # Reusable UI pieces
            ├── FeedbackForm.jsx
            └── FeedbackDashboard.jsx
```

---

## Prerequisites

- **Node.js** installed

---

## Setup & Run

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file and set variables:
   ```bash
   cp .env.example .env
   # Edit .env, set DATABASE_CONNECTION_USER, DATABASE_CONNECTION_PASSWORD and PORT
   ```
4. Start the server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:<PORT>` (default 4000).

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` by default.

---

## Environment Variables

**Backend** (`backend/.env`)

```
DATABASE_CONNECTION_USER=username
DATABASE_CONNECTION_PASSWORD=password
PORT=4000
```

**Frontend**

No environment variables are required unless you need to adjust the API base URL in `src/services/api.js`.

---

## API Reference

### Submit Feedback

- **Endpoint:** `POST /feedback`
- **Payload:**
  ```json
  {
    "name": "String",
    "email": "String",
    "category": "suggestion|bug report|feature request|other",
    "text": "String"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {},
    "message": "Feedback saved successfully."
  }
  ```

### Retrieve Feedbacks

- **Endpoint:** `GET /feedback`
- **Query Params:**
  - `page` (number, default 1)
  - `limit` (number, default 10)
  - `sort` (field, default `createdAt`)
  - `order` (`asc`|`desc`, default `desc`)
  - `category` (optional filter)
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "feedbacks": [ /* array of feedback objects */ ],
      "meta": {
        "total": 120,
        "page": 1,
        "limit": 10,
        "totalPages": 12
      }
    },
    "message": "Feedback retrieved successfully."
  }
  ```

---

## Available Scripts

### Backend
- `npm start` — start Express server

### Frontend
- `npm run dev` — launch Vite dev server
- `npm run build` — build production assets
- `npm run serve` — preview production build

---

## License

MIT © JeetuGuptaa

