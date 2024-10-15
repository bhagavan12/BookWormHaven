const db = require('../config/db');

const ReaderProgress = {
    // Insert or update progress when moving to the next page
    updateProgress: ({ readerId, bookId, currentPage, statusOfBook ,totalPages}) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE reader_progress 
                         SET current_page = ?, status_of_book = ?, total_pages= ?, updated_at = NOW() 
                         WHERE reader_id = ? AND book_id = ?`;
            db.query(sql, [currentPage, statusOfBook, totalPages ,readerId, bookId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    createProgress: ({ readerId, bookId, currentPage, statusOfBook, startDate, totalPages }) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO reader_progress (reader_id, book_id, current_page, status_of_book, start_date, total_pages, updated_at) 
                         VALUES (?, ?, ?, ?, ?, ?, NOW())`;
            db.query(sql, [readerId, bookId, currentPage, statusOfBook, startDate,totalPages], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    // Fetch progress for a specific book and reader
    getProgressByBook: (readerId, bookId) => {
        // console.log("Parameters getProgressByBook:", [readerId,bookId]);
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM reader_progress WHERE reader_id = ? AND book_id = ?';
            db.query(sql, [readerId, bookId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },

    // Fetch all books currently being read by a user (in_progress status)
    getCurrentReadingBooks: (readerId) => {
        // console.log("Parameters getCurrentReadingBooks:", [readerId]);
        return new Promise((resolve, reject) => {
            // const sql = 'SELECT * FROM reader_progress WHERE reader_id = ? AND status_of_book = "in_progress" ORDER BY start_date DESC';
            const sql = 'SELECT rp.*, b.* FROM reader_progress rp JOIN books b ON rp.book_id = b.id WHERE rp.reader_id = ? AND rp.status_of_book = "in_progress" ORDER BY rp.start_date DESC';
            // console.log("SQL Query:", sql);
            db.query(sql, [readerId], (err, results) => {
                if (err) {
                    // console.error("Error fetching current reading books:", err);
                    return reject(err);
                }
                console.log("Fetched books:", results); // For debugging
                resolve(results);
            });
        });
    },

    // Fetch all completed books for a user
    getCompletedBooks: (readerId) => {
        // console.log("Parameters getCompletedBooks:", [readerId]);
        return new Promise((resolve, reject) => {
            const sql = 'SELECT rp.*, b.* FROM reader_progress rp JOIN books b ON rp.book_id = b.id WHERE rp.reader_id = ? AND rp.status_of_book = "completed" ORDER BY rp.start_date DESC';
            // const sql = 'SELECT * FROM reader_progress WHERE reader_id = ? AND status_of_book = "completed" ORDER BY updated_at DESC';
            // console.log("SQL Query:", sql);
            db.query(sql, [readerId], (err, results) => {
                if (err) {
                    console.error("Error fetching completed books:", err);
                    return reject(err);
                }
                // console.log("Fetched books:", results); // For debugging
                resolve(results);
            });
        });
    },
    updateTotalPages: ({ readerId, bookId, totalPages }) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE reader_progress 
                         SET total_pages = ?, updated_at = NOW() 
                         WHERE reader_id = ? AND book_id = ?`;
            db.query(sql, [totalPages, readerId, bookId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
    
};

module.exports = ReaderProgress;

// getProgressByReaderAndBook : (readerId, bookId) => {
    //     return new Promise((resolve, reject) => {
        //         const sql = 'SELECT * FROM reader_progress WHERE reader_id = ? AND book_id = ?';
        //         db.query(sql, [readerId, bookId], (err, result) => {
            //             if (err) return reject(err);
            //             resolve(result[0]); // Return the existing progress or null
            //         });
            //     });
// },
            // // Fetch all completed books for a user
            // getCompletedBooks: (readerId) => {
                //     return new Promise((resolve, reject) => {
                    //         const sql = 'SELECT * FROM reader_progress WHERE reader_id = ? AND status_of_book = "completed" ORDER BY updated_at DESC';
                    //         db.query(sql, [readerId], (err, results) => {
            //             if (err) return reject(err);
            //             resolve(results);
            //         });
            //     });
            // }