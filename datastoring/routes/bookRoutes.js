// // routes/bookRoutes.js
// const express = require('express');
// const router = express.Router();
// const bookController = require('../controllers/bookController');

// router.get('/', bookController.fetchAllBooks);

// module.exports = router;

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Fetch all books
router.get('/', bookController.fetchAllBooks);

// Fetch books by genre
router.get('/genre/:genre', bookController.fetchBooksByGenre);

// Fetch books by author
router.get('/author/:author', bookController.fetchBooksByAuthor);

// Fetch books by publication date
router.get('/publication-date/:date', bookController.fetchBooksByPublicationDate);

// Search books by keyword
router.get('/search', bookController.searchBooks);

module.exports = router;
