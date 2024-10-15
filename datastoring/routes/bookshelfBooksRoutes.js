// routes/bookshelfBooksRoutes.js
const express = require('express');
const router = express.Router();
const {
    addBookToBookshelf,
    removeBookFromBookshelf,
    checkBookInBookshelf
} = require('../controllers/bookshelfBooksController');
router.post('/', addBookToBookshelf);
router.delete('/:bookshelfId/:bookId', removeBookFromBookshelf);
router.get('/:bookshelfId/:bookId/check', checkBookInBookshelf);
module.exports = router;
