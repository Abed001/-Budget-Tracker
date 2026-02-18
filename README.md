# 💰 Fullstack Budget Tracker

A MERN stack application for real-time expense tracking and financial management.

## 🛠 Tech Stack
- **Frontend:** React, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Logging:** Morgan

## 🚀 Installation & Setup

1. **Clone the repository**
2. **Backend Setup:**
   - `cd backend`
   - `npm install`
   - Create a `.env` file with `MONGODB_URI=your_connection_string`
   - `npm start`
3. **Frontend Setup:**
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## 🛣 API Endpoints
- `GET /api/transactions` - List all records
- `GET /api/balance` - Get totals (Income/Expense/Balance)
- `POST /api/transactions` - Create new record
- `DELETE /api/transactions/:id` - Delete record

## 📝 Features
- Automated balance calculations on the backend.
- Persistent storage with MongoDB.
- Middleware for request logging and JSON parsing.