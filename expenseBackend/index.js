const express = require("express")
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const authMiddleware = require('./src/middleware/auth')

const app = express()
const PORT = 3001

// IMPORTANT: Order matters - put these FIRST
app.use(express.json())
app.use(cors())

// Connect to MongoDB
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

// Import models and routes
const Transaction = require('./src/models/transaction')
const authRoutes = require('./src/routes/auth')

// Mount auth routes FIRST
app.use('/api/auth', authRoutes)

// Profile route (protected)
app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({
        message: "Success!",
        user: req.user
    });
});

// Dashboard route (protected)
app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to your dashboard',
        user: req.user
    });
});
// Test route to verify server is working
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' })
})

// ALL YOUR OTHER ROUTES HERE
app.get('/api/transactions', (request, response) => {
    Transaction.find({}).then(records => {
        response.json(records)
    })
})

app.get('/api/balance', (request, response) => {
    Transaction.find({}).then(transactions => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
        return response.json({ income, expense, balance: income - expense })
    })
})

app.get('/api/transactions/:id', (request, response) => {
    Transaction.findById(request.params.id)
        .then(transaction => {
            if (transaction) {
                response.json(transaction)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.delete('/api/transactions/:id', (request, response) => {
    Transaction.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.post('/api/transactions', (request, response) => {
    const body = request.body
    if (!body.title || !body.amount || !body.type) {
        return response.status(400).json({ error: 'title, amount, or type missing' })
    }

    const transaction = new Transaction({
        title: body.title,
        amount: Number(body.amount),
        type: body.type,
        date: body.date || new Date().toISOString().split('T')[0]
    })

    transaction.save().then(savedTransaction => {
        response.json(savedTransaction)
    })
})

// REMOVE all the auth middleware routes for now - we'll add them back AFTER signup/login works
// NO profile, dashboard, or refresh routes yet

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})