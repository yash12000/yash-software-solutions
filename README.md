# 🚀 Yash Software Solutions

A role-based full-stack company management portal built using MERN stack.

---

## 📌 Project Overview

This application allows Admins, Employees, and Clients to manage projects, communicate, and track work progress efficiently.

---

## 👥 User Roles

### 🔐 Admin

* Create/remove employees
* Create projects
* Assign employees to projects
* Approve client service requests
* View all projects
* Manage users

### 👨‍💻 Employee

* View assigned projects
* Update project status

### 🧑‍💼 Client

* Request new services
* View their projects
* Track project status

---

## 🔄 Project Flow

Client → Request Service
Admin → Approves → Creates Project
Admin → Assigns Employee
Employee → Updates Status

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 🔐 Authentication

* JWT-based authentication
* Role-based access control
* Protected routes using middleware

---

## 📂 Project Structure

```
yash-software-solutions/
│
├── client/        # React Frontend
├── server/        # Node Backend
├── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-link>
cd yash-software-solutions
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=mongodb://127.0.0.1:27017/yash_db
JWT_SECRET=secret123
PORT=5000
```

Run server:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🌐 API Base URL

```
http://localhost:5000/api
```

---

## 🧪 Test Credentials

### Admin

```
Email: admin@test.com
Password: 123456
```

### Employee

```
Email: emp@test.com
Password: 123456
```

### Client

```
Email: client@test.com
Password: 123456
```

---

## 📸 Screenshots

(Add screenshots of:)

* Login Page
* Admin Dashboard
* Employee Dashboard
* Client Dashboard

---

## 🚀 Deployment

Frontend: Vercel
Backend: Render

---

## 💡 Key Features

* Role-based dashboards
* JWT authentication
* Project lifecycle management
* Employee assignment system
* Client service request flow
* Status tracking system

---

## 🧠 Future Improvements

* Real-time chat (Socket.io)
* File uploads
* Payment integration
* Notifications system

---

## 👨‍💻 Author

Yash Janbandhu

---