# 💰 Fullstack Budget Tracker

A full-stack expense tracking app built with the MERN stack.  
Track your income and expenses, visualize your spending habits, and take control of your finances.

## 🧩 Problem
Most people have no clear picture of where their money goes.  
Spreadsheets are tedious, banking apps don't categorize well, and most budget tools are overkill.  
This app gives you a clean, fast way to log and understand your finances.

## 💡 Why It Matters
Small daily expenses add up silently.  
Visibility creates accountability — and accountability changes behavior.

## 🛠 Tech Stack
- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Logging:** Morgan
- **Auth:** JWT + bcrypt

## ✅ Features (MVP)
- User authentication (register/login)
- Add, view, and delete transactions
- Income vs expense categorization
- Real-time balance calculation
- Dashboard with spending overview
- Filter transactions by type/date

## 📸 Screenshots
<img width="1920" height="955" alt="Screenshot (60)" src="https://github.com/user-attachments/assets/3106a450-9f78-42bf-bfef-6bc37da15dcc" />
<img width="1920" height="953" alt="Screenshot (59)" src="https://github.com/user-attachments/assets/192bbe27-6223-48d7-96de-da76242af113" />


## 🛣 API Endpoints
- `GET /api/transactions` — List all records
- `GET /api/balance` — Get totals (Income / Expense / Balance)
- `POST /api/transactions` — Create new record

## ⚙️ Local Setup

1. Clone the repo
   git clone https://github.com/Abed001/-Budget-Tracker.git

2. Install root dependencies
   npm install

3. Backend
   cd expenseBackend
   npm install

4. Frontend
   cd expenseFrontend
   npm install

5. Run both together from root
   npm run dev:all

## 🔐 Environment Variables

Create a `.env` file in `/backend`:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

## 📜 NPM Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |

## 📁 Folder Structure

budget-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
- `DELETE /api/transactions/:id` — Delete record
