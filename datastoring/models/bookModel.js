// // models/bookModel.js
// const connection = require('../config/db');

// const getAllBooks = (callback) => {
//     const query = 'SELECT * FROM books';
//     connection.query(query, (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }
//         callback(null, results);
//     });
// };

// module.exports = {
//     getAllBooks,
// };

// models/bookModel.js
const connection = require('../config/db');

// Get all books
const getAllBooks = (callback) => {
    const query = 'SELECT * FROM books';
    connection.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Get books by genre
const getBooksByGenre = (genre, callback) => {
    const query = 'SELECT * FROM books WHERE genre = ?';
    connection.query(query, [genre], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Get books by author
const getBooksByAuthor = (author, callback) => {
    const query = 'SELECT * FROM books WHERE authors LIKE ?';
    connection.query(query, [`%${author}%`], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Get books by publication date
const getBooksByPublicationDate = (date, callback) => {
    const query = 'SELECT * FROM books WHERE publishDate = ?';
    connection.query(query, [date], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Search books by keyword
const searchBooks = (keyword, callback) => {
    const query = `
        SELECT * FROM books
        WHERE title LIKE ? OR description LIKE ?
    `;
    connection.query(query, [`%${keyword}%`, `%${keyword}%`], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getAllBooks,
    getBooksByGenre,
    getBooksByAuthor,
    getBooksByPublicationDate,
    searchBooks,
};
