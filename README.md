# Task Manager (Django + React)

A full‑stack Task Manager application built with **Django REST Framework** (backend) and **React** (frontend). It supports authentication using JWT, task CRUD operations, filtering, progress tracking, and a clean UI.

---

## Features

- User registration & login (JWT authentication)
- Create, update, delete tasks
- Mark tasks as completed / pending
- Filter tasks: All / Completed / Pending
- Task progress indicator
- Logout functionality
- Protected routes
- REST API backend

---

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SimpleJWT
- SQLite (default)

### Frontend
- React
- React Router
- Axios
- CSS

---

## Project Structure

```
TASK-MANAGER/
│
├── server/                # Django backend
│   ├── manage.py
│   ├── server/
│   ├── tasks/
│   └── venv/
│
├── frontend/              # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Backend Setup (Django)

### 1. Clone the repository

```
git clone https://github.com/Aldrin-Joy/task-manager.git
cd task-manager/server
```

### 2. Create & activate virtual environment

```
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies

```
pip install -r requirements.txt
```

### 4. Apply migrations

```
python manage.py makemigrations
python manage.py migrate
```

### 5. Run backend server

```
python manage.py runserver
```

Backend will run at:
```
http://127.0.0.1:8000/
```

---

## Frontend Setup (React)

### 1. Open frontend folder

```
cd ../frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Start React app

```
npm start
```

Frontend will run at:
```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint              | Description              |
|------|-----------------------|--------------------------|
| POST | /api/register/         | Register user            |
| POST | /api/token/            | Login (JWT token)        |
| GET  | /api/tasks/            | Get tasks                |
| POST | /api/tasks/            | Create task              |
| PATCH| /api/tasks/:id/        | Update task              |
| DELETE | /api/tasks/:id/      | Delete task              |

---

## Environment Notes

- Ensure backend runs on `127.0.0.1:8000`
- Axios base URL is configured in `frontend/src/api.js`
- JWT token is stored in `localStorage`

---

## Screenshots 



---

## Future Improvements

- User profile page
- Deployment (Docker / Render / Vercel)

---

## License

This project is for educational purposes.

---

## Author

**Aldrin Joy**

