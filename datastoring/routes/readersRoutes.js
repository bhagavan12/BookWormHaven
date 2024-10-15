// routes/readersRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Adjust path based on your project structure
const router = express.Router();
const JWT_SECRET="qwertyuiop";
const fs = require('fs');
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
            const email=reader.email;
            const rid=reader.id
            // Generate a token
            const token = jwt.sign({ id: reader.id, username: reader.username },JWT_SECRET , { expiresIn: '1h' });
            res.json({ token,username,email,rid});
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});


// File upload dependencies (if using multer for handling file uploads)
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads (stores in 'uploads/' directory)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API to upload or update profile image
router.post('/profile/upload/:readerId', upload.single('profileImage'), (req, res) => {
    const { readerId } = req.params;
    const profileImage = req.file ? req.file.filename : null;
    
    if (!profileImage) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    // Step 1: Check if the reader profile exists
    const checkQuery = 'SELECT * FROM reader_profiles WHERE reader_id = ?';
    connection.query(checkQuery, [readerId], (checkError, checkResults) => {
        if (checkError) {
            return res.status(500).json({ error: 'Error checking reader profile' });
        }

        if (checkResults.length > 0) {
             // Step 2: Delete the old profile image if it exists
             const currentImage = checkResults[0].profile_image;
             console.log(currentImage);
             if (currentImage) {
                const imagePath = path.join(__dirname, '..', 'uploads', currentImage); // Adjust based on your folder structure
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Error deleting old image: ${err}`);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            }
            // Step 2: If profile exists, update the profile image
            const updateQuery = 'UPDATE reader_profiles SET profile_image = ? WHERE reader_id = ?';
            connection.query(updateQuery, [profileImage, readerId], (updateError, updateResults) => {
                if (updateError) {
                    return res.status(500).json({ error: 'Error updating profile image' });
                }
                res.status(200).json({ message: 'Profile image updated successfully', profileImage });
            });
        } else {
            // Step 3: If profile does not exist, insert new profile record
            const insertQuery = 'INSERT INTO reader_profiles (reader_id, profile_image) VALUES (?, ?)';
            connection.query(insertQuery, [readerId, profileImage], (insertError, insertResults) => {
                if (insertError) {
                    return res.status(500).json({ error: 'Error inserting profile image' });
                }
                res.status(201).json({ message: 'Profile image uploaded successfully', profileImage });
            });
        }
    });
});


// API to update password
router.put('/update-password/:readerId', async (req, res) => {
    const { readerId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required' });
    }

    try {
        const query = 'SELECT password FROM readers WHERE id = ?';
        connection.query(query, [readerId], async (error, results) => {
            if (error || results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const reader = results[0];
            const isMatch = await bcrypt.compare(currentPassword, reader.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Current password is incorrect' });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            const updateQuery = 'UPDATE readers SET password = ? WHERE id = ?';
            connection.query(updateQuery, [hashedNewPassword, readerId], (updateError) => {
                if (updateError) {
                    return res.status(500).json({ error: 'Error updating password' });
                }
                res.status(200).json({ message: 'Password updated successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating password' });
    }
});

module.exports = router;


