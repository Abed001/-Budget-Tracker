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
const Category = require('./src/models/Category');
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
app.get('/api/transactions', authMiddleware, (request, response) => {
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

// ========== TRANSACTION ROUTES ==========

// GET all transactions for logged-in user (with optional month filter)
app.get('/api/transactions', authMiddleware, async (req, res) => {
    try {
        const filter = { userId: req.user.id };

        // Optional month filter: ?month=2024-03
        if (req.query.month) {
            filter.date = { $regex: `^${req.query.month}` }; // Matches "2024-03-xx"
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET balance for logged-in user
app.get('/api/balance', authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        res.json({ income, expense, balance: income - expense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single transaction by ID
app.get('/api/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: 'Invalid transaction ID' });
    }
});

// POST create new transaction
app.post('/api/transactions', authMiddleware, async (req, res) => {
    try {
        const { title, amount, type, date, categoryId, note } = req.body;

        // Validate required fields
        if (!title || !amount || !type) {
            return res.status(400).json({
                error: 'title, amount, and type are required'
            });
        }

        // Validate type
        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({
                error: 'type must be "income" or "expense"'
            });
        }

        const transaction = new Transaction({
            title,
            amount: Number(amount),
            type,
            date: date || new Date().toISOString().split('T')[0],
            categoryId: categoryId || null,
            note: note || '',
            userId: req.user.id
        });

        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update transaction
app.put('/api/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const { title, amount, type, date, categoryId, note } = req.body;

        // Update only fields that are provided
        if (title) transaction.title = title;
        if (amount) transaction.amount = Number(amount);
        if (type) {
            if (!['income', 'expense'].includes(type)) {
                return res.status(400).json({ error: 'type must be "income" or "expense"' });
            }
            transaction.type = type;
        }
        if (date) transaction.date = date;
        if (categoryId !== undefined) transaction.categoryId = categoryId;
        if (note !== undefined) transaction.note = note;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE transaction
app.delete('/api/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: 'Invalid transaction ID' });
    }
});

// ========== CATEGORY ROUTES ==========

// GET all categories for logged-in user
app.get('/api/categories', authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create a new category
app.post('/api/categories', authMiddleware, async (req, res) => {
    try {
        const { name, type } = req.body;

        if (!name || !type) {
            return res.status(400).json({ error: 'Name and type are required' });
        }

        const category = new Category({
            name,
            type,
            userId: req.user.id
        });

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update a category
app.put('/api/categories/:id', authMiddleware, async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id,
            userId: req.user.id  // Ensure user owns this category
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const { name, type } = req.body;
        if (name) category.name = name;
        if (type) category.type = type;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a category
app.delete('/api/categories/:id', authMiddleware, async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id  // Ensure user owns this category
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})