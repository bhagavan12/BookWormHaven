// // controllers/bookController.js
// const bookModel = require('../models/bookModel');

// const fetchAllBooks = (req, res) => {
//     bookModel.getAllBooks((err, books) => {
//         if (err) {
//             return res.status(500).json({ error: 'An error occurred while fetching books.' });
//         }
//         res.status(200).json(books);
//     });
// };

// module.exports = {
//     fetchAllBooks,
// };

// controllers/bookController.js
const bookModel = require('../models/bookModel');

// Fetch all books
const fetchAllBooks = (req, res) => {
    bookModel.getAllBooks((err, books) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching books.' });
        }
        res.status(200).json(books);
    });
};

// Fetch books by genre
const fetchBooksByGenre = (req, res) => {
    const genre = req.params.genre;
    bookModel.getBooksByGenre(genre, (err, books) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching books by genre.' });
        }
        res.status(200).json(books);
    });
};

// Fetch books by author
const fetchBooksByAuthor = (req, res) => {
    const author = req.params.author;
    bookModel.getBooksByAuthor(author, (err, books) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching books by author.' });
        }
        res.status(200).json(books);
    });
};

// Fetch books by publication date
const fetchBooksByPublicationDate = (req, res) => {
    const date = req.params.date;
    bookModel.getBooksByPublicationDate(date, (err, books) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching books by publication date.' });
        }
        res.status(200).json(books);
    });
};

const searchBooks = (req, res) => {
    const { keyword } = req.query;
    bookModel.searchBooks(keyword, (err, books) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while searching for books.' });
        }
        res.status(200).json(books);
    });
};
const addBooks = (req, res) => {
    const booksDataArray = req.body.books; // Array of books should be sent in req.body.books
  
    // Validate input data
    if (!Array.isArray(booksDataArray) || booksDataArray.length === 0) {
      return res.status(400).json({ error: 'Please provide a valid array of books' });
    }
  
    // Call the model function to insert books
    bookModel.insertBooks(booksDataArray, (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to insert books into the database', details: error });
      }
      res.status(201).json({ message: 'Books added successfully', results });
    });
  };
module.exports = {
    fetchAllBooks,
    fetchBooksByGenre,
    fetchBooksByAuthor,
    fetchBooksByPublicationDate,
    searchBooks,
    addBooks
};
