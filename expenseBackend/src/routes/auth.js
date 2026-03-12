const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // This links to your Day 11 User model

router.post('/signup', async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log('3. Email:', email)

        // Check if user already exists
        console.log('4. Checking if user exists...')
        const userExists = await User.findOne({ email });
        console.log('5. User exists check complete:', userExists)

        if (userExists) {
            console.log('6. User already exists')
            return res.status(400).json({ error: "User already exists" });
        }
        // Create new user
        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        // Compare typed password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        // Create the Token (The "Wristband")
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;