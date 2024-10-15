const express = require('express');
const router = express.Router();
const ReaderProgressController = require('../controllers/progressController');

// Update or insert reading progress
router.post('/update', ReaderProgressController.updateProgress);

// Get reading progress for a specific book
router.get('/progress/:readerId/:bookId', ReaderProgressController.getProgressByBook);

// Get current reading books for a user
router.get('/current/:readerId', ReaderProgressController.getCurrentReadingBooks);

// Get completed books for a user
router.get('/completed/:readerId', ReaderProgressController.getCompletedBooks);
router.post('/updateTotalPages', ReaderProgressController.updateTotalPages);
module.exports = router;
