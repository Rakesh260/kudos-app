# 🎉 Kudos App

A full-stack application where users can give weekly "kudos" (appreciation) to other users within their organization. Each user receives **3 kudos per week**, which **do not carry over**. Users can include a message when giving kudos and view the kudos they've received.

---

## 🧩 Tech Stack

- **Frontend:** Angular (standalone components, modularized)
- **Backend:** Django + Django REST Framework
- **Authentication:** JWT-based authentication
- **Database:** SQLite (for development)

---

## 📦 Features

- User registration & login with JWT tokens
- Organization-based user management
- Weekly kudos quota: 3 per week
- Give kudos with a custom message
- View kudos received from others
- Responsive, modern UI with modals/popups
- Protected routes (frontend + backend)
- Global HTTP Interceptor to send JWT in requests

---

## 🛠️ Setup Instructions

### 🚀 Backend (Django)

1. **Clone the repo** and navigate to the backend folder:

   ```bash
   git clone https://github.com/Rakesh260/kudos-app.git
   cd kudos-app/kudos-backend

2. **Create and activate a virtual environment:

    python -m venv env
   
    source env/bin/activate  # On Windows: env\Scripts\activate

4. **Install dependencies:
 
    pip install -r requirements.txt
   
5. **Run migrations and start server and  run custom command to populate dummy data in tables:

   python manage.py migrate
   
   python manage.py runserver
   
   python manage.py generate_dummy_data.py
