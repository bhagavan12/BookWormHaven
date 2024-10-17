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

// Function to insert multiple books into the database
const insertBooks = (booksDataArray, callback) => {
  const query = `
    INSERT INTO books (id,title, authors, publishDate, publishers, languages, pages, subjects, description, freeToRead, freeToRead_url, cover_url, genre)
    VALUES ?
  `;

  // Prepare data for multiple books insertion
  const values = booksDataArray.map(book => {
    const {
        id,
      title,
      authors,         // Array of author names
      publishDate,
      publishers,      // Array of publisher names
      languages,       // Array of languages
      pages,
      subjects,        // Array of subjects
      description,
      freeToRead,
      freeToRead_url,
      cover_url,
      genre
    } = book;

    // Return the array of values for each book
    return [
        id,
      title,
      JSON.stringify(authors),      // Convert to JSON string
      publishDate,
      JSON.stringify(publishers),   // Convert to JSON string
      JSON.stringify(languages),     // Convert to JSON string
      pages,
      JSON.stringify(subjects),      // Convert to JSON string
      description,
      freeToRead,
      freeToRead_url,
      cover_url,
      genre
    ];
  });

  // Execute the query with multiple rows at once
  connection.query(
    query,
    [values], // Use array of arrays
    (error, results) => {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    }
  );
};



module.exports = {
    getAllBooks,
    getBooksByGenre,
    getBooksByAuthor,
    getBooksByPublicationDate,
    searchBooks,
    insertBooks
};
