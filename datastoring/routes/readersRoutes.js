// routes/readersRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Adjust path based on your project structure
const router = express.Router();
const JWT_SECRET="qwertyuiop";
// Sign up a new reader
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO readers (username, email, password) VALUES (?, ?, ?)';
        connection.query(query, [username, email, hashedPassword], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error creating user' });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Log in a reader
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'SELECT * FROM readers WHERE username = ?';
        connection.query(query, [username], async (error, results) => {
            if (error || results.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const reader = results[0];
            const isMatch = await bcrypt.compare(password, reader.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Generate a token
            const token = jwt.sign({ id: reader.id, username: reader.username },JWT_SECRET , { expiresIn: '1h' });
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
