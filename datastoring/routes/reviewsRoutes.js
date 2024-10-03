// routes/reviewsRoutes.js
const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// Route to get reviews by book ID
router.get('/book/:bookId', reviewsController.getReviewsByBookId);

// Route to create a new review
router.post('/', reviewsController.createReview);

module.exports = router;
