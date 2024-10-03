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
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3001' // Replace with the actual origin you want to allow
}));
app.use(bodyParser.json());
// Register routes
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes); 
app.use('/api/reviews', reviewsRoutes); 
app.use('/api/readers', readersRoutes); 

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
