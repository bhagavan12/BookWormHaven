import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectBook } from '../features/bookSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
const Bookshelf = () => {
    const { bookshelfId, bookshelfName } = useParams(); // Get the bookshelf ID from the URL params
    const [books, setBooks] = useState([]); // State to hold the books in the bookshelf
    //   const [bookshelfName, setBookshelfName] = useState(''); // State to hold the bookshelf name
    const dispatch = useDispatch(); // Get the dispatch function
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const base = "http://localhost:3000"

    // Define responsive options for the Carousel
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

    useEffect(() => {
        // Fetch bookshelf name and books on component mount
        const fetchBookshelfData = async () => {
            try {
                // Fetch the books in the bookshelf by the bookshelfId
                const booksResponse = await axios.get(`${base}/api/bookshelves/books/${bookshelfId}`);
                setBooks(booksResponse.data); // Store the books in the state
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBookshelfData();
    }, [bookshelfId]);
    // Handle removing a book from the bookshelf
    const handleRemoveBook = async (bookId) => {
        try {
            await axios.delete(`${base}/api/bookshelves/books/${bookshelfId}/${bookId}`);
            const updatedBooks = books.filter((book) => book.id !== bookId);
            setBooks(updatedBooks); // Update the list after removal
        } catch (error) {
            console.error('Error removing book:', error);
        }
    };
    const handleNavigation = (book) => {
        dispatch(selectBook(book)); // Dispatch the selected book to Redux
        navigate('/bookdetails'); // Navigate to the book details page
    };
    // Define the template for how each book is displayed in the carousel
    const bookTemplate = (book) => {
        return (
            <div className="cardd">
                <img src={book.cover_url} alt={book.title} className='image' />
                <h3>{book.title}</h3>
                <p>By: {book.authors.join(', ')}</p>
                <div style={{display:"flex",gap:"2px"}}>
                    <Button label="View Details" onClick={() => handleNavigation(book)} size='small' />
                    <Button label="Remove Book" icon="pi pi-times" onClick={() => setVisible(true)} size='small' />
                </div>
                <Dialog header="Remove Book" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                    <Button label="Continue" size='small' onClick={() => handleRemoveBook(book.id)} style={{ marginTop: '10px' }} />
                </Dialog>
            </div>
        );
    };
    return (
        <div className='slidercomp'>
            <h1>{bookshelfName}</h1>
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
                <p>No books added yet.</p> // Display this if no books are found
            )}
        </div>
    );
};

export default Bookshelf;
