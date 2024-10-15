import axios from 'axios';

// Create an Axios instance with the base URL of the API
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Change this to your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// API calls

// Login API
export const loginUser = async (username, password) => {
  const response = await axios.post('http://localhost:3000/api/readers/login', {
    username,
    password,
  });
  return response.data; // Assuming response contains the user data and token
};

// Signup API
export const signupUser = async (username, email, password) => {
  const response = await api.post('/readers/signup', {
    username,
    email,
    password,
  });
  return response.data; // Assuming response contains a success message
};
const apibase = 'http://localhost:3000';

// Fetch books by genre
export const fetchBooksByGenre = async (keyword) => {
    const response = await axios.get(`${apibase}/api/books/genre/${encodeURIComponent(keyword)}`);
    return response.data;
};

// Fetch books by author
export const fetchBooksByAuthor = async (keyword) => {
    const response = await axios.get(`${apibase}/api/books/author/${encodeURIComponent(keyword)}`);
    return response.data;
};

// Fetch books by publication date
export const fetchBooksByPublicationDate = async (keyword) => {
    const response = await axios.get(`${apibase}/api/books/publication-date/${encodeURIComponent(keyword)}`);
    return response.data;
};

// Fetch books by keyword
export const fetchBooksByKeyword = async (keyword) => {
    const response = await axios.get(`${apibase}/api/books/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
};
export default api;
