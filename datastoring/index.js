// const express = require('express');
// const dotenv = require('dotenv');
// const connection = require('./config/db');
// const populateController = require('./controllers/populateController');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.get('/populate', populateController.populateBooks);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// app.js
// const express = require('express');
// const app = express();
// const bookRoutes = require('./routes/bookRoutes');

// app.use(express.json());
// app.use('/api', bookRoutes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/bookRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const authorsRoutes = require('./routes/authors');
const readersRoutes = require('./routes/readersRoutes');
const bookshelfRoutes = require('./routes/bookshelfRoutes'); 
const bookshelfBooksRoutes = require('./routes/bookshelfBooksRoutes');
const progressRoutes = require('./routes/progressRoutes');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(cors({
    origin: 'http://localhost:3001' 
}));
app.use(bodyParser.json());
// Register routes
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes); 
app.use('/api/reviews', reviewsRoutes); 
app.use('/api/readers', readersRoutes); 
app.use('/api/bookshelves', bookshelfRoutes); 
app.use('/api/bookshelves/books', bookshelfBooksRoutes); 
app.use('/api/progress', progressRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/book-content/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const url = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`;

  try {
    
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching book content:', error);
    if (axios.isAxiosError(error)){
      res.status(500).json({ message: 'Error fetching book content from external API' });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
