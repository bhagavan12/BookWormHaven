// controllers/reviewsController.js
const Review = require('../models/reviewModel');

// Get reviews for a specific book
const getReviewsByBookId = async (req, res) => {
    const { bookId } = req.params;
    try {
        const reviews = await Review.getByBookId(bookId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
    }
};

// Create a new review
const createReview = async (req, res) => {
    const { reader_id, book_id, review } = req.body;
    try {
        await Review.create(reader_id, book_id, review);
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding review' });
    }
};

module.exports = {
    getReviewsByBookId,
    createReview,
};
