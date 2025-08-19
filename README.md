# 🧭 Route Optimizer App

A **React + Node.js** project that allows authenticated users to draw **optimized routes** between two points (A → B) using **Leaflet / Google Maps** and Firebase Authentication.  

---

## 📂 Project Structure

route-app/
│── frontend/ # React + Vite frontend
│── backend/ # Node.js + Express backend

yaml
Copy
Edit

---

## 🔐 Features

- ✅ User authentication (Google / Email & Password via Firebase)  
- 🗺 Interactive map using Leaflet  
- 📍 Select Point A and Point B on map or input manually  
- 🚗 Draw optimized route between points  
- 📊 Show distance & travel time  
- 📱 Responsive UI  
- 🎯 Bonus: Start from current location  

---

## ⚡ Tech Stack

- **Frontend** → React (Vite), Firebase Auth, Leaflet  
- **Backend** → Node.js, Express, Firebase Admin SDK  
- **Auth** → Firebase Authentication (Google / Email-Password)  
- **Map API** → Leaflet Routing Machine (OpenStreetMap) or Google Directions API  

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Dhanapalan-G/route-app.git
cd route-app
2️⃣ Backend Setup
Navigate to backend folder:

bash
Copy
Edit
cd backend
npm install
Create a .env file in backend/ with your Firebase and Google Maps config:

env
Copy
Edit
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXX...\n-----END PRIVATE KEY-----\n"
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
⚠️ Important: The private key must include \n for line breaks.

Start backend server:

bash
Copy
Edit
npm run dev
Backend runs on → http://localhost:5000

3️⃣ Frontend Setup
Navigate to frontend folder:

bash
Copy
Edit
cd ../frontend
npm install
Create a .env file in frontend/:

env
Copy
Edit
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_URL=http://localhost:5000
Start frontend app:

bash
Copy
Edit
npm run dev
Frontend runs on → http://localhost:5173

🔑 Firebase Authentication Setup
Go to Firebase Console

Create a new project

Enable Authentication → Sign-in method

Google Sign-in

Email/Password

Generate Firebase config and paste values in .env files

🗺 Map Setup
Default: Leaflet + Leaflet Routing Machine (uses OpenStreetMap → free & no API key needed).

Optional: Use Google Directions API → requires GOOGLE_MAPS_API_KEY in backend .env.
