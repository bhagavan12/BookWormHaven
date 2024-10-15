// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; 
// import { fetchBooksByGenre, fetchBooksByAuthor, fetchBooksByPublicationDate, fetchBooksByKeyword } from '../features/api'; // Import the API functions
// import Card from './Card'; 

// export default function BooksList() {
//     const location = useLocation(); // Access the location object
//     const { selectedCriteria, searchKeyword } = location.state || {}; // Extract the state

//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         const fetchBooks = async () => {
//             if (!selectedCriteria || !searchKeyword) return; // Skip fetching if no criteria or keyword

//             try {
//                 let booksData = [];

//                 if (selectedCriteria === 'genre') {
//                     booksData = await fetchBooksByGenre(searchKeyword);
//                 } else if (selectedCriteria === 'author') {
//                     booksData = await fetchBooksByAuthor(searchKeyword);
//                 } else if (selectedCriteria === 'publicationDate') {
//                     booksData = await fetchBooksByPublicationDate(searchKeyword);
//                 } else if (selectedCriteria === 'keyword') {
//                     booksData = await fetchBooksByKeyword(searchKeyword);
//                 }

//                 setBooks(booksData);
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
//                 <p style={{textAlign:"center",fontSize:"larger"}}>Search to find books by selecting the type of search and type</p>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { fetchBooksByGenre, fetchBooksByAuthor, fetchBooksByPublicationDate, fetchBooksByKeyword } from '../features/api'; // Import the API functions
import { Carousel } from 'primereact/carousel';
import Card from './Card'; 

export default function BooksList() {
    const location = useLocation(); // Access the location object
    const { selectedCriteria, searchKeyword } = location.state || {}; // Extract the state

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            if (!selectedCriteria || !searchKeyword) return; // Skip fetching if no criteria or keyword

            try {
                let booksData = [];

                if (selectedCriteria === 'genre') {
                    booksData = await fetchBooksByGenre(searchKeyword);
                } else if (selectedCriteria === 'author') {
                    booksData = await fetchBooksByAuthor(searchKeyword);
                } else if (selectedCriteria === 'publicationDate') {
                    booksData = await fetchBooksByPublicationDate(searchKeyword);
                } else if (selectedCriteria === 'keyword') {
                    booksData = await fetchBooksByKeyword(searchKeyword);
                }

                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [selectedCriteria, searchKeyword]);

    // Define the item template for each book in the carousel
    const bookTemplate = (book) => {
        return (
            <div className="book-item">
                <Card book={book} />  {/* Reuse the Card component to display each book */}
            </div>
        );
    };

    // Define the responsive options for different screen sizes
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    return (
        <div className='slidercomp'>
            {books.length > 0 ? (
                <Carousel 
                    value={books} 
                    numVisible={3} 
                    numScroll={1} 
                    responsiveOptions={responsiveOptions} 
                    circular 
                    autoplayInterval={3000} 
                    itemTemplate={bookTemplate} 
                />
            ) : (
                <p style={{textAlign:"center",fontSize:"larger"}}>Search to find books by selecting the type of search and type</p>
            )}
        </div>
    );
}
