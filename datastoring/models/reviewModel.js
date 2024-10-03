// models/reviewModel.js
const connection = require('../config/db');

const Review = {
    create: (reader_id, book_id, review) => {
        // Format created_at to match MySQL DATETIME format
        const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(createdAt);
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO reviews (reader_id, book_id, review, createdAt) VALUES (?, ?, ?, ?)';
            connection.query(query, [reader_id, book_id, review], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });

        });
    },
    getByBookId: (book_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM reviews WHERE book_id = ?';
            connection.query(query, [book_id], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
};

module.exports = Review;
