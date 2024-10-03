// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from './Card'; // Import the Card component

// export default function BooksList({ selectedCriteria, searchKeyword }) {
//     const [books, setBooks] = useState([]);
//     const apibase = 'http://localhost:3000';

//     useEffect(() => {
//         const fetchBooks = async () => {
//             if (!selectedCriteria || !searchKeyword) return; // Skip fetching if no criteria or keyword

//             try {
//                 let response;
//                 const keyword = encodeURIComponent(searchKeyword);

//                 if (selectedCriteria === 'genre') {
//                     response = await axios.get(`${apibase}/api/books/genre/${keyword}`);
//                 } else if (selectedCriteria === 'author') {
//                     response = await axios.get(`${apibase}/api/books/author/${keyword}`);
//                 } else if (selectedCriteria === 'publicationDate') {
//                     response = await axios.get(`${apibase}/api/books/publication-date/${keyword}`);
//                 } else if (selectedCriteria === 'keyword') {
//                     response = await axios.get(`${apibase}/api/books/search?keyword=${keyword}`);
//                 }

//                 if (response && response.data) {
//                     setBooks(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching books:', error);
//             }
//         };

//         fetchBooks();
//     }, [selectedCriteria, searchKeyword]);

//     return (
//         <div>
//             {books.length > 0 ? (
//                 books.map((book) => (
//                     <Card key={book.id} book={book} /> // Pass the book data to the Card component
//                 ))
//             ) : (
//                 <p>No books found</p>
//             )}
//         </div>
//     );
// }
// BooksList.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import Card from './Card'; // Import the Card component

export default function BooksList() {
    const location = useLocation(); // Access the location object
    const { selectedCriteria, searchKeyword } = location.state || {}; // Extract the state

    const [books, setBooks] = useState([]);
    const apibase = 'http://localhost:3000';

    useEffect(() => {
        const fetchBooks = async () => {
            if (!selectedCriteria || !searchKeyword) return; // Skip fetching if no criteria or keyword

            try {
                let response;
                const keyword = encodeURIComponent(searchKeyword);

                if (selectedCriteria === 'genre') {
                    response = await axios.get(`${apibase}/api/books/genre/${keyword}`);
                } else if (selectedCriteria === 'author') {
                    response = await axios.get(`${apibase}/api/books/author/${keyword}`);
                } else if (selectedCriteria === 'publicationDate') {
                    response = await axios.get(`${apibase}/api/books/publication-date/${keyword}`);
                } else if (selectedCriteria === 'keyword') {
                    response = await axios.get(`${apibase}/api/books/search?keyword=${keyword}`);
                }

                if (response && response.data) {
                    setBooks(response.data);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [selectedCriteria, searchKeyword]);

    return (
        <div>
            {books.length > 0 ? (
                books.map((book) => (
                    <Card key={book.id} book={book} /> // Pass the book data to the Card component
                ))
            ) : (
                <p style={{textAlign:"center",fontSize:"larger"}}>Search to find books by selecting the type of search and type</p>
            )}
        </div>
    );
}
