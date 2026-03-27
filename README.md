# 🌟 Theertha Portfolio Website

A full-stack portfolio website for Theertha, built with **Node.js + Express + MongoDB** (backend) and **HTML + CSS + JavaScript** (frontend).

---

## 📁 Project Structure

```
Theer_tha_portfolio/
├── Backend/
│   ├── models/
│   │   ├── Attendance.js
│   │   ├── Achievement.js
│   │   ├── Contact.js
│   │   └── Skill.js
│   ├── routes/
│   │   ├── attendance.js
│   │   ├── achievements.js
│   │   ├── contact.js
│   │   └── skills.js
│   ├── .env              ← Your environment variables
│   ├── package.json
│   ├── seed.js           ← Populate DB with sample data
│   └── server.js
└── Frontend/
    ├── assets/
    │   └── profile.png
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── index.html
```

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally

### 1. Start MongoDB
Make sure MongoDB is running on your machine (default port `27017`).

### 2. Install Backend Dependencies
```bash
cd Backend
npm install
```

### 3. Seed the Database (first time only)
```bash
node seed.js
```
This populates MongoDB with sample skills, achievements, and attendance records.

### 4. Start the Backend Server
```bash
npm run dev    # Development (with auto-reload)
# or
npm start      # Production
```

The server starts at **http://localhost:5000**

### 5. Open the Frontend
Open your browser and go to: **http://localhost:5000**

The backend automatically serves the frontend files from the `Frontend/` folder.

---

## 🌐 Deploying to Render (Live)

### Step 1: Push to GitHub
Push the entire `Theer_tha_portfolio` folder to a GitHub repository.

### Step 2: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (`0.0.0.0/0`)
5. Copy your **Connection String** (looks like: `mongodb+srv://...`)

### Step 3: Deploy Backend on Render
1. Go to [render.com](https://render.com) → New → **Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables**:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `PORT` = `5000`
5. Click **Deploy**

### Step 4: Deploy Frontend on Render
1. Go to Render → New → **Static Site**
2. Connect the same GitHub repo
3. Settings:
   - **Root Directory**: `Frontend`
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `.`
4. Update the `API_BASE` in `Frontend/js/main.js`:
   ```js
   const API_BASE = 'https://your-backend-name.onrender.com/api';
   ```
5. Click **Deploy**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | Get all skills |
| POST | `/api/skills` | Add a skill |
| GET | `/api/achievements` | Get all achievements |
| POST | `/api/achievements` | Add an achievement |
| GET | `/api/attendance` | Get attendance records |
| POST | `/api/attendance` | Add attendance record |
| PUT | `/api/attendance/:id` | Update record |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/health` | Health check |

---

## ✏️ Customizing Your Data

Edit `Backend/seed.js` to change the skills, achievements, and attendance data, then re-run:
```bash
node seed.js
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (Glassmorphism), Vanilla JS |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Hosting | Render (Web Service + Static Site) |
| Fonts | Google Fonts (Outfit + Inter) |
| Icons | Font Awesome 6 |
