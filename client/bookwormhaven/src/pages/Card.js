import React from 'react';
import '../Styling/Card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch from redux
import { selectBook } from '../features/bookSlice'; // Import the selectBook action from the bookSlice

export default function Card({ book }) {
  const dispatch = useDispatch(); // Get the dispatch function
  const navigate = useNavigate();

  const handleNavigation = () => {
    dispatch(selectBook(book)); // Dispatch the selected book to Redux
    navigate('/bookdetails'); // Navigate to the book details page
  };

  return (
    <div className='cardd'>
      <img src={book?.cover_url} alt='' className='image' />
      <p id="title">{book?.title}</p>
      <p id="genre">{book?.genre}</p>
      <button onClick={handleNavigation}>Read for Free</button>
    </div>
  );
}
