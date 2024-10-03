const express = require('express');
const router = express.Router();
const { getAllAuthors } = require('../controllers/authorsController');

// Route to get all authors
router.get('/', getAllAuthors);

module.exports = router;
