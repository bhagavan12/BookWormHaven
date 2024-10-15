// controllers/bookshelfController.js
const Bookshelf = require('../models/bookshelf');
const BookshelfBooks = require('../models/bookshelfBooks');

const createBookshelf = async (req, res) => {
    const { userId, name, description } = req.body;
    try {
        const bookshelfId = await Bookshelf.create(userId, name, description);
        res.status(201).json({ id: bookshelfId, name, description });
    } catch (error) {
        res.status(500).json({ message: 'Error creating bookshelf', error });
    }
};

const getAllBookshelves = async (req, res) => {
    const { userId } = req.params;
    try {
        const bookshelves = await Bookshelf.getAllByUserId(userId);
        res.status(200).json(bookshelves);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookshelves', error });
    }
};

const getBooksInBookshelf = async (req, res) => {
    const { bookshelfId } = req.params;
    try {
        const books = await BookshelfBooks.getBooksByBookshelfId(bookshelfId);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error });
    }
};

const deleteBookshelf = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Bookshelf.delete(id);
        res.status(200).json({ message: 'Bookshelf deleted', affectedRows });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bookshelf', error });
    }
};

module.exports = {
    createBookshelf,
    getAllBookshelves,
    getBooksInBookshelf,
    deleteBookshelf,
};
