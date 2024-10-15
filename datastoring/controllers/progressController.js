const ReaderProgress = require('../models/readerProgress');

// Update or insert reading progress
const ReaderProgressController = {
    updateProgress: async (req, res) => {
        const { readerId, bookId, currentPage, totalPages ,statusOfBook} = req.body;
        // console.log(req.body);
        try {
            // Check if a progress row already exists for this reader and book
            const existingProgress = await ReaderProgress.getProgressByBook(readerId, bookId);

            if (existingProgress) {
                // If progress exists, update the row (do not create a new row)
                await ReaderProgress.updateProgress({
                    readerId,
                    bookId,
                    currentPage,
                    statusOfBook,
                    totalPages
                });
                res.status(200).json({ message: 'Progress updated successfully' });
            } else {
                // If no progress exists, create a new entry (this will only happen when starting the book)
                await ReaderProgress.createProgress({
                    readerId,
                    bookId,
                    currentPage,
                    statusOfBook,
                    startDate: new Date(),
                    totalPages
                });
                res.status(201).json({ message: 'Progress started successfully' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },



    // Fetch progress of a specific book
    getProgressByBook: async (req, res) => {
        const { readerId, bookId } = req.params;
        try {
            const progress = await ReaderProgress.getProgressByBook(readerId, bookId);
            res.status(200).json(progress);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Fetch all books currently being read by a user (in_progress status)
    getCurrentReadingBooks: async (req, res) => {
        // console.log('Fetching current reading books for reader:', req.params.readerId);  // Debugging log
        const { readerId } = req.params;
        try {
            const books = await ReaderProgress.getCurrentReadingBooks(readerId);
            // console.log("Fetched books:", books);  // Debugging log
            res.status(200).json(books);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    // Fetch all completed books by a user
    getCompletedBooks: async (req, res) => {
        // console.log('Fetching completed books for reader:', req.params.readerId);  // Debugging log
        const { readerId } = req.params;
        try {
            const books = await ReaderProgress.getCompletedBooks(readerId);
            // console.log("Fetched books:", books);  // Debugging log
            res.status(200).json(books);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    updateTotalPages : async (req, res) => {
        const { readerId, bookId, totalPages } = req.body;
        try {
            await ReaderProgress.updateTotalPages({ readerId, bookId, totalPages });
            res.status(200).json({ message: 'Total pages updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = ReaderProgressController;
    // // Fetch all books currently being read by a user
    // exports.getCurrentReadingBooks = async (req, res) => {
    //     const { readerId } = req.params;
    //     try {
    //         const books = await ReaderProgress.getCurrentReadingBooks(readerId);
    //         res.status(200).json(books);
    //     } catch (err) {
    //         res.status(500).json({ error: err.message });
    //     }
    // };

    // // Fetch all completed books by a user
    // exports.getCompletedBooks = async (req, res) => {
    //     const { readerId } = req.params;
    //     try {
    //         const books = await ReaderProgress.getCompletedBooks(readerId);
    //         res.status(200).json(books);
    //     } catch (err) {
    //         res.status(500).json({ error: err.message });
    //     }
    // };