# IGNITE Techfest 2026 — Official Platform
**IILM University, Greater Noida**
Prize Pool: ₹2,00,000 + Goodies | 35 Events | 3 Categories

## Quick Start (Development)

### Prerequisites
- Node.js 20+
- MongoDB 7 (local or Atlas)
- Firebase project with Auth, Firestore, Storage, FCM enabled

### 1. Clone & Install
```bash
git clone https://github.com/your-org/ignite-techfest-2026
cd ignite-techfest-2026

# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```

### 2. Configure Environment Variables
Copy and fill in:
- `server/.env` (see server/.env.example)
- `client/.env` (see client/.env.example)

### 3. Seed Events
```bash
cd server
node src/utils/seedEvents.js
```

### 4. Run Development Servers
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend  
cd client && npm run dev
```

Client: http://localhost:5173  
API: http://localhost:5000/api

## Docker (Production)
```bash
docker-compose up --build
```
Client: http://localhost  
API: http://localhost:5000/api

## Make a User Admin
```bash
# In MongoDB shell or Compass:
db.users.updateOne(
  { email: "admin@iilm.edu" },
  { $set: { role: "admin" } }
)
```

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT + Email OTP via Nodemailer
- **Firebase:** Firestore (support chat), FCM (push notifications), Storage (file uploads)
- **Deployment:** Docker + Docker Compose

## Support
ignite.techfest@iilm.edu
