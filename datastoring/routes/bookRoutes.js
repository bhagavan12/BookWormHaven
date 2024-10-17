// // routes/bookRoutes.js
// const express = require('express');
// const router = express.Router();
// const bookController = require('../controllers/bookController');

// router.get('/', bookController.fetchAllBooks);

// module.exports = router;

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
router.get('/', bookController.fetchAllBooks);
router.get('/genre/:genre', bookController.fetchBooksByGenre);
router.get('/author/:author', bookController.fetchBooksByAuthor);
router.get('/publication-date/:date', bookController.fetchBooksByPublicationDate);
router.get('/search', bookController.searchBooks);
router.post('/addbooks',bookController.addBooks);
module.exports = router;
