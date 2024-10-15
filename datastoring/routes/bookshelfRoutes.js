// routes/bookshelfRoutes.js
const express = require('express');
const router = express.Router();
const {
    createBookshelf,
    getAllBookshelves,
    getBooksInBookshelf,
    deleteBookshelf,
} = require('../controllers/bookshelfController');

// Create a new bookshelf
router.post('/', createBookshelf);

// Get all bookshelves for a user
router.get('/:userId', getAllBookshelves);

// Get all books in a specific bookshelf
router.get('/books/:bookshelfId', getBooksInBookshelf);

// Delete a bookshelf
router.delete('/:id', deleteBookshelf);

module.exports = router;
