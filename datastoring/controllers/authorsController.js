const connection = require('../config/db');

// Controller to get all authors
const getAllAuthors = (req, res) => {
  const query = 'SELECT * FROM authors';
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve authors data' });
    }
    res.json(results);
  });
};

module.exports = { getAllAuthors };
