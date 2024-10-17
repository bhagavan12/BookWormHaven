// models/bookshelfBooks.js
const db = require('../config/db');

const BookshelfBooks = {
    addBook: (bookshelfId, bookId) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO bookshelves_books (bookshelf_id, book_id) VALUES (?, ?)';
            db.query(sql, [bookshelfId, bookId], (err, results) => {
                if (err) return reject(err);
                resolve(results.insertId); // Return the ID of the newly added book
            });
        });
    },
    getBooksByBookshelfId: (bookshelfId) => {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT b.* FROM books b
                JOIN bookshelves_books bb ON b.id = bb.book_id
                WHERE bb.bookshelf_id = ?
            `;
            db.query(sql, [bookshelfId], (err, results) => {
                if (err) return reject(err);
                resolve(results); 
            });
        });
    },
    checkBookExists: (bookshelfId, bookId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM bookshelves_books WHERE bookshelf_id = ? AND book_id = ?';
            db.query(sql, [bookshelfId, bookId], (err, results) => {
                if (err) return reject(err);
                resolve(results.length > 0); // Return true if the book exists, false otherwise
            });
        });
    },
    removeBook: (bookshelfId, bookId) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM bookshelves_books WHERE bookshelf_id = ? AND book_id = ?';
            db.query(sql, [bookshelfId, bookId], (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows); 
            });
        })
    }
};

module.exports = BookshelfBooks;
