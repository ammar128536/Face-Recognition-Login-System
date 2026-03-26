# 🧠 Face Recognition Login System

A full-stack authentication system that allows users to **register and log in using their face** instead of passwords.
Built with **FastAPI (backend)**, **React (frontend)**, and **MongoDB (database)**.

---

## 🚀 Features

* 📸 Face Registration with username
* 🔐 Face-based Login Authentication
* 🧬 Face Embeddings using InsightFace
* ⚡ FastAPI backend for high performance APIs
* 🌐 React frontend with routing
* 🗄️ MongoDB for storing face embeddings
* 🔍 Cosine similarity for matching faces

---

## 🏗️ Tech Stack

### Backend

* FastAPI
* InsightFace
* OpenCV (cv2)
* NumPy
* Scikit-learn
* MongoDB (PyMongo)

### Frontend

* React
* React Router DOM

---

## 📂 Project Structure

```
project/
│
├── backend/
│   ├── main.py
│   ├── db.py
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/face-login-system.git
cd face-login-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
pip install fastapi uvicorn insightface opencv-python numpy scikit-learn pymongo
```

Run the backend server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔹 Register Face

```
POST /register-face
```

**Form Data:**

* `name`: string
* `file`: image file

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

### 🔹 Login with Face

```
POST /login-face
```

**Form Data:**

* `file`: image file

**Response:**

```json
{
  "message": "Login successful",
  "user": "username",
  "similarity": 0.87
}
```

---

## 🧠 How It Works

1. User uploads an image
2. Face is detected using InsightFace model (`buffalo_l`)
3. Face embedding is generated
4. During registration:

   * Embedding is stored in MongoDB
5. During login:

   * Input embedding is compared with stored embeddings
   * Cosine similarity is calculated
   * If similarity > **0.5**, login succeeds

---

## ⚠️ Important Notes

* Only **one face per image** is supported
* Good lighting improves accuracy
* Similarity threshold (`0.5`) can be adjusted
* If no face is detected → request fails

---

## 🔮 Future Improvements

* Multi-face detection support
* Face liveness detection (anti-spoofing)
* JWT authentication after login
* Better UI/UX
* Docker deployment
* Cloud deployment (AWS / GCP)

---




