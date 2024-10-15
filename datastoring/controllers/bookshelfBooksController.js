// controllers/bookshelfBooksController.js
const BookshelfBooks = require('../models/bookshelfBooks');

const addBookToBookshelf = async (req, res) => {
    const { bookshelfId, bookId } = req.body;
    try {
        const recordId = await BookshelfBooks.addBook(bookshelfId, bookId);
        res.status(201).json({ id: recordId, bookshelfId, bookId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book to bookshelf', error });
    }
};

const removeBookFromBookshelf = async (req, res) => {
    const { bookshelfId, bookId } = req.params;
    try {
        const affectedRows = await BookshelfBooks.removeBook(bookshelfId, bookId);
        res.status(200).json({ message: 'Book removed from bookshelf', affectedRows });
    } catch (error) {
        res.status(500).json({ message: 'Error removing book from bookshelf', error });
    }
};
const checkBookInBookshelf = async (req, res) => {
    const { bookshelfId, bookId } = req.params;
    try {
        const exists = await BookshelfBooks.checkBookExists(bookshelfId, bookId);
        if (exists) {
            res.status(200).json({ exists: true, message: 'Book exists in the bookshelf' });
        } else {
            res.status(404).json({ exists: false, message: 'Book does not exist in the bookshelf' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking if book exists in bookshelf', error });
    }
};

module.exports = {
    addBookToBookshelf,
    removeBookFromBookshelf,
    checkBookInBookshelf
};
