// models/bookshelf.js
const db = require('../config/db');

const Bookshelf = {
    create: (userId, name, description) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO bookshelves (user_id, name, description) VALUES (?, ?, ?)';
            db.query(sql, [userId, name, description], (err, results) => {
                if (err) return reject(err);
                resolve(results.insertId); 
            });
        });
    },

    getAllByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM bookshelves WHERE user_id = ?';
            db.query(sql, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM bookshelves WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Return the bookshelf object
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM bookshelves WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows); 
            });
        });
    },
};

module.exports = Bookshelf;
