# Subscription-task

📦 Subscription Management System

A full-stack web application to manage subscriptions with authentication, payment handling, and user dashboard.

🚀 Tech Stack
Frontend
React (Vite)
Tailwind CSS
Backend
Node.js
Express.js
Database
MongoDB Atlas
Deployment
Render
📁 Project Structure
Subscription-task/
 └── task/
      ├── client/   # Frontend (React)
      └── server/   # Backend (Node + Express)
✨ Features
🔐 User Authentication (Login / Register)
📦 Subscription Plans
📊 Dashboard
🌐 API Integration
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Yuvaranirajan/Subscription-task.git
cd Subscription-task
2️⃣ Backend Setup
cd task/server
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

Run backend:

npm start
3️⃣ Frontend Setup
cd task/client
npm install
npm run dev
🌍 Environment Variables
Backend (task/server/.env)
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET
JWT_REFRESH_SECRET
☁️ Deployment (Render)
Backend
Root Directory: task/server
Build Command: npm install
Start Command: npm start
Start the seeding file for plans and admin
Frontend
Root Directory: task/client
Build Command: npm run build
Publish Directory: dist
🔗 API Base URL
https://subscription-task.onrender.com

👩‍💻 Author
Yuvarani R
6383340535
