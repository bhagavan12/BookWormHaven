// // // import React from 'react'
// // // import './Card.css';
// // // import { Link } from 'react-router-dom';
// // // export default function Card({ book }) {
// // //   return (
// // //     <div className='cardd'>
// // //       <img src={book?.cover_url} alt='' className='image'></img>
// // //       <p id="title">{book?.title}</p>
// // //       <p id="genre">{book?.genre}</p>
// // //       <Link to={book.freeToRead_url}>Read for Free</Link>
// // //     </div>
// // //   )
// // // }
// // import React from 'react';
// // import './Card.css';
// // import { Link } from 'react-router-dom';

// // export default function Card({ book }) {
// //   return (
// //     <div className='cardd'>
// //       <img src={book?.cover_url} alt='' className='image'></img>
// //       <p id="title">{book?.title}</p>
// //       <p id="genre">{book?.genre}</p>
// //       {/* Pass the book object to another page via state */}
// //       <Link
// //         to="/book-details"
// //         state={{ book }}  // Pass the entire book object here
// //       >
// //         Read for Free
// //       </Link>

// //     </div>
// //   )
// // }
// import React from 'react';
// import './Card.css';
// import { useNavigate } from 'react-router-dom';

// export default function Card({ book }) {
//   const navigate = useNavigate(); // Initialize navigate

//   const handleNavigation = () => {
//     // Navigate to /bookdetails and pass the book data as state
//     navigate('/bookdetails', { state: { book } });
//   };

//   return (
//     <div className='cardd'>
//       <img src={book?.cover_url} alt='' className='image' />
//       <p id="title">{book?.title}</p>
//       <p id="genre">{book?.genre}</p>
//       {/* Button to trigger the navigation */}
//       <button onClick={handleNavigation}>Read for Free</button>
//     </div>
//   );
// }
import React, { useContext } from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../BookProvider'; // Import the context

export default function Card({ book }) {
  const { setSelectedBook } = useContext(BookContext); // Access context
  const navigate = useNavigate();

  const handleNavigation = () => {
    setSelectedBook(book); 
    navigate('/bookdetails'); 
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
