const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories for logged-in user
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/categories', authMiddleware, async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 */
router.post('/categories', authMiddleware, async (req, res) => {
    try {
        const { name, type } = req.body;
        if (!name || !type) {
            return res.status(400).json({ error: 'Name and type are required' });
        }
        const category = new Category({ name, type, userId: req.user.id });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put('/categories/:id', authMiddleware, async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id,
            userId: req.user.id,
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

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete('/categories/:id', authMiddleware, async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;