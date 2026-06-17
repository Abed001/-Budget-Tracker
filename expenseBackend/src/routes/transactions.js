const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions for logged-in user
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         example: 2024-03
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/transactions', authMiddleware, async (req, res) => {
    try {
        const filter = { userId: req.user.id };
        if (req.query.month) {
            filter.date = { $regex: `^${req.query.month}` };
        }
        const transactions = await Transaction.find(filter).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/transactions/summary/type:
 *   get:
 *     summary: Get transaction totals grouped by type
 *     responses:
 *       200:
 *         description: Income and expense totals
 */
router.get('/transactions/summary/type', authMiddleware, async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            { $match: { userId: req.user.id } },
            { $group: { _id: '$type', total: { $sum: '$amount' } } },
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get single transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction found
 *       404:
 *         description: Transaction not found
 */
router.get('/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (_error) {
        res.status(400).json({ error: 'Invalid transaction ID' });
    }
});

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               date:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Validation error
 */
router.post('/transactions', authMiddleware, async (req, res) => {
    try {
        const { title, amount, type, date, categoryId, note } = req.body;
        if (!title || !amount || !type) {
            return res.status(400).json({ error: 'title, amount, and type are required' });
        }
        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ error: 'type must be "income" or "expense"' });
        }
        const transaction = new Transaction({
            title,
            amount: Number(amount),
            type,
            date: date || new Date().toISOString().split('T')[0],
            categoryId: categoryId === 'general' || !categoryId ? null : categoryId,
            note: note || '',
            userId: req.user.id,
        });
        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction updated
 *       404:
 *         description: Transaction not found
 */
router.put('/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        const { title, amount, type, date, categoryId, note } = req.body;
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

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */
router.delete('/transactions/:id', authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(204).end();
    } catch (_error) {
        res.status(400).json({ error: 'Invalid transaction ID' });
    }
});
/**
 * @swagger
 * /api/balance:
 *   get:
 *     summary: Get income, expense and balance totals
 *     responses:
 *       200:
 *         description: Returns income, expense, balance
 */
router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        const income = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        res.json({ income, expense, balance: income - expense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;